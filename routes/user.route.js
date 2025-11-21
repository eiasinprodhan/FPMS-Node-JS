const express = require('express');
const {loginUser, userProfile} = require('../controller/user.controller');
const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", userProfile);

module.exports = router;