const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.post('/', wishlistController.addToWishlist);
router.get('/', wishlistController.getWishlist);
router.get('/:userId', wishlistController.getUserWishlist);

module.exports = router;
