const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const router = require('./products');

router.get('/',categoryController.getCategories);
router.get('/:id',categoryController.getCategoryById);

module.exports = router;


