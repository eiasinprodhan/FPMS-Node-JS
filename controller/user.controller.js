const db = require("../config/db.config");
const { generateToken } = require("../utils/jwt.util");
const { comparePassword } = require("../utils/password.util");

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

    const compare_password = await comparePassword(
      password,
      user[0].password
    );

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
  
}

module.exports = loginUser;