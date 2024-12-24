import BenchEmployee from "../models/benchemployee.model.js";
import Supplier from "../models/supplier.model.js";
import { APIresponse } from "../utils/APIresponse.js";
import { APIError } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import Ticket from "../models/ticket.model.js";
import Client from "../models/client.model.js";
import User from "../models/user.model.js";
import HiredEmployee from "../models/hiredemployee.model.js";
import HolidayRequest from "../models/holidayrequest.model.js";
import HiringRequestTimesheet from "../models/hiringtimesheet.model.js";
import RequirementPost from "../models/hireemployeepost.model.js";
import Billing from "../models/billing.model.js";
import { supplierRegisterMail, sendEmail } from "../utils/email.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const supplierRegister = asyncHandler(async (req, res) => {
    const {
        contactPersonName, designation, emailAddress, phoneNumber, companyWebsite, companyName, industryType,
        officeAddress, state, country, zipCode, accountHolderName, bankNameAndBranch,
        accountNumber, swiftOrIfscCode, businessType, employeeStrength,
        email, password,
    } = req.body;

    console.log({
        contactPersonName, designation, emailAddress, phoneNumber, companyWebsite, companyName, industryType,
        officeAddress, state, country, zipCode, accountHolderName, bankNameAndBranch,
        accountNumber, swiftOrIfscCode, businessType, employeeStrength,
        email, password
    });

    // Validate fields for non-empty values
    if ([contactPersonName, designation, emailAddress, phoneNumber, companyWebsite, companyName, industryType,
        officeAddress, state, country, zipCode, accountHolderName, bankNameAndBranch,
        accountNumber, swiftOrIfscCode, businessType, employeeStrength, email, password]
        .some((field) => field?.trim() === "")
    ) {
        throw new APIError(400, "No Empty Field is allowed");
    }

    // Check if supplier already exists
    const existingSupplier = await Supplier.findOne({
        $or: [{ emailAddress }, { accountNumber }],
    });

    console.log(existingSupplier)

    if (existingSupplier) {
        return res.status(409).json({ message: 'Supplier with this email or account number already exists.' });
    }

    const uploadedDocuments = [];
    if (req.files && req.files.documents && req.body.documentTypes && req.body.documentNumbers) {
        const documentTypes = Array.isArray(req.body.documentTypes)
            ? req.body.documentTypes
            : [req.body.documentTypes];
        const documentNumbers = Array.isArray(req.body.documentNumbers)
            ? req.body.documentNumbers
            : [req.body.documentNumbers];

        // Process each uploaded file
        for (let i = 0; i < req.files.documents.length; i++) {
            const file = req.files.documents[i];

            // Upload to Cloudinary or process the file
            const uploadResponse = await uploadOnCloudinary(file.path);

            uploadedDocuments.push({
                type: documentTypes[i],
                number: documentNumbers[i],
                filePath: uploadResponse.secure_url,
            });
        }
    } else {
        console.log("No documents found in the request.");
    }

    // Handle logo upload (if exists)
    let logoResponse = null;
    if (req.files && req.files.companyLogo) {
        console.log("logo is", req.files.companyLogo)
        const logoFilePath = req.files.companyLogo[0].path;
        logoResponse = await uploadOnCloudinary(logoFilePath);
        console.log(logoResponse)
    }

    let supportingDocument = null;
    if (req.files && req.files.supportingDocument) {
        console.log("supportingDocument is", req.files.supportingDocument)
        const supportingDocumentFilePath = req.files.supportingDocument[0].path;
        supportingDocument = await uploadOnCloudinary(supportingDocumentFilePath);
        console.log(supportingDocument)
    }


    const newSupplier = new Supplier({
        contactPersonName, designation, emailAddress, phoneNumber, companyWebsite, companyName, industryType,
        officeAddress, state, country, zipCode, accountHolderName, bankNameAndBranch,
        accountNumber, swiftOrIfscCode, businessType, employeeStrength,
        email, password, documents: uploadedDocuments, companyLogo: logoResponse ? logoResponse?.secure_url : null,
        supportingDocument : supportingDocument?.secure_url || null // Attach documents and logo
    });

    const savedSupplier = await newSupplier.save();

    await sendEmail({
        email: "mkrp975845@gmil.com",
        subject: "Email regarding registration of Client",
        mailgenContent: supplierRegisterMail(
            savedSupplier
        ),
    });

    // Create new User linked to the Supplier
    const newUser = new User({
        email: emailAddress,
        password: password,
        userType: "supplier",
        role: "admin",
        linkedEntityId: savedSupplier._id,
        permissions: [
            "view_dashboard",
            "edit_profile",
            "access_reports",
            "manage_users",
            "manage_settings",
            "restricted_feature_1",
            "restricted_feature_2",
        ],
        supplierId: savedSupplier._id
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Fetch the created user data without password and refreshToken
    const createdSupplierUser = await User.findById(savedUser._id).select("-password -refreshToken");

    if (!createdSupplierUser) {
        throw new APIError(500, "Something went wrong while Registering the Supplier User");
    }

    // Fetch the created supplier data without password and refreshToken
    const createdSupplier = await Supplier.findById(savedSupplier._id).select("-password -refreshToken");

    if (!createdSupplier) {
        throw new APIError(500, "Something went wrong while Registering the Supplier");
    }

    return res.status(201).json({
        message: 'Supplier registered successfully!',
        createdSupplier, // Return the created supplier data (without password/refreshToken)
        createdSupplierUser, // Optionally return user details as well
    });
})

