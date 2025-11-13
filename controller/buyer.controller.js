const db = require("../config/db.config");

// Get all Freelencers
const getAllFreelencer = async (req, res) => {
  try {
    const [results] = await db.execute("SELECT * FROM users");

    res.status(200).json({
      success: true,
      message: results.length
        ? "Freelencer retrieved successfully"
        : "No Freelencer found",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load Freelencer",
      error: err.message,
    });
  }
};

// Get Freelencer by id
const getFreelencerById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.execute("SELECT * FROM users WHERE id=?", [id]);

    res.status(200).json({
      success: true,
      message: results.length
        ? "Freelencer retrieved successfully"
        : "No Freelencer found",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load Freelencer",
      error: err.message,
    });
  }
};

// Add Freelencer
const addFreelencer = async (req, res) => {
  const { full_name, email, password_hash, profile_image, country } = req.body;
  const createdDate = new Date();
  const userType = 'freelancer';

  try {
    const [results] = await db.execute(
      `INSERT INTO users(full_name, email, password_hash, user_type, profile_image, country, created_at)VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [full_name, email, password_hash, userType, profile_image, country, createdDate]
    );
    res.status(201).json({
      success: true,
      message: "Freelencer added successfully.",
      data: results.insertId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add Freelencer.",
      error: err.message,
    });
  }
};

module.exports = { getAllFreelencer, addFreelencer, getFreelencerById };
