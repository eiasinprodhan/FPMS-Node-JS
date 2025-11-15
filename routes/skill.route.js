const express = require('express');
const { addSkill, allSkills, deleteSkill, updateSkill, getSkillById } = require('../controller/skill.controller');
const router = express.Router();

router.get('/skill', allSkills);
router.post('/skill', addSkill);
router.get('/skill/:id', getSkillById);
router.put('/skill/:id', updateSkill);
router.delete('/skill/:id', deleteSkill);

module.exports = router;