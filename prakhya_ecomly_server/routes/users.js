const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const wishListController = require('../controllers/wishlist');

router.get('/',userController.getUsers);
router.get('/:id',userController.getUserById);
router.put('/:id',userController.updateUser)

//wishlist
router.get('/:id/wishlist',wishlistController.getUserWishlist);
router.post('/:id/wishlist',wishlistController.addToWishlist);
router.delete('/:id/wishlist/:productId',wishlistController.removeFromWishlist);

//cart
router.get('/:id/cart',cartController.getUserCart);
router.post('/:id/cart',cartController.getUserCartCount);
router.delete('/:id/cart/:cartproductId',cartController.getCartProductById);
router.post('/:id/cart',cartProduct.addToCart);
router.put('/:id/cart/:cartProductId',cartController.modifyProductQuantity);
router.delete('/:id/cart:cartProductId',cartController.removeFromCart);


module.exports = router;