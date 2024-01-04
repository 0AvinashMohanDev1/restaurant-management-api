// table.routes.js
const express = require('express');
const TableController = require('../Controllers/table.controller');

const tableController = new TableController();
const router = express.Router();

// Get all tables
router.get('/', async (req, res) => {
  try {
    const tables = await tableController.getAllTables();
    res.json(tables);
  } catch (error) {
    console.error('Error retrieving tables', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all free tables
router.get('/free', async (req, res) => {
  try {
    const freeTables = await tableController.getFreeTables();
    res.json(freeTables);
  } catch (error) {
    console.error('Error retrieving free tables', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get free tables in a specific restaurant
router.get('/free/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const freeTablesInRestaurant = await tableController.getFreeTablesInRestaurant(restaurantId);

    if (freeTablesInRestaurant) {
      res.json(freeTablesInRestaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error retrieving free tables in restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get free tables based on location
router.get('/free/location/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const freeTablesByLocation = await tableController.getFreeTablesByLocation(location);

    res.json(freeTablesByLocation);
  } catch (error) {
    console.error('Error retrieving free tables by location', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new table
router.post('/', async (req, res) => {
  try {
    const { restaurantId, tableNumber, menuId } = req.body;
    const newTable = await tableController.addTable(restaurantId, tableNumber, menuId);
    res.status(201).json(newTable);
  } catch (error) {
    console.error('Error adding table', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a table
router.put('/:tableId', async (req, res) => {
  try {
    const tableId = parseInt(req.params.tableId);
    const { restaurantId, tableNumber, menuId } = req.body;

    const updatedTable = await tableController.updateTable(tableId, { restaurantId, tableNumber, menuId });
    if (updatedTable) {
      res.json(updatedTable);
    } else {
      res.status(404).json({ error: 'Table not found' });
    }
  } catch (error) {
    console.error('Error updating table', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a table
router.delete('/:tableId', async (req, res) => {
  try {
    const tableId = parseInt(req.params.tableId);
    const deletedTable = await tableController.deleteTable(tableId);

    if (deletedTable) {
      res.json({ message: 'Table deleted successfully' });
    } else {
      res.status(404).json({ error: 'Table not found' });
    }
  } catch (error) {
    console.error('Error deleting table', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
