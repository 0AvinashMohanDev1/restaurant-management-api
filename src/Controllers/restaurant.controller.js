// restaurant.controller.js
const pool = require('../../db'); 
const restaurantQueries = require('../Queries/restaurant.queries');

/**
 * Retrieves all restaurants from the database.
 * @returns {Array} An array of restaurant objects.
 */
const getAllRestaurants = async () => {
  const result = await pool.query(restaurantQueries.getAllRestaurants);
  return result.rows;
}

/**
 * Retrieves a restaurant by its ID from the database.
 * @param {number} restaurantId - The ID of the restaurant.
 * @returns {Object} The restaurant object.
 */
const getRestaurantById = async (restaurantId) => {
  const result = await pool.query(restaurantQueries.getRestaurantById, [restaurantId]);
  return result.rows[0];
}

/**
 * Retrieves restaurants by their name from the database.
 * @param {string} restaurantName - The name of the restaurant.
 * @returns {Array} An array of restaurant objects.
 */
const getRestaurantByName = async (restaurantName) => {
  const result = await pool.query(restaurantQueries.getRestaurantByName, [restaurantName]);
  return result.rows;
}

/**
 * Retrieves restaurants by their location from the database.
 * @param {string} restaurantLocation - The location of the restaurant.
 * @returns {Array} An array of restaurant objects.
 */
const getRestaurantByLocation = async (restaurantLocation) => {
  const result = await pool.query(restaurantQueries.getRestaurantByLocation, [restaurantLocation]);
  return result.rows;
}

/**
 * Retrieves restaurants by their rating from the database.
 * @param {number} restaurantRating - The rating of the restaurant.
 * @returns {Array} An array of restaurant objects.
 */
const getRestaurantByRating = async (restaurantRating) => {
  const result = await pool.query(restaurantQueries.getRestaurantByRating, [restaurantRating]);
  return result.rows;
}

/**
 * Retrieves restaurants sorted by rating from the database.
 * @param {string} restaurantRatingOrder - The order in which the restaurants should be sorted (ASC or DESC).
 * @returns {Array} An array of restaurant objects.
 */
const getRestaurantBySortedRating = async (restaurantRatingOrder) => {
  console.log(`${restaurantQueries.getRestaurantBySortedRating} ${restaurantRatingOrder}`)
  const result = await pool.query(`${restaurantQueries.getRestaurantBySortedRating} ${restaurantRatingOrder}`);
  return result.rows;
}

/**
 * Adds a new restaurant to the database.
 * @param {number} manager_id - The ID of the manager associated with the restaurant.
 * @param {string} location - The location of the restaurant.
 * @param {string} name - The name of the restaurant.
 * @param {number} rating - The rating of the restaurant.
 * @returns {Object} The added restaurant object.
 */
const addRestaurant = async (manager_id, location, name, rating) => {
  const result = await pool.query(restaurantQueries.addRestaurant, [manager_id, location, name, rating]);
  return result.rows[0];
}

/**
 * Updates an existing restaurant in the database.
 * @param {number} restaurantId - The ID of the restaurant to be updated.
 * @param {Object} restaurantDetails - An object containing updated restaurant information.
 * @returns {Object} The updated restaurant object.
 */
const updateRestaurant = async (restaurantId, { manager_id, location, name, rating }) => {
  const result = await pool.query(restaurantQueries.updateRestaurant, [manager_id, location, name, rating, restaurantId]);
  return result.rows[0];
}

/**
 * Deletes a restaurant from the database by its ID.
 * @param {number} restaurantId - The ID of the restaurant to be deleted.
 * @returns {Object} The deleted restaurant object.
 */
const deleteRestaurant = async (restaurantId) => {
  const result = await pool.query(restaurantQueries.deleteRestaurant, [restaurantId]);
  return result.rows[0];
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByName,
  getRestaurantByLocation,
  getRestaurantByRating,
  getRestaurantBySortedRating,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant
};
