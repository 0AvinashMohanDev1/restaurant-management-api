// restaurant.queries.js
class RestaurantQueries {
    constructor(pool) {
      this.pool = pool;
    }
  
    async getAllRestaurants() {
      const query = 'SELECT * FROM restaurants';
      const result = await this.pool.query(query);
      return result.rows;
    }
  
    async getRestaurantById(restaurantId) {
      const query = 'SELECT * FROM restaurants WHERE restaurant_id = $1';
      const result = await this.pool.query(query, [restaurantId]);
      return result.rows[0];
    }
  
    async addRestaurant(managerId, location, name, rating) {
      const query = 'INSERT INTO restaurants (manager_id, location, name, rating) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await this.pool.query(query, [managerId, location, name, rating]);
      return result.rows[0];
    }
  
    async updateRestaurant(restaurantId, { managerId, location, name, rating }) {
      const query = 'UPDATE restaurants SET manager_id = $1, location = $2, name = $3, rating = $4 WHERE restaurant_id = $5 RETURNING *';
      const result = await this.pool.query(query, [managerId, location, name, rating, restaurantId]);
      return result.rows[0];
    }
  
    async deleteRestaurant(restaurantId) {
      const query = 'DELETE FROM restaurants WHERE restaurant_id = $1 RETURNING *';
      const result = await this.pool.query(query, [restaurantId]);
      return result.rows[0];
    }
  }
  
  module.exports = RestaurantQueries;
  