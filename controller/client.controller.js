const upload = require("../utils/upload.util");
const { hashPassword } = require("../utils/password.util");
const { query } = require("../utils/query.util");
const { success, error } = require("../utils/response.util");


// Sign Up Client
const signupClient = [
  upload("photo", "client"),

  async (req, res) => {
    try {
      const { name, email, password, country } = req.body;
      const photo = req.file ? `client/${req.file.filename}` : null;
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
        "client",
        photo,
        country,
        createdAt,
        null,
        false,
        "active"
      ]);

      success(res, "Client registered successfully!", {
        id: result.insertId,
      });
    } catch (err) {
      error(res, "Failed to register client", err);
    }
  },
];


// Show All Client
const showAllClient = async (req, res) => {
  try {
    const results = await query("SELECT * FROM users WHERE user_type=?", ['client']);

    res.status(200).json({
      success: true,
      message: `${results.length} Clients found.`,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load Clients.",
      error: err.message,
    });
  }
};


module.exports = { signupClient, showAllClient };
