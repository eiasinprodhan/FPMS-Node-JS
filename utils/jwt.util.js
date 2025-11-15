const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_super_secret_key_here"; // Move to .env later

// Generate JWT Token
exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token valid for 1 hour
};
