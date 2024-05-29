import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/auth.router.js';
import characterRouter from './routes/characters.router.js';
import itemRouter from './routes/items.router.js';
import userRouter from './routes/users.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/characters', characterRouter);
app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB 연결에 성공하였습니다.'))
.catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));

app.get('/', (req, res) => {
    res.send('성공!');
});

app.listen(PORT, () => {
    console.log(`${PORT} 포트로 서버가 열렸습니다.`);
});
