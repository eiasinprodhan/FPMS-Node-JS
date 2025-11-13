const express = require('express');
const { addSkill, allSkills } = require('../controller/skill.controller');
const router = express.Router();

router.get('/skill', allSkills);
router.post('/skill', addSkill);

module.exports = router;