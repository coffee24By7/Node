const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');

router.get('/', storeController.homePage);

module.exports = router;
