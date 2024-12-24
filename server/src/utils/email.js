import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    // console.log("Sending email with options:", options);

    // Initialize Mailgen instance with default theme and brand configuration
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "api",
            link: "https://plugnhire.com",
        },
    });

    // Generate the plaintext and HTML versions of the email
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    // console.log("Generated email HTML content:", emailHtml);

    // Create a Nodemailer transporter instance
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });
    // Define the email details
    const mail = {
        from: "no-reply@plugnhire.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml,
    };
    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error(
            "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file"
        );
        console.error("Error:", error);
    }
};

const clientRegisterMail = (savedClient) => {
    return {
        body: {
            name: "Admin", // Addressed to the admin
            intro: `A new client registration request has been received. Below are the details of the client for your review:`,
            table: {
                data: [
                    { label: "Contact Person Name", value: savedClient.contactPersonName },
                    { label: "Designation", value: savedClient.designation },
                    { label: "Email Address", value: savedClient.emailAddress },
                    { label: "Phone Number", value: savedClient.phoneNumber },
                    { label: "Company Website", value: savedClient.companyWebsite },
                    { label: "Company Name", value: savedClient.companyName },
                    { label: "Industry Type", value: savedClient.industryType },
                    { label: "Office Address", value: savedClient.officeAddress },
                    { label: "State", value: savedClient.state },
                    { label: "Country", value: savedClient.country },
                    { label: "ZIP Code", value: savedClient.zipCode },
                    { label: "Business Type", value: savedClient.businessType },
                    { label: "Employee Strength", value: savedClient.employeeStrength },
                    { label: "Email", value: savedClient.email },
                    { label: "Documents", value: savedClient.documents.map(doc => `${doc.type}: ${doc.number}`).join(", ") || "N/A" },
                    { label: "Company Logo URL", value: savedClient.companyLogo || "N/A" },
                    // { label: "Account Verified", value: savedClient.isAccountVerified ? "Yes" : "No" },
                    // { label: "Status", value: savedClient.status || "Pending" },
                ],
            },
            // action: {
            //     instructions: "To approve or reject this registration request, please use the button below:",
            //     button: {
            //         color: "#FF5733", // Highlighted color for admin action
            //         text: "Review Registration Request",
            //         link: `https://example.com/admin/review-registration/${savedClient._id}`, // Unique link for admin to review
            //     },
            // },
            outro: "If you have any questions or need assistance, please contact the system administrator.",
            attachments: savedClient.documents.map((doc, index) => ({
                label: `Document ${index + 1}: ${doc.type || "Unknown"}`,
                image: doc.filePath, // Document image URL from Cloudinary
            })),
        },
    };
};

const supplierRegisterMail = (savedSupplier) => {
    return {
        body: {
            name: "Admin", // Addressed to the admin
            intro: `A new supplier registration request has been received. Below are the details of the supplier for your review:`,
            table: {
                data: [
                    { label: "Contact Person Name", value: savedSupplier.contactPersonName },
                    { label: "Designation", value: savedSupplier.designation },
                    { label: "Email Address", value: savedSupplier.emailAddress },
                    { label: "Phone Number", value: savedSupplier.phoneNumber },
                    { label: "Company Website", value: savedSupplier.companyWebsite },
                    { label: "Company Name", value: savedSupplier.companyName },
                    { label: "Industry Type", value: savedSupplier.industryType },
                    { label: "Office Address", value: savedSupplier.officeAddress },
                    { label: "State", value: savedSupplier.state },
                    { label: "Country", value: savedSupplier.country },
                    { label: "ZIP Code", value: savedSupplier.zipCode },
                    { label: "Account Holder Name", value: savedSupplier.accountHolderName },
                    { label: "Bank Name & Branch", value: savedSupplier.bankNameAndBranch },
                    { label: "Account Number", value: savedSupplier.accountNumber },
                    { label: "SWIFT/IFSC Code", value: savedSupplier.swiftOrIfscCode },
                    { label: "Business Type", value: savedSupplier.businessType },
                    { label: "Employee Strength", value: savedSupplier.employeeStrength },
                    { label: "Email", value: savedSupplier.email },
                    { label: "Account Verified", value: savedSupplier.isAccountVerified ? "Yes" : "No" },
                    { label: "Status", value: savedSupplier.status || "Pending" },
                ],
            },
            // action: {
            //     instructions: "To approve or reject this registration request, please use the button below:",
            //     button: {
            //         color: "#FF5733", // Highlighted color for admin action
            //         text: "Review Supplier Registration Request",
            //         link: `https://example.com/admin/review-supplier-registration/${savedSupplier._id}`, // Unique link for admin to review
            //     },
            // },
            outro: "If you have any questions or need assistance, please contact the system administrator.",
            attachments: [
                {
                    label: "Company Logo",
                    image: savedSupplier.companyLogo, // Company logo URL from Cloudinary
                },
                ...savedSupplier.documents.map((doc, index) => ({
                    label: `Document ${index + 1}: ${doc.type || "Unknown"}`,
                    image: doc.filePath, // Document image URL from Cloudinary
                })),
                ...(savedSupplier.supportingDocument
                    ? [
                          {
                              label: "Supporting Document",
                              image: savedSupplier.supportingDocument, // Supporting document URL from Cloudinary
                          },
                      ]
                    : []),
            ],
        },
    };
};


export {
    clientRegisterMail,
    sendEmail,
    supplierRegisterMail
}