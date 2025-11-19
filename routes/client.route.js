const express = require('express');
const { showAllClient, signupClient } = require('../controller/client.controller');
const router = express.Router();

router.get('/client', showAllClient);
router.post('/client', signupClient);


module.exports = router;