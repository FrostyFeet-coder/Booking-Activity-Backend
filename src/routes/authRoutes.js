const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);  // Check that this matches exactly
router.post('/login', authController.login);  // Login route

module.exports = router;
