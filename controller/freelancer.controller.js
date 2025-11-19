const upload = require("../utils/upload.util");
const { hashPassword } = require("../utils/password.util");
const { query } = require("../utils/query.util");
const { success, error } = require("../utils/response.util");


// Sign Up Freelencer
const signupFreelencer = [
  upload("photo", "freelancer"),

  async (req, res) => {
    try {
      const { name, email, password, country } = req.body;
      const photo = req.file ? `freelancer/${req.file.filename}` : null;
      const hashed = await hashPassword(password);
      const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const sql = `
        INSERT INTO users (name, email, password, user_type, profile_image, country, created_at, last_login, is_verified, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const result = await query(sql, [
        name,
        email,
        hashed,
        "freelancer",
        photo,
        country,
        createdAt,
        null,
        false,
        "active"
      ]);

      success(res, "Freelancer registered successfully!", {
        id: result.insertId,
      });
    } catch (err) {
      error(res, "Failed to register freelancer", err);
    }
  },
];


// Show All Freelencer
const showAllFreelencer = async (req, res) => {
  try {
    const results = await query("SELECT * FROM users WHERE user_type=?", ['freelancer']);

    res.status(200).json({
      success: true,
      message: `${results.length} freelencers found.`,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load freelencers.",
      error: err.message,
    });
  }
};


module.exports = { signupFreelencer, showAllFreelencer };
