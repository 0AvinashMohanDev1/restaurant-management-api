// user.queries.js
class UserQueries {
    constructor(pool) {
      this.pool = pool;
    }
  
    async getAllUsers() {
      const query = 'SELECT * FROM users';
      const result = await this.pool.query(query);
      return result.rows;
    }
  
    async getUserById(userId) {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const result = await this.pool.query(query, [userId]);
      return result.rows[0];
    }
  
    async addUser(username, password, role, restaurantId = null) {
      const query = 'INSERT INTO users (username, password, role, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await this.pool.query(query, [username, password, role, restaurantId]);
      return result.rows[0];
    }
  
    async updateUser(userId, { username, password, role, restaurantId }) {
      const query = 'UPDATE users SET username = $1, password = $2, role = $3, restaurant_id = $4 WHERE user_id = $5 RETURNING *';
      const result = await this.pool.query(query, [username, password, role, restaurantId, userId]);
      return result.rows[0];
    }
  
    async deleteUser(userId) {
      const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
      const result = await this.pool.query(query, [userId]);
      return result.rows[0];
    }
  }
  
  module.exports = UserQueries;
  