const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function checkPermission(requiredRole) {
    return async function (req, res, next) {
        try {

            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ message: "Authorization header missing" });
            }

            const parts = authHeader.split(" ");

            if (parts.length !== 2) {
                return res.status(401).json({ message: "Invalid Authorization format" });
            }

            const scheme = parts[0];
            const token = parts[1];

            if (scheme !== "Bearer") {
                return res.status(401).json({ message: "Authorization must be Bearer token" });
            }

            if (!token) {
                return res.status(401).json({ message: "Token missing" });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            console.log("Decoded Payload:", decoded);

            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: "Forbidden — no permission" });
            }

            next();
        } catch (err) {
            console.error("JWT ERROR:", err.message);
            return res.status(401).json({ message: "Authentication failed" });
        }
    };
};
