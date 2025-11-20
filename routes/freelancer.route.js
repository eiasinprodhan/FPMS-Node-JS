const express = require('express');
const { signupFreelencer, showAllFreelencer } = require('../controller/freelancer.controller');
const checkPermission = require("../utils/auth.util");
const router = express.Router();

router.get('/freelancer', checkPermission("admin"), showAllFreelencer);
router.post('/freelancer', signupFreelencer);


module.exports = router;