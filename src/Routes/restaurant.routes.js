// restaurant.routes.js
const express = require('express');
const RestaurantController = require('../Controllers/restaurant.controller');

const restaurantController = new RestaurantController();
const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await restaurantController.getAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    console.error('Error retrieving restaurants', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const restaurant = await restaurantController.getRestaurantById(restaurantId);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error retrieving restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new restaurant
router.post('/', async (req, res) => {
  try {
    const { managerId, location, name, rating } = req.body;
    const newRestaurant = await restaurantController.addRestaurant(managerId, location, name, rating);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error adding restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a restaurant
router.put('/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const { managerId, location, name, rating } = req.body;

    const updatedRestaurant = await restaurantController.updateRestaurant(restaurantId, { managerId, location, name, rating });
    if (updatedRestaurant) {
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error updating restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a restaurant
router.delete('/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const deletedRestaurant = await restaurantController.deleteRestaurant(restaurantId);

    if (deletedRestaurant) {
      res.json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error deleting restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
