const db = require("../config/db.config");

// Add skill
const addSkill = async (req, res) => {
  try {
    const { skill_name } = req.body;
    const [result] = await db.execute(`INSERT INTO skills(skill_name)VALUE(?)`, [
      skill_name,
    ]);
    res.status(201).json({
      success: true,
      message: "Skill addded successfully.",
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
    try{
        const [results] = await db.execute(`SELECT * FROM skills ORDER BY skill_id`);
        res.status(200).json({
            success: true,
            message: `${results.length} skills found.`,
            data: results
        });
    }catch(err){
        res.status(500).json({
      success: false,
      message: "Failed to load skill",
      error: err.message,
    });
    };
};

module.exports = {addSkill, allSkills}
