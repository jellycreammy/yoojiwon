const express = require('express');
const router = express.Router();
const itemSimulatorService = require('../src/itemService');

// 기본 라우트 정의
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// 새로운 아이템 생성 라우트
router.post('/items', async (req, res) => {
    try {
        const newItem = await itemSimulatorService.createNewItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 기존 아이템 수정 라우트
router.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await itemSimulatorService.updateItem(req.params.id, req.body);
        if (updatedItem) {
            res.json(updatedItem);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 기존 아이템 삭제 라우트
// router.delete('/items/:id', async (req, res) => {
//     try {
//         const deleted = await itemSimulatorService.deleteItem(req.params.id);
//         if (deleted) {
//             res.sendStatus(204);
//         } else {
//             res.status(404).send('Item not found');
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// 기존 아이템 조회 라우트
router.get('/items', async (req, res) => {
    try {
        const items = await itemSimulatorService.getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
