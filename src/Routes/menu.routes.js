// menu.routes.js
const express = require('express');
const MenuController = require('../Controllers/menu.controller');
const { authenticateToken, authorizeManager } = require('../Middleware/authMiddleware');

const router = express.Router();
const menuController = new MenuController();

// Route to get all items
router.get('/', async (req, res) => {
  try {
    const allItems = await menuController.getAllItems();
    res.json(allItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new item (requires manager authorization)
router.post('/', authenticateToken, authorizeManager, async (req, res) => {
  try {
    const { itemName, price } = req.body;
    const newItem = await menuController.addItem(itemName, price);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update an item (requires manager authorization)
router.put('/:itemId', authenticateToken, authorizeManager, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { itemName, price } = req.body;
    const updatedItem = await menuController.updateItem(itemId, { itemName, price });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete an item (requires manager authorization)
router.delete('/:itemId', authenticateToken, authorizeManager, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await menuController.deleteItem(itemId);
    res.json(deletedItem);
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
