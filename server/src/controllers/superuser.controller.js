import BenchEmployee from "../models/benchemployee.model.js";
import Supplier from "../models/supplier.model.js";
import { APIresponse } from "../utils/APIresponse.js";
import { APIError } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import Ticket from "../models/ticket.model.js";
import Client from "../models/client.model.js";
import UserSuper from "../models/usersuper.model.js";
import Superuser from "../models/superUser.model.js";



const userLogin = asyncHandler(async (req, res) => {
    const { email, password, userType, role } = req.body;
    console.log({ email, password, userType, role })

    if (!email && !password && !userType && !role) {
        return res.status(400).json({ message: 'Email, Type and password are required' });
    }

    const user = await UserSuper.findOne({ email });
    console.log(user)

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggeduser = await UserSuper.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    };

    // req.session.user = {
    //     id: user?._id,
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
                { loggeduser, accessToken, refreshToken, userType, role },
                "User Logged in successfully!!")
        );
});

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await UserSuper.findById(userId).select("-password");
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error)
        throw new APIError(500, "Something went wrong while creating acces and refresh Token!!")
    }
}

const totalBenchEmployees = asyncHandler(async (req, res) => {
    // const supplierId = req.user._id
    const benchEmployeeCount = await BenchEmployee.countDocuments();
    const benchEmployees = await BenchEmployee.find()
    console.log(`Total bench employees: ${benchEmployeeCount}`);
    console.log(benchEmployees)
    return res
        .status(200)
        .json(
            new APIresponse(
                200,
                { benchEmployeeCount,benchEmployees },
                "Bench Employees Count fetched successfully!!"
            )
        )
})

const totalClients = asyncHandler(async (req, res) => {
    const clientCount = await Client.countDocuments();
    const clients = await Client.find();
    
    console.log(`Total clients: ${clientCount}`);
    console.log(clients);
    
    return res
        .status(200)
        .json(
            new APIresponse(
                200,
                { clientCount, clients },
                "Clients Count fetched successfully!!"
            )
        );
});

const totalSuppliers = asyncHandler(async (req, res) => {
    const supplierCount = await Supplier.countDocuments();
    const suppliers = await Supplier.find();
    
    console.log(`Total suppliers: ${supplierCount}`);
    console.log(suppliers);
    
    return res
        .status(200)
        .json(
            new APIresponse(
                200,
                { supplierCount, suppliers },
                "Suppliers Count fetched successfully!!"
            )
        );
});

const supplierRegisteration = asyncHandler(async(req, res) => {
    const suppliercount = await Supplier.countDocuments();
    const supplier = await Supplier.find({isAccountVerified : false})
    // console.log(supplier)
    return res
        .status(200)
        .json(
            new APIresponse(
                200,
                { suppliercount, supplier },
                "Suppliers fetched successfully!!"
            )
        );

})

const acceptSupplierRegisteration = asyncHandler(async(req, res) => {
    const { supplierId } = req.body;
    const supplierObjectId = new mongoose.Types.ObjectId(supplierId)
    const supplier = await Supplier.findById(supplierObjectId);
    console.log(supplier)
    if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
    }
    supplier.isAccountVerified = true;
    await supplier.save();

    const supplierlogin = await User.findOne({email : supplier.companyEmail, linkedEntityId : supplier._id});
    console.log(supplierlogin)
    if (!supplierlogin) {
        return res.status(404).json({ message: 'supplierlogin not found' });
    }
    supplierlogin.isVerified = true;
    await supplierlogin.save();

    return res
        .status(200)
        .json(
            new APIresponse(
                200,
                { supplier, supplierlogin },
                "Supplier accepted successfully!!"
            )
        );
})

const rejectSupplierRegisteration = asyncHandler(async(req, res) => {
    const { supplierId } = req.body;
    const supplierObjectId = new mongoose.Types.ObjectId(supplierId)

    const supplier = await Supplier.findById(supplierObjectId);
    // console.log(supplier)

    if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
    }

    const supplierlogindelete = await User.findOneAndDelete({email : supplier.companyEmail, linkedEntityId : supplier._id});
    console.log(supplierlogindelete)

    if (!supplierlogindelete) {
        return res.status(404).json({ message: 'supplierlogin not found' });
    }

    const supplierdelete = await Supplier.findByIdAndDelete(supplierObjectId);

    if (!supplierdelete) {
        return res.status(404).json({ message: 'Supplier not found' });
    }

    return res
        .status(200)
        .json(
            new APIresponse(
                200,
                { supplierdelete, supplierlogindelete },
                "Supplier accepted successfully!!"
            )
        );
})

const getTickets = asyncHandler(async(req, res) => {
    const tickets = await Ticket.find();
    return res
        .status(200)
        .json(
            new APIresponse(
                200,
                { tickets },
                "Tickets fetched successfully!!"
            )
        );
})

const updateTicketStatus = asyncHandler(async (req, res) => {
    const { ticketId, newStatus, resolutionDetails } = req.body;

    const ticketObjectId = new mongoose.Types.ObjectId(ticketId)

    // Validate the new status
    const validStatuses = ['in progress', 'resolved', 'closed'];
    if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ message: 'Invalid status. Status can only be "in progress", "resolved", or "closed".' });
    }

    // Find the ticket by ID and ensure it's currently 'open'
    const ticket = await Ticket.findOne({ _id: ticketObjectId, status: 'open' });
    if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found or not in "open" status.' });
    }

    // Update the ticket status and resolution details if provided
    ticket.status = newStatus;
    if (resolutionDetails) {
        ticket.resolutionDetails = resolutionDetails;
    }

    await ticket.save();

    return res.status(200).json({
        message: 'Ticket status updated successfully!',
        ticket,
    });
});

const createLogin = asyncHandler(async (req, res) => {
    const { email, password, userType, role } = req.body;
    const linkedEntityId = req.user.linkedEntityId
    const superUser = req.user.superUser

    // Validate required fields
    if (!email || !password || !userType || !role || !linkedEntityId) {
        throw new APIError(400, "Please provide all required fields");
    }

    // Check if userType is valid (should be 'supplier', 'client', or 'superadmin')
    // if (!['supplier', 'client', 'superadmin'].includes(userType)) {
    //     throw new APIError(400, "Invalid user type");
    // }
    if (!['superadmin'].includes(userType)) {
        throw new APIError(400, "Invalid user type");
    }

    // Check if role is valid (should be 'hr' or 'finance' or 'admin')
    if (!['hr', 'finance', 'admin'].includes(role)) {
        throw new APIError(400, "Invalid role type");
    }

    let linkedEntity = await Superuser.findById(superUser);

    if (!linkedEntity) {
        throw new APIError(404,`SuperUser not found`);
    }

    // Create the new user with the given role (HR or Finance)
    const newUser = new UserSuper({
        email,
        password,
        userType,
        role,
        linkedEntityId,
        isVerified: true, // Set isVerified to true for new users
        superUser : superUser
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} login created successfully`,
        user: newUser,
    });
});

export {
    userLogin,
    totalBenchEmployees,
    totalSuppliers,
    totalClients,
    supplierRegisteration,
    acceptSupplierRegisteration,
    rejectSupplierRegisteration,
    getTickets,
    updateTicketStatus,
    createLogin
}