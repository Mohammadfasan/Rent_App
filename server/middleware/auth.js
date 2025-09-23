import jwt from 'jsonwebtoken'
import User from "../models/Schema.js"

export const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            
            if (!token) {
                return res.status(401).json({ success: false, message: "No token provided" });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");
            
            if (!user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }
            
            req.user = user;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not authorized, no token" });
        }
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ success: false, message: "Your account cannot be authenticated." });
    }
};