import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const useClientSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        userType: {
            type: String,
            enum: ["client"],
            required: true,
        },
        role: {
            type: String,
            enum: ["hr", "finance", "admin"],
            required: true,
        },
        linkedEntityId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'userType', // Dynamically references the correct model based on userType
        },
        refreshToken: {
            type: String,
        },
        permissions: {
            type: [String],
            default: ["view_dashboard",
                "edit_profile",
                "access_reports",],
            enum: [
                "view_dashboard",
                "edit_profile",
                "access_reports",
                "manage_users",
                "manage_settings",
                "restricted_feature_1",
                "restricted_feature_2",
            ],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        clientId: {
            type: Schema.Types.ObjectId,
            ref: "Client",
        },
    },
    {
        timestamps: true,
    }
);

// Password hashing middleware
useClientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password validation method
useClientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Access Token generation method
useClientSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            userType: this.userType,
            linkedEntityId: this.linkedEntityId,
            role: this.role,
            permissions: this.permissions, // Attach permissions to token for easy access
            clientId : this.clientId
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Refresh Token generation method
useClientSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

const UserClient = mongoose.model("UserClient", useClientSchema);

export default UserClient;
