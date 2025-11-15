const express = require('express');
const { signupFreelencer, showAllFreelencer } = require('../controller/user.controller');
const router = express.Router();

router.get('/freelencer', showAllFreelencer);
router.post('/freelencer', signupFreelencer);


module.exports = router;