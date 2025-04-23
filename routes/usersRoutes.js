const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.getAllUsers)
router.get('/search', usersController.searchUsers)

module.exports = router
