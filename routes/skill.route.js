const express = require('express');
const { addSkill, allSkills, deleteSkill, updateSkill, getSkillById } = require('../controller/skill.controller');
const checkPermission = require("../utils/auth.util");
const router = express.Router();

router.get('/skill', checkPermission("admin"), allSkills);
router.post('/skill', checkPermission("admin"), addSkill);
router.get('/skill/:id', checkPermission("admin"), getSkillById);
router.put('/skill/:id', checkPermission("admin"), updateSkill);
router.delete('/skill/:id', checkPermission("admin"), deleteSkill);

module.exports = router;