const supplierLogin = asyncHandler(async (req, res) => {
    const { email, password, userType, role } = req.body;
    console.log({ email, password, userType, role })

    if (!email && !password && !userType && !role) {
        return res.status(400).json({ message: 'Email, Type and password are required' });
    }

    const supplier = await User.findOne({ email });
    console.log(supplier)

    if (userType === "supplier" && role === "admin") {
        const suppliersup = await Supplier.findOne({ companyEmail: email });
        console.log(suppliersup)
        if (suppliersup.isAccountVerified == false)
            return res.status(401).json({ message: 'This Account is under Verification' });
    }

    if (!supplier) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await supplier.isPasswordCorrect(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = await supplierGenerateAccessAndRefreshToken(supplier._id);

    const loggedSupplier = await User.findById(supplier._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    };

    // req.session.supplier = {
    //     id: supplier?._id,
    //     accessToken: accessToken,
    //     refreshToken: refreshToken,
    //     options
    // };

    res.cookie("accessToken", accessToken, { ...options, maxAge: 15 * 60 * 1000 }); // expires in 15 minutes
    res.cookie("refreshToken", refreshToken, { ...options, maxAge: 7 * 24 * 60 * 60 * 1000 }); // expires in 7 days


    return res
        .json(
            new APIresponse(
                200,
                { loggedSupplier, accessToken, refreshToken, userType, role },
                "User Logged in successfully!!")
        );
});

const supplierGenerateAccessAndRefreshToken = async (supplierid) => {
    try {
        const supplier = await User.findById(supplierid).select("-password");
        const accessToken = await supplier.generateAccessToken();
        const refreshToken = await supplier.generateRefreshToken();

        supplier.refreshToken = refreshToken;
        await supplier.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error)
        throw new APIError(500, "Something went wrong while creating acces and refresh Token!!")
    }
}

const logoutSupplier = asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw new APIError(400, `${err}`)
        }
    });
    res
        .clearCookie('connect.sid')
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json(
            new APIresponse(200, "User Logged out successfully!!")
        )
});

const forgetPasswordLinkGenerator = asyncHandler(async (req, res) => {

    const { companyEmail, type } = req.body

    if (type != 'supplier')
        throw new APIError(400, "Wrong page for Forget Password!!!")

    const supplier = await Supplier.findOne({ companyEmail }).select('email password')
    // console.log("user",user)

    if (!supplier) {
        throw new APIError(404, "supplier does not exist")
    }

    const reset = process.env.ACCESS_TOKEN_SECRET + supplier.password
    // console.log("after reset")
    const resetToken = jwt.sign(
        { companyEmail: supplier.companyEmail, id: supplier._id },
        reset,
        { expiresIn: "5m" }
    )
    // console.log(resetToken)

    const link = `http://localhost:3000/reset-password?id=${supplier._id}&token=${resetToken}&type=user`
    // console.log(link)

    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });
    // console.log(transporter)

    // const mailOptions = {
    //     // to: user.email,
    //     to: process.env.EMAIL_USER,
    //     from: process.env.EMAIL_USER,
    //     subject: 'Password Reset',
    //     text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
    //         `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
    //         link +
    //         `\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
    // };
    // console.log(mailOptions)

    // await transporter.sendMail(mailOptions)

    return res.json(
        new APIresponse(
            200,
            { link: link },
            "Reset Password Link has been sent to your registered email address"
        )
    )

})

