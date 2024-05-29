import mongoose from 'mongoose';

const CharacterItemSchema = new mongoose.Schema({
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
        required: true,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

export default mongoose.model('CharacterItem', CharacterItemSchema);
