// routes/characters.router.js

import express from 'express';
import Character from '../schemas/characters.schema.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/characters', authMiddleware, async (req, res) => {
  try {
    const { name, appearance } = req.body;
    const character = new Character({
      name,
      appearance,
      owner: req.user._id,
    });

    await character.save();
    req.user.characters.push(character._id);
    await req.user.save();

    res.status(201).json({ characterId: character._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/characters/:characterId', authMiddleware, async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findOne({ _id: characterId, owner: req.user._id });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/characters/:characterId', authMiddleware, async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findOneAndDelete({ _id: characterId, owner: req.user._id });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json({ message: 'Character deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
