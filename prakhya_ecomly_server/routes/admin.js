const express = require("express");

const router = express.Router;
const userController = require("../controllers/admin/users");
const categoriesController = require("../controllers/admin/categories");

//USERS

router.get("/users/count", adminController.getUserController);
router.delete("/users/:id", adminController.deleteUser);

//CATEGORIES
router.post("/categories", adminController.addCategory);
router.put("/categories/:id", adminController.editCategory);
router.delete("category/:id", adminController.deleteCategory);

//PRODUCTS
router.get("/products/count", adminController.getProductsCount);
router.post("/products", adminController.addProducts);
router.put("/product/:id", adminController.editProduct);
router.delete("/product/:id/images", adminController.deleteProductImages);
router.delete("/products/:id",adminController.deleteProduct)

//ORDERS

router.get("/orders", adminController.getOrders);
router.get("/orders/:count", adminController.getOrderCount);
router.put("/orders/:id", adminController.changeOrderStatus);

module.exports = router;
