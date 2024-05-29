import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gameCurrency: {
        type: Number,
        default: 1000, // 초기 게임 머니
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
    }],
});
// 비밀번호 해싱
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model('User', UserSchema);
