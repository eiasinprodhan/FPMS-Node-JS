const { query } = require("../utils/query.util");

// Add Skill
const addSkill = async (req, res) => {
  try {
    const { skill_name } = req.body;

    const result = await query("INSERT INTO skills(skill_name) VALUES(?)", [
      skill_name,
    ]);

    res.status(201).json({
      success: true,
      message: "Skill added successfully.",
      data: result.insertId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add skill.",
      error: err.message,
    });
  }
};

// All Skills
const allSkills = async (req, res) => {
  try {
    const results = await query("SELECT * FROM skills ORDER BY skill_id");

    res.status(200).json({
      success: true,
      message: `${results.length} skills found.`,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load skills.",
      error: err.message,
    });
  }
};

// Get Skill By Id
const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await query("SELECT * FROM skills WHERE skill_id = ?", [
      id,
    ]);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Skill not found with this ID.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill found.",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching skill.",
      error: err.message,
    });
  }
};

// Update Skill
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill_name } = req.body;

    const result = await query(
      "UPDATE skills SET skill_name = ? WHERE skill_id = ?",
      [skill_name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Skill not found with id ${id}.`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill.",
      error: err.message,
    });
  }
};

// Delete Skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query("DELETE FROM skills WHERE skill_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Skill not found with id ${id}.`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
      deleted_id: id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill.",
      error: err.message,
    });
  }
};

module.exports = {
  addSkill,
  allSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
