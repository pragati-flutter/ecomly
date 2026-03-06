const express = require('express');

const router = express.Router();
const productControllers = require('../controllers/products')
router.get('/products/counts',productControllers.getProductsCount);
router.get('/products/:id',);
router.delete('/products/:id',);
router.put('/products/:id',);
module.exports = router;
