import Client from "../models/client.model.js";
import Superuser from "../models/superUser.model.js";
import Supplier from "../models/supplier.model.js";
import User from "../models/user.model.js";
import { APIError } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const TOKEN_COOKIE_NAME = 'accessToken';

// Middleware to fetch access token from all three locations
export const fetchAccessToken = asyncHandler(async (req, res, next) => {
    let accessToken;
    console.log("inside middleware")
    // Check headers for Bearer token
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        accessToken = authHeader.substring(7);
    }

    // Check cookies if token not found in headers
    if (!accessToken && req.cookies[TOKEN_COOKIE_NAME]) {
        accessToken = req.cookies[TOKEN_COOKIE_NAME];
    }
    // console.log("prepre")
    // If token is found, verify and decode it
    if (accessToken) {
        // console.log("first")
        try {
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            console.log(decodedToken)

            req.user = decodedToken;
            // Check token type and retrieve corresponding user data
            // if (decodedToken.type == "supplier") {
            //     const supplier = await Supplier.findById(decodedToken._id).select("-password -refreshToken");
            //     req.supplier = supplier;
            //     // console.log("supplier is",req.supplier._id)
            // } else if (decodedToken.type == "client") {
            //     const client = await Client.findById(decodedToken._id).select("-password -refreshToken");
            //     req.client = client;
            // } else {
            //     const supeUser = await Superuser.findById(decodedToken._id).select("-password -refreshToken");
            //     req.supeUser = supeUser;
            // }

            // Token is valid, move to the next middleware/route
            console.log("exit middleware")
            next();
            
        } catch (err) {
            console.error("Token verification failed:", err.message);

            // Token is invalid or expired
            res.status(401).json({ message: "Invalid or expired access token" });
        }
    } else {
        // No token found, redirect to login or send unauthorized response
        res.status(401).json({ message: "No access token provided, please log in." });
    }
});

