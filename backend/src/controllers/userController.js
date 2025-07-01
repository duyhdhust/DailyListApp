// src/controllers/userController.js

const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Kiểm tra thông tin đầu vào
        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu.' });
        }

        // 2. Kiểm tra xem email đã tồn tại chưa
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email đã tồn tại.' });
        }

        // 3. Băm mật khẩu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 4. Gọi model để tạo người dùng mới
        const newUser = await userModel.createUser(email, passwordHash);

        // 5. Trả về thông báo thành công
        res.status(201).json({
            message: 'Đăng ký thành công!',
            userId: newUser.user_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};