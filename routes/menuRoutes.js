const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/get', menuController.getMenus);

module.exports = router;
