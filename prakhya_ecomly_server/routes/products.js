const express = require('express');


const router = express.Router();
const productController = require('../controllers/products');
const reviewsController = require('../controllers/reviews');



router.get('/',productController.getProducts);
router.get('/search',productController.searchProducts);
router.post('/:id',productController.getProductById);
router.get('/:id/reviews',reviewController.leaveReview);
router.get('/:id/reviews',reviewController.getProductReviews);

module.exports = router;
