// restaurant.queries.js

/**
 * SQL query to retrieve all restaurants from the database.
 */
const getAllRestaurants = 'SELECT * FROM "Restaurant"';

/**
 * SQL query to retrieve a restaurant by its ID from the database.
 */
const getRestaurantById = 'SELECT * FROM "Restaurant" WHERE restaurant_id=$1';

/**
 * SQL query to retrieve restaurants by their name from the database.
 */
const getRestaurantByName = 'SELECT * FROM "Restaurant" WHERE name=$1';

/**
 * SQL query to retrieve restaurants by their location from the database.
 */
const getRestaurantByLocation = 'SELECT * FROM "Restaurant" WHERE location=$1';

/**
 * SQL query to retrieve restaurants by their rating from the database.
 */
const getRestaurantByRating = 'SELECT * FROM "Restaurant" WHERE rating=$1';

/**
 * SQL query to retrieve restaurants sorted by rating from the database.
 */
const getRestaurantBySortedRating = 'SELECT * FROM "Restaurant" ORDER BY rating';

/**
 * SQL query to add a new restaurant to the database.
 */
const addRestaurant = 'INSERT INTO "Restaurant" (manager_id, location, name, rating) VALUES ($1, $2, $3, $4)';

/**
 * SQL query to update an existing restaurant in the database.
 */
const updateRestaurant = 'UPDATE "Restaurant" SET manager_id = $1, location = $2, name = $3, rating = $4 WHERE restaurant_id = $5 RETURNING *';

/**
 * SQL query to delete a restaurant from the database by its ID.
 */
const deleteRestaurant = 'DELETE FROM "Restaurant" WHERE restaurant_id = $1';

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
