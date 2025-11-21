const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_super_secret_key_here";

// Generate JWT Token
exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

