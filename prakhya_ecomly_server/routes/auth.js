const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const {body} = require('express-validator');
const validateUser = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 character').isStrongPassword().withMessage('Password must contain one uppercase one lowercase and one symbol'),
    body('phone').isMobilePhone().withMessage('Please enter a valid mobile number'),
     
];
  
router.post('/login', (req, res) => {
    return res.json({ 'name': 'Paul', 'age': 200 });
});
router.post('/register', validateUser,authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyPasswordResetOtp);
router.post('/reset-password', authController.resetPassword);
module.exports = router;