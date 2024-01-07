// restaurant.routes.js
const express = require('express');
const restaurantController = require('../Controllers/restaurant.controller');

// Create an Express router
const router = express.Router();

/**
 * Route to get all restaurants.
 */
router.get('/', async (req, res) => {
  try {
    const restaurants = await restaurantController.getAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    console.error('Error retrieving restaurants', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Route to get a specific restaurant by ID.
 */
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

/**
 * Route to get a restaurant by its name.
 */
router.get("/name/:restaurantName", async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    const restaurant = await restaurantController.getRestaurantByName(restaurantName);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: `No restaurant present with the name ${restaurantName}` });
    }
  } catch (error) {
    console.error('Error retrieving restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Route to get a restaurant by its location.
 */
router.get("/location/:location", async (req, res) => {
  try {
    const restaurantLocation = req.params.location;
    const restaurant = await restaurantController.getRestaurantByLocation(restaurantLocation);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: `No restaurant present near ${restaurantLocation}` });
    }
  } catch (error) {
    console.error('Error retrieving restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Route to get a restaurant by its rating.
 */
router.get("/rating/:rating", async (req, res) => {
  try {
    const restaurantRating = req.params.rating;
    const restaurant = await restaurantController.getRestaurantByRating(restaurantRating);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: `No restaurant present with the rating ${restaurantRating}` });
    }
  } catch (error) {
    console.error('Error retrieving restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Route to get restaurants sorted by rating order (ASC/DESC).
 */
router.get("/rating", async (req, res) => {
  try {
    const order = req.query.order;
    console.log(req.query);

    // Validate the order parameter to prevent SQL injection
    const validOrders = ['ASC', 'DESC'];
    const sanitizedOrder = validOrders.includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

    const restaurant = await restaurantController.getRestaurantBySortedRating(sanitizedOrder);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: `No restaurant present near ${sanitizedOrder}` });
    }
  } catch (error) {
    console.error('Error retrieving restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Route to add a new restaurant.
 */
router.post('/', async (req, res) => {
  try {
    const { manager_id, location, name, rating } = req.body;
    const newRestaurant = await restaurantController.addRestaurant(manager_id, location, name, rating);
    res.status(201).json('New restaurant registered');
  } catch (error) {
    console.error('Error adding restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Route to update a restaurant.
 */
router.put('/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const restaurant = await restaurantController.getRestaurantById(restaurantId);

    const { manager_id = restaurant.manager_id, location = restaurant.location, name = restaurant.name, rating = restaurant.rating } = req.body;

    const updatedRestaurant = await restaurantController.updateRestaurant(restaurantId, { manager_id, location, name, rating });

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

/**
 * Route to delete a restaurant.
 */
router.delete('/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const deletedRestaurant = await restaurantController.deleteRestaurant(restaurantId);

    if (!deletedRestaurant) {
      res.json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error deleting restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
