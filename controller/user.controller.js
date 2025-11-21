const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { generateToken } = require("../utils/jwt.util");
const { comparePassword } = require("../utils/password.util");

dotenv.config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(401).json({
        success: false,
        message: "No user found. Please Sign Up.",
      });
    }

    const compare_password = await comparePassword(password, user[0].password);

    if (!compare_password) {
      return res.status(401).json({
        success: false,
        message: "Your password is wrong.",
      });
    }

    const payload = {
      id: user[0].user_id,
      email: user[0].email,
      role: user[0].user_type,
    };

    const jwt = await generateToken(payload);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token: jwt,
      user: {
        id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].user_type,
        country: user[0].country,
        photo: user[0].photo,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// User Profile
const userProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Invalid Authorization format" });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
      return res.status(401).json({ message: "Authorization must be Bearer token" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.id;

    const [user] = await db.execute("SELECT * FROM users WHERE user_id = ?", [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: {
        id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].user_type,
        photo: user[0].profile_image,
        country: user[0].country,
        created: user[0].created_at
      },
    });
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = { loginUser, userProfile };
