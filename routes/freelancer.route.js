const express = require('express');
const { signupFreelencer, showAllFreelencer, freelancerProfile } = require('../controller/freelancer.controller');
const checkPermission = require("../utils/auth.util");
const router = express.Router();

router.get('/freelancer', showAllFreelencer);
router.post('/freelancer', signupFreelencer);
router.post('/updateProfile', freelancerProfile);


module.exports = router;