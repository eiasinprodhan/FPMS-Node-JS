const express = require('express');
const { showAllClient, signupClient } = require('../controller/client.controller');
const checkPermission = require("../utils/auth.util");
const router = express.Router();

router.get('/client', checkPermission("admin"), showAllClient);
router.post('/client', signupClient);


module.exports = router;