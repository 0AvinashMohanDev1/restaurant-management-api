// table.queries.js
class TableQueries {
    constructor(pool) {
      this.pool = pool;
    }
  
    async getAllTables() {
      const query = 'SELECT * FROM tables';
      const result = await this.pool.query(query);
      return result.rows;
    }
  
    async getFreeTables() {
      const query = 'SELECT * FROM tables WHERE is_occupied = FALSE';
      const result = await this.pool.query(query);
      return result.rows;
    }
  
    async getFreeTablesInRestaurant(restaurantId) {
      const query = 'SELECT * FROM tables WHERE is_occupied = FALSE AND restaurant_id = $1';
      const result = await this.pool.query(query, [restaurantId]);
      return result.rows;
    }
  
    async getFreeTablesByLocation(location) {
      const query = 'SELECT * FROM tables AS t JOIN restaurants AS r ON t.restaurant_id = r.restaurant_id WHERE t.is_occupied = FALSE AND r.location = $1';
      const result = await this.pool.query(query, [location]);
      return result.rows;
    }
  
    async addTable(restaurantId, tableNumber, menuId) {
      const query = 'INSERT INTO tables (restaurant_id, table_number, menu_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await this.pool.query(query, [restaurantId, tableNumber, menuId]);
      return result.rows[0];
    }
  
    async updateTable(tableId, { restaurantId, tableNumber, menuId }) {
      const query = 'UPDATE tables SET restaurant_id = $1, table_number = $2, menu_id = $3 WHERE table_id = $4 RETURNING *';
      const result = await this.pool.query(query, [restaurantId, tableNumber, menuId, tableId]);
      return result.rows[0];
    }
  
    async deleteTable(tableId) {
      const query = 'DELETE FROM tables WHERE table_id = $1 RETURNING *';
      const result = await this.pool.query(query, [tableId]);
      return result.rows[0];
    }
  }
  
  module.exports = TableQueries;
  