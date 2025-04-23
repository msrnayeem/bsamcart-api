const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Route for adding an order
router.post('/', orderController.addOrder);

// Route for retrieving all orders
router.get('/', orderController.getAllOrders);

// Route for retrieving a single order by ID
router.get('/:id', orderController.getOrderById);

module.exports = router;
