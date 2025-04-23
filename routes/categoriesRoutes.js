const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.get('/parent/:id', categoryController.getParentCategories)
router.get('/child/:id', categoryController.getChildCategories)


module.exports = router
