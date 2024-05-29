import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    health: {
        type: Number,
        default: 500,
    },
    power: {
        type: Number,
        default: 100,
    },
    appearance: {
        type: String,
        required: true, // 외형 정보를 문자열로 저장
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
});

export default mongoose.model('Character', CharacterSchema);
