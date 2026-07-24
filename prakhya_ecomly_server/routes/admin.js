const express = require("express");

const router = express.Router();
const userController = require("../controllers/admin/users");
const categoriesController = require("../controllers/admin/categories");
const ordersController = require("../controllers/admin/orders");
const productController = require("../controllers/admin/products");

//USERS

router.get("/users/count", userController.getUserCount);
router.delete("/users/:id", userController.deleteUser);

//CATEGORIES
router.post("/categories", categoriesController.addCategory);
router.put("/categories/:id", categoriesController.editCategory);
router.delete("category/:id", categoriesController.deleteCategory);

//PRODUCTS
// router.get("/products/count", productController.getProductsCount);
// router.post("/products", productController.addProducts);
// router.put("/product/:id", productController.editProduct);
// router.delete("/product/:id/images", productController.deleteProductImages);
// router.delete("/products/:id",productController.deleteProduct)

//ORDERS

router.get("/orders", ordersController.getOrders);
router.get("/orders/:count", ordersController.getOrderCount);
router.put("/orders/:id", ordersController.changeOrderStatus);
router.delete("/orders/:id",ordersController.deleteOrder);

module.exports = router;
