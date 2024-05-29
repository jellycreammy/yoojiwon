import express from 'express';
import Item from '../schemas/items.schema.js';
import User from '../schemas/users.schema.js';
import Character from '../schemas/characters.schema.js';
import CharacterItem from '../schemas/characterItems.schema.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/buy', authMiddleware, async (req, res) => {
    const { itemCode, characterId } = req.body;
    if (!itemCode || !characterId) {
        return res.status(400).json({ message: 'Item code and character ID are required' });
    }

    try {
        const item = await Item.findOne({ itemCode });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const user = req.user;
        const character = await Character.findById(characterId);

        if (user.gameCurrency < item.price) {
            return res.status(400).json({ message: 'Not enough game currency' });
        }

        user.gameCurrency -= item.price;
        await user.save();

        const characterItem = new CharacterItem({
            character: character._id,
            item: item._id,
        });
        await characterItem.save();

        character.items.push(characterItem._id);
        await character.save();

        res.status(200).json({ message: 'Item purchased successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing item', error });
    }
});

router.post('/sell', authMiddleware, async (req, res) => {
    const { characterId, itemId } = req.body;
    if (!characterId || !itemId) {
        return res.status(400).json({ message: 'Character ID and item ID are required' });
    }

    try {
        const characterItem = await CharacterItem.findOne({ character: characterId, item: itemId });
        if (!characterItem) {
            return res.status(404).json({ message: 'Item not found on character' });
        }

        const item = await Item.findById(itemId);
        const user = req.user;

        const sellPrice = Math.floor(item.price * 0.6);

        user.gameCurrency += sellPrice;
        await user.save();

        await CharacterItem.deleteOne({ _id: characterItem._id });

        const character = await Character.findById(characterId);
        character.items.pull(characterItem._id);
        await character.save();

        res.status(200).json({ message: 'Item sold successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error selling item', error });
    }
});

router.post('/equip', authMiddleware, async (req, res) => {
    const { characterId, itemId } = req.body;
    if (!characterId || !itemId) {
        return res.status(400).json({ message: 'Character ID and item ID are required' });
    }

    try {
        const character = await Character.findById(characterId);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        const characterItem = await CharacterItem.findOne({ character: characterId, item: itemId });
        if (!characterItem) {
            return res.status(404).json({ message: 'Item not found on character' });
        }

        // 아이템 장착 로직 추가 (예: 캐릭터의 스탯 증가)
        character.health += characterItem.itemStat.health;
        character.power += characterItem.itemStat.power;
        await character.save();

        res.status(200).json({ message: 'Item equipped successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error equipping item', error });
    }
});

router.post('/unequip', authMiddleware, async (req, res) => {
    const { characterId, itemId } = req.body;
    if (!characterId || !itemId) {
        return res.status(400).json({ message: 'Character ID and item ID are required' });
    }

    try {
        const character = await Character.findById(characterId);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        const characterItem = await CharacterItem.findOne({ character: characterId, item: itemId });
        if (!characterItem) {
            return res.status(404).json({ message: 'Item not found on character' });
        }

        // 아이템 해제 로직 추가 (예: 캐릭터의 스탯 감소)
        character.health -= characterItem.itemStat.health;
        character.power -= characterItem.itemStat.power;
        await character.save();

        res.status(200).json({ message: 'Item unequipped successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error unequipping item', error });
    }
});

export default router;
