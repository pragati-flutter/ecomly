const express = require("express");

const router = express.Router();
const productController = require("../controllers/products");
const reviewsController = require("../controllers/reviews");

router.get("/", productController.getProducts);
router.get("/search", productController.searchProducts);
router.get("/:id", productController.getProductById);
router.post("/:id/reviews", reviewsController.leaveReview);
router.get("/:id/reviews", reviewsController.getProductReview);

module.exports = router;
