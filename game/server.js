const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes.js');
const path = require('path');
require('dotenv').config(); // .env 파일에서 환경 변수 로드

const app = express();

// 환경 변수 확인 및 MongoDB 연결
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });


app.use(express.json());

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));

// 아이템 관련 라우터 사용
app.use('/api/items', itemRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
