import mongoose from 'mongoose';
// const express = require('express');
// const app = express();
// 환경 변수 설정을 위한 dotenv 패키지 로드
import "dotenv/config";
const connect = () => {
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드
  mongoose
    .connect(process.env.MONGODB_URI,{
        dbName: process.env.MONGODB_DB_NAME, // node_lv1 데이터베이스명을 사용
      }, )
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));

    console.log(process.env.MONGODB_URI);
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;