const express = require('express');
const { signupFreelencer, showAllFreelencer } = require('../controller/freelancer.controller');
const router = express.Router();

router.get('/freelancer', showAllFreelencer);
router.post('/freelancer', signupFreelencer);


module.exports = router;