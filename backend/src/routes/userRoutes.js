// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint cho việc đăng ký tài khoản mới
// POST /api/users/register
router.post('/register', userController.registerUser);

// (Thêm các route khác như /login ở đây)

module.exports = router;