const addBenchEmployee = asyncHandler(async (req, res) => {
    const companyEmail = req.user.email
    console.log("supplierId", companyEmail)
    const {
        name,
        email,
        phone,
        gender,
        education,
        current_location,
        skills,
        communication_skill,
        work_experience,
        availability_status,
        availability_timing,
        hourly_rate,
        experience_years,
        certifications,
        licenses,
        avatar
    } = req.body;

    // Check if supplier exists
    const supplier = await Supplier.findOne({ companyEmail });
    console.log("supplier find", supplier)

    if (!supplier) {
        throw new APIError(404, "Supplier not found");
    }

    const supplierObjectId = new mongoose.Types.ObjectId(supplier._id);

    // Create a new bench employee instance
    const benchEmployee = new BenchEmployee({
        name,
        email,
        phone,
        gender,
        education,
        current_location,
        skills,
        communication_skill,
        work_experience,
        availability_status,
        availability_timing,
        supplierId: supplierObjectId,  // Associate with supplier
        hourly_rate,
        experience_years,
        certifications,
        licenses,
        avatar,
    });

    // Save bench employee to the database
    await benchEmployee.save();

    // Update the supplier's bench employees list
    supplier.benchEmployees.push(benchEmployee._id);

    await supplier.save();

    return res.status(200).json({ message: "Bench employee added successfully", benchEmployee });
});

const updateSkills = asyncHandler(async (req, res) => {
    const { benchEmployeeId } = req.body;
    const { skills } = req.body;
    const benchEmployeeObjectId = new mongoose.Types.ObjectId(benchEmployeeId)

    // Validate input
    // if (!['add', 'remove'].includes(action)) {
    //     return res.status(400).json({ message: "Action must be 'add' or 'remove'" });
    // }

    if (!benchEmployeeObjectId || !skills) {
        return res.status(400).json({ message: 'Employee ID and skills are required' });
    }

    // Find the bench employee by ID
    const benchEmployee = await BenchEmployee.findById(benchEmployeeObjectId);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Bench employee not found' });
    }

    // Filter out skills that already exist by checking for duplicates (based on `name`)
    const newSkills = skills.filter(newSkill =>
        !benchEmployee.skills.some(existingSkill => existingSkill.name.toLowerCase() === newSkill.name.toLowerCase())
    );

    // Add new skills to the skills array
    newSkills.forEach(skill => {
        benchEmployee.skills.push({
            name: skill.name,
            rating: skill.rating,
        });
    });

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: `Skill Updated successfully`,
        skills: benchEmployee.skills
    });
});

const createTicket = asyncHandler(async (req, res) => {
    const { description } = req.body;
    let department;
    let role;
    let raisedBy;

    // Check which user is authenticated and populate corresponding fields
    if (req.userType = "supplier") {
        role = "supplier";
        raisedBy = req.user._id;
        department = req.body.department || 'admin'; // default to admin if no department is provided
    } else if (req.userType = "client") {
        role = "client";
        raisedBy = req.user._id;
        department = req.body.department || 'admin';
    } else if (req.userType = "admin") {
        role = "admin";
        raisedBy = req.user._id;
        department = req.body.department || 'admin';
    } else {
        throw new APIError(403, "Unauthorized user.");
    }

    // Validate the department and priority
    const validDepartments = ["hr", "finance", "admin"];
    // const validPriorities = ["low", "medium", "high", "urgent"];

    if (!validDepartments.includes(department)) {
        throw new APIError(400, "Invalid department. Choose from 'hr', 'finance', or 'admin'.");
    }

    // if (!validPriorities.includes(priority)) {
    //     throw new APIError(400, "Invalid priority. Choose from 'low', 'medium', 'high', or 'urgent'.");
    // }

    // Create the ticket
    const ticket = new Ticket({
        raisedBy,
        role,
        department,
        description,
        // priority,
    });

    await ticket.save();

    return res.status(201).json({ message: "Ticket created successfully", ticket });
});

const createLogin = asyncHandler(async (req, res) => {
    const { email, password, userType, role } = req.body;
    const linkedEntityId = req.user.linkedEntityId
    const supplierId = req.user.supplierId

    // Validate required fields
    if (!email || !password || !userType || !role || !linkedEntityId) {
        throw new APIError(400, "Please provide all required fields");
    }

    // Check if userType is valid (should be 'supplier', 'client', or 'superadmin')
    if (!['supplier', 'client', 'superadmin'].includes(userType)) {
        throw new APIError(400, "Invalid user type");
    }

    // Check if role is valid (should be 'hr' or 'finance' or 'admin')
    if (!['hr', 'finance', 'admin'].includes(role)) {
        throw new APIError(400, "Invalid role type");
    }

    let linkedEntity = await Supplier.findById(supplierId);

    if (!linkedEntity) {
        throw new APIError(404, `Supplier not found`);
    }

    // Create the new user with the given role (HR or Finance)
    const newUser = new User({
        email,
        password,
        userType,
        role,
        linkedEntityId,
        isVerified: true, // Set isVerified to true for new users
        supplierId: supplierId
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} login created successfully`,
        user: newUser,
    });
});

const deleteLogin = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const uerObjectId = new mongoose.Types.ObjectId(userId)

    // Find the user by userId
    const user = await User.findByIdAndDelete(uerObjectId);
    console.log(user)

    if (!user) {
        throw new APIError(404, "User not found");
    }

    res.status(200).json({ message: "User deleted successfully" });
});

const grantPermission = asyncHandler(async (req, res) => {
    const { userId, permission } = req.body;

    // Check if permission is valid
    if (!permission || !["view_dashboard", "edit_profile", "access_reports", "manage_users", "manage_settings"].includes(permission)) {
        throw new APIError(400, "Invalid permission");
    }

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
        throw new APIError(404, "User not found");
    }

    // Check if the user already has this permission
    if (user.permissions.includes(permission)) {
        throw new APIError(400, "User already has this permission");
    }

    // Grant the permission
    user.permissions.push(permission);
    await user.save();

    res.status(200).json({ message: "Permission granted successfully", user });
});

const revokePermission = asyncHandler(async (req, res) => {
    const { userId, permission } = req.body;

    // Check if permission is valid
    if (!permission || !["view_dashboard", "edit_profile", "access_reports", "manage_users", "manage_settings"].includes(permission)) {
        throw new APIError(400, "Invalid permission");
    }

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
        throw new APIError(404, "User not found");
    }

    // Check if the user has this permission
    if (!user.permissions.includes(permission)) {
        throw new APIError(400, "User does not have this permission");
    }

    // Revoke the permission
    user.permissions = user.permissions.filter((perm) => perm !== permission);
    await user.save();

    res.status(200).json({ message: "Permission revoked successfully", user });
});

const addEducationToBenchEmployee = asyncHandler(async (req, res) => {
    const { employeeId, education } = req.body;

    // Convert employeeId to ObjectId
    const idObject = new mongoose.Types.ObjectId(employeeId);

    if (!idObject || !education) {
        return res.status(400).json({ message: 'Employee ID and education data are required' });
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(idObject);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Overwrite the existing education array with the new data
    benchEmployee.education = education.map(edu => ({
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
        grade: edu.grade,
        achievements: edu.achievements,
    }));

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: 'Education data updated successfully',
        education: benchEmployee.education,
    });
});

const addWorkExperienceToBenchEmployee = asyncHandler(async (req, res) => {
    const { employeeId, work_experience } = req.body;

    // Convert employeeId to ObjectId
    const idObject = new mongoose.Types.ObjectId(employeeId);

    if (!idObject || !work_experience) {
        return res.status(400).json({ message: 'Employee ID and work experience data are required' });
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(idObject);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Overwrite the existing work experience with the new data
    benchEmployee.work_experience = work_experience.map(exp => ({
        companyName: exp.companyName,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate,
        responsibilities: exp.responsibilities,
        achievements: exp.achievements,
    }));

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: 'Work experience data updated successfully',
        work_experience: benchEmployee.work_experience,
    });
});

const updateAvailabilityTiming = asyncHandler(async (req, res) => {
    const { employeeId, availability_timing } = req.body;

    // Convert employeeId to ObjectId
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: 'Invalid or missing employee ID' });
    }

    if (!availability_timing || !Array.isArray(availability_timing) || availability_timing.length === 0) {
        return res.status(400).json({ message: 'Availability timing data is required and must be a non-empty array' });
    }

    // Validate that each timing entry contains valid day, startTime, and endTime
    for (let i = 0; i < availability_timing.length; i++) {
        const timing = availability_timing[i];

        if (!timing.day || !['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(timing.day)) {
            return res.status(400).json({ message: `Invalid day at index ${i}: ${timing.day}` });
        }

        if (!timing.startTime || !timing.endTime) {
            return res.status(400).json({ message: `Both startTime and endTime are required at index ${i}` });
        }

        // Validate startTime and endTime format (HH:MM)
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM format
        if (!timePattern.test(timing.startTime) || !timePattern.test(timing.endTime)) {
            return res.status(400).json({ message: `Invalid time format at index ${i}: ${timing.startTime} - ${timing.endTime}. Expected HH:MM format` });
        }

        // Check that endTime is after startTime
        const startTime = timing.startTime.split(":").map(Number);
        const endTime = timing.endTime.split(":").map(Number);
        if (startTime[0] > endTime[0] || (startTime[0] === endTime[0] && startTime[1] >= endTime[1])) {
            return res.status(400).json({ message: `End time must be after start time at index ${i}` });
        }
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(employeeId);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Overwrite the existing availability_timing array with the new data
    benchEmployee.availability_timing = availability_timing.map(time => ({
        day: time.day,
        startTime: time.startTime,
        endTime: time.endTime,
    }));

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: 'Availability timings updated successfully',
        availability_timing: benchEmployee.availability_timing,
    });
});

const updateCertifications = asyncHandler(async (req, res) => {
    const { employeeId, certifications } = req.body;

    // Convert employeeId to ObjectId
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: 'Invalid or missing employee ID' });
    }

    // Validate Certifications data
    if (certifications) {
        if (!Array.isArray(certifications) || certifications.length === 0) {
            return res.status(400).json({ message: 'Certifications must be a non-empty array' });
        }

        certifications.forEach((cert, index) => {
            if (!cert.name || !cert.issuingOrganization || !cert.dateOfIssue || !cert.certificationId) {
                return res.status(400).json({ message: `Missing required fields in certification at index ${index}` });
            }

            // Validate date formats (ISO 8601)
            if (!Date.parse(cert.dateOfIssue)) {
                return res.status(400).json({ message: `Invalid dateOfIssue format in certification at index ${index}` });
            }
            if (cert.expiryDate && !Date.parse(cert.expiryDate)) {
                return res.status(400).json({ message: `Invalid expiryDate format in certification at index ${index}` });
            }

            // Validate image URL format (optional)
            if (cert.image && !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(cert.image)) {
                return res.status(400).json({ message: `Invalid image URL format in certification at index ${index}` });
            }
        });
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(employeeId);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Overwrite the existing certifications array with the new data
    if (certifications) {
        benchEmployee.certifications = certifications.map(cert => ({
            name: cert.name,
            issuingOrganization: cert.issuingOrganization,
            dateOfIssue: cert.dateOfIssue,
            expiryDate: cert.expiryDate,
            certificationId: cert.certificationId,
            image: cert.image,
        }));
    }

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: 'Certifications updated successfully',
        certifications: benchEmployee.certifications,
    });
});

const updateLicenses = asyncHandler(async (req, res) => {
    const { employeeId, licenses } = req.body;

    // Convert employeeId to ObjectId
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: 'Invalid or missing employee ID' });
    }

    // Validate Licenses data
    if (licenses) {
        if (!Array.isArray(licenses) || licenses.length === 0) {
            return res.status(400).json({ message: 'Licenses must be a non-empty array' });
        }

        licenses.forEach((license, index) => {
            if (!license.type || !license.issuingAuthority || !license.licenseNumber || !license.dateOfIssue) {
                return res.status(400).json({ message: `Missing required fields in license at index ${index}` });
            }

            // Validate date formats (ISO 8601)
            if (!Date.parse(license.dateOfIssue)) {
                return res.status(400).json({ message: `Invalid dateOfIssue format in license at index ${index}` });
            }
            if (license.expiryDate && !Date.parse(license.expiryDate)) {
                return res.status(400).json({ message: `Invalid expiryDate format in license at index ${index}` });
            }

            // Validate image URL format (optional)
            if (license.image && !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(license.image)) {
                return res.status(400).json({ message: `Invalid image URL format in license at index ${index}` });
            }
        });
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(employeeId);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Overwrite the existing licenses array with the new data
    if (licenses) {
        benchEmployee.licenses = licenses.map(license => ({
            type: license.type,
            issuingAuthority: license.issuingAuthority,
            licenseNumber: license.licenseNumber,
            dateOfIssue: license.dateOfIssue,
            expiryDate: license.expiryDate,
            image: license.image,
        }));
    }

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: 'Licenses updated successfully',
        licenses: benchEmployee.licenses,
    });
});

const updateCommunicationSkills = asyncHandler(async (req, res) => {
    const { employeeId, communicationSkill } = req.body;

    // Validate employee ID and communication skill data
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: 'Invalid or missing employee ID' });
    }

    if (!communicationSkill || !communicationSkill.type || !communicationSkill.rating) {
        return res.status(400).json({ message: 'Missing communication skill type or rating' });
    }

    // Validate rating (ensure it's between 1 and 5)
    if (communicationSkill.rating < 1 || communicationSkill.rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(employeeId);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Overwrite the existing communicationSkill data with the new data
    benchEmployee.communication_skill = {
        type: communicationSkill.type,
        rating: communicationSkill.rating
    };

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: 'Communication skill updated successfully',
        communicationSkill: benchEmployee.communicationSkill
    });
});

const toggleAvailabilityStatus = asyncHandler(async (req, res) => {
    const { employeeId, companyId, role, startDate, endDate, hourlyRate, projectId, workspaceId, contractDetails } = req.body;

    if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(employeeId);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    let statusChangeMessage;

    // Toggle the availability_status and take appropriate actions
    if (benchEmployee.availability_status === "benched") {
        // If employee is benched and the status is being changed to 'hired'

        if (!companyId || !role || !startDate || !hourlyRate) {
            return res.status(400).json({ message: 'Missing required hiring details' });
        }

        // Create a new hired employee record
        const hiredEmployee = await HiredEmployee.create({
            employeeId,
            companyId,
            role,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            hourlyRate,
            projectId,
            workspaceId,
            contractDetails,
            status: 'active',
        });

        // Add the hired employee record to the hiredHistory in BenchEmployee model
        benchEmployee.hiredHistory.push(hiredEmployee._id);

        // Update availability status to 'hired'
        benchEmployee.availability_status = "hired";

        statusChangeMessage = 'Employee hired successfully';
    } else {
        // If employee is currently hired, and status is being changed to 'benched'
        // You can set 'status' to 'completed' in the HiredEmployee model or handle it as per your logic

        const latestHire = benchEmployee.hiredHistory[benchEmployee.hiredHistory.length - 1]; // Get the latest hire
        if (latestHire) {
            await HiredEmployee.findByIdAndUpdate(latestHire, { status: 'completed' }); // Mark the hire as completed
        }

        // Update availability status to 'benched'
        benchEmployee.availability_status = "benched";

        statusChangeMessage = 'Employee benched successfully';
    }

    // Save the updated bench employee document
    await benchEmployee.save();

    return res.status(200).json({
        message: statusChangeMessage,
        availabilityStatus: benchEmployee.availability_status,
    });
});

const updateEmployeeDetails = asyncHandler(async (req, res) => {
    const { employeeId } = req.body;  // Get the employee ID
    const { avatar, name, email, phone, gender, current_location, hourly_rate, experience_years, communication_skill } = req.body;  // Get updated fields

    if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    // Fetch the bench employee document
    const benchEmployee = await BenchEmployee.findById(employeeId);

    if (!benchEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Update the fields if they are provided
    if (avatar) benchEmployee.avatar = avatar;
    if (name) benchEmployee.name = name;
    if (email) benchEmployee.email = email;
    if (phone) benchEmployee.phone = phone;
    if (gender) benchEmployee.gender = gender;
    if (current_location) benchEmployee.current_location = current_location;
    if (hourly_rate) benchEmployee.hourly_rate = hourly_rate;
    if (experience_years) benchEmployee.experience_years = experience_years;
    if (communication_skill) benchEmployee.communication_skill = communication_skill;
    // if (supplierId) benchEmployee.supplierId = supplierId;

    // Save the updated document
    await benchEmployee.save();

    return res.status(200).json({
        message: 'Employee details updated successfully',
        updatedEmployee: benchEmployee,
    });
});

const createHolidayRequest = asyncHandler(async (req, res) => {
    const { hiredEmployeeId, companyId, projectId, startDate, endDate, reason } = req.body;

    const hiredEmployeeObjectId = new mongoose.Types.ObjectId(hiredEmployeeId);
    const projectObjectId = new mongoose.Types.ObjectId(projectId);
    const companyObjectId = new mongoose.Types.ObjectId(companyId);

    const requestedBy = req.user._id;

    // Validate required fields
    if (!hiredEmployeeObjectId || !projectId || !companyId || !requestedBy || !startDate || !endDate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure the end date is after the start date
    if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({ message: 'End date must be after start date' });
    }

    // Check if the hired employee exists
    const hiredEmployee = await HiredEmployee.findOne({
        employeeId: hiredEmployeeObjectId,
        companyId,
        projectId
    });

    if (!hiredEmployee) {
        return res.status(404).json({ message: 'Hired employee not found' });
    }

    // Create the holiday request
    const holidayRequest = await HolidayRequest.create({
        hiredEmployeeId: hiredEmployeeObjectId,
        requestedBy,
        projectId: projectObjectId,
        companyId: companyObjectId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: 'pending',
        requestDate: new Date(),
    });

    console.log(holidayRequest._id)
    console.log(hiredEmployee._id)

    // Add the holiday request ID to the hired employee's holidayRequests array
    hiredEmployee.holidayRequests.push(holidayRequest._id);
    await hiredEmployee.save();

    return res.status(201).json({
        message: 'Holiday request created successfully',
        holidayRequest,
    });
});

const requestsForBenchEmployee = asyncHandler(async (req, res) => {
    const supplierId = req.user.supplierId

    console.log(supplierId)

    const requestTimesheet = await HiredEmployee.find({ supplierId, requeststatus: "pending" })

    if (requestTimesheet.length == 0) {
        return res.status(404).json({ message: 'No requests found' })
    }

    return res.status(200).json({
        message: 'Requests found',
        requestTimesheet
    })
})

const rejectHiringRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.body;

    try {
        // Find the hiring request
        const hiringRequest = await HiredEmployee.findById(requestId);
        if (!hiringRequest) {
            return res.status(404).json({ message: 'Hiring request not found' });
        }

        // Update the request status to rejected
        hiringRequest.requeststatus = 'rejected';
        await hiringRequest.save();

        return res.status(200).json({
            message: 'Hiring request rejected successfully',
            hiringRequest,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const acceptHiringRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.body;

    try {
        // Find the hiring request
        const hiringRequest = await HiredEmployee.findById(requestId);
        if (!hiringRequest) {
            return res.status(404).json({ message: 'Hiring request not found' });
        }

        // Update the hiring request status to active
        hiringRequest.hirestatus = 'active';
        hiringRequest.requeststatus = 'approved';
        await hiringRequest.save();

        // Update the bench employee's status to hired and add the request ID to their history
        const benchEmployee = await BenchEmployee.findById(hiringRequest.employeeId);
        if (benchEmployee) {
            benchEmployee.availability_status = 'hired';
            benchEmployee.hiredHistory = [...benchEmployee.hiredHistory, hiringRequest._id];
            await benchEmployee.save();
        }

        return res.status(200).json({
            message: 'Hiring request accepted successfully',
            hiringRequest,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const assignBenchEmployeeToPost = asyncHandler(async (req, res) => {
    const { postId, benchEmployeeId } = req.body;

    // Check if both IDs are provided
    if (!postId || !benchEmployeeId) {
        return res.status(400).json({ message: 'Post ID and Bench Employee ID are required' });
    }

    try {
        // Find the bench employee to ensure it exists
        const benchEmployee = await BenchEmployee.findById(benchEmployeeId);
        if (!benchEmployee) {
            return res.status(404).json({ message: 'Bench employee not found' });
        }

        // Update the RequirementPost to add the benchEmployeeId to the employeeRequest array
        const updatedPost = await RequirementPost.findByIdAndUpdate(
            postId,
            { $addToSet: { employeeRequest: benchEmployeeId } }, // Ensures no duplicates
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Requirement post not found' });
        }

        res.status(200).json({
            message: 'Bench employee assigned to the requirement post successfully',
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const createBill = asyncHandler(async (req, res) => {
    try {
        const { hiredEmployeeId, hourlyRate, paymentDueDate, notes } = req.body;

        // Fetch hired employee details
        const hiredEmployee = await HiredEmployee.findById(hiredEmployeeId).populate('clientId supplierId');
        if (!hiredEmployee) {
            return res.status(404).json({ error: 'Hired employee not found' });
        }

        // Extract relevant data from hired employee document
        const clientId = hiredEmployee.clientId._id;
        const supplierId = hiredEmployee.supplierId._id;

        // Calculate total hours billed based on entries
        const totalHoursBilled = hiredEmployee.entries.reduce((total, entry) => total + entry.plannedHours, 0);

        // Calculate total amount
        const totalAmount = totalHoursBilled * hourlyRate;

        // Define the billing period (from startDate to endDate of the hiredEmployee data)
        const billingPeriod = {
            startDate: hiredEmployee.startDate,
            endDate: hiredEmployee.endDate
        };

        // Create a new Billing document
        const newBill = new Billing({
            hiredEmployeeId,
            clientId,
            supplierId,
            billingPeriod,
            totalHoursBilled,
            hourlyRate,
            totalAmount,
            status: 'pending',
            generatedBy: req.user._id,  // Assuming `req.user.id` has the user ID of the person generating the bill
            invoiceDate: new Date(),
            paymentDueDate,
            notes
        });

        // Save the bill to the database
        await newBill.save();

        return res.status(201).json({
            message: 'Bill created successfully',
            bill: newBill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the bill' });
    }
})

const invoiceHistory = asyncHandler(async (req, res) => {
    try {
        const { clientId, supplierId, status } = req.query; // Optionally filter by clientId, supplierId, and status

        // Build the query filter object
        const filter = {};
        if (clientId) filter.clientId = clientId;
        if (supplierId) filter.supplierId = supplierId;
        if (status) filter.status = status; // e.g., 'pending', 'paid', 'overdue'

        // Fetch invoice history based on the filter
        const invoices = await Billing.find(filter)
            .populate('clientId', 'companyName') // Populate client details, only showing company name
            .populate('supplierId', 'companyName') // Populate supplier details, only showing company name
            .populate('hiredEmployeeId', 'role') // Populate hired employee details, only showing role
            .sort({ invoiceDate: -1 }) // Sort by invoice date, latest first
            .exec();

        // Check if any invoices were found
        if (invoices.length === 0) {
            return res.status(404).json({ message: 'No invoices found for the specified criteria' });
        }

        return res.status(200).json({
            message: 'Invoice history retrieved successfully',
            invoices
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the invoice history' });
    }
})

export {
    supplierRegister,
    supplierLogin,
    logoutSupplier,
    forgetPasswordLinkGenerator,
    addBenchEmployee,
    updateSkills,
    createTicket,
    createLogin,
    revokePermission,
    grantPermission,
    deleteLogin,
    addEducationToBenchEmployee,
    addWorkExperienceToBenchEmployee,
    updateAvailabilityTiming,
    updateLicenses,
    updateCertifications,
    updateCommunicationSkills,
    toggleAvailabilityStatus,
    updateEmployeeDetails,
    createHolidayRequest,
    requestsForBenchEmployee,
    rejectHiringRequest,
    acceptHiringRequest,
    assignBenchEmployeeToPost,
    createBill,
    invoiceHistory
}