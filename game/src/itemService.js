const Item = require('../schemas/Item');

// 새로운 아이템 생성 함수
async function createNewItem(itemData) {
    try {
        // 아이템 데이터 유효성 검사
        if (!itemData.name || !itemData.description) {
            throw new Error('Item name and description are required');
        }
        
        const newItem = await Item.create(itemData);
        console.log('Item created:', newItem);
        return newItem;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
}

// 아이템 수정 함수
async function updateItem(itemId, newData) {
    try {
        // 아이템 데이터 유효성 검사
        if (!newData.name || !newData.description) {
            throw new Error('Item name and description are required');
        }

        const updatedItem = await Item.findByIdAndUpdate(itemId, newData, { new: true });
        if (updatedItem) {
            console.log('Item updated:', updatedItem);
            return updatedItem;
        } else {
            throw new Error(`Item with ID ${itemId} not found`);
        }
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}

// 아이템 삭제 함수
async function deleteItem(itemId) {
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (deletedItem) {
            console.log(`Item with ID ${itemId} deleted`);
            return true;
        } else {
            console.log(`Item with ID ${itemId} not found`);
            return false;
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

// 현재 저장된 모든 아이템 목록을 반환하는 함수
async function getAllItems() {
    try {
        const items = await Item.find({});
        console.log('All items retrieved:', items);
        return items;
    } catch (error) {
        console.error('Error getting all items:', error);
        throw error;
    }
}

module.exports = {
    createNewItem,
    updateItem,
    deleteItem,
    getAllItems
};
