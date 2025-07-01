// server.js

const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');

// Cấu hình để sử dụng file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware để đọc JSON từ body của request
app.use(express.json());

// Định nghĩa route chính
app.get('/', (req, res) => {
    res.send('API cho Daily List đang hoạt động!');
});

// Sử dụng các routes cho người dùng
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});