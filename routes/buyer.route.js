const express = require('express');
const { getAllFreelencer, getFreelencerById, addFreelencer } = require('../controller/buyer.controller');
const router = express.Router();


router.get('/freelencer', getAllFreelencer);
router.get('/freelencer/:id', getFreelencerById);
router.post('/freelencer', addFreelencer); 

module.exports = router;