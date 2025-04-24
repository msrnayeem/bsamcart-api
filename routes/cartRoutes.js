const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/user/:userId', cartController.getUserCart);
router.post('/add', cartController.addToCart);
router.delete('/remove/:userId/:productId', cartController.removeFromCart);

module.exports = router;
