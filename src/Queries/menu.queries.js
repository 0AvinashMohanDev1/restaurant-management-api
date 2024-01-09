// menu.queries.js
class MenuQueries {
    constructor(pool) {
      this.pool = pool;
    }
  
    async getAllItems() {
      const query = 'SELECT * FROM "Menu"';
      const { rows } = await this.pool.query(query);
      return rows;
    }
  
    async addItem(itemName, price) {
      const query = 'INSERT INTO "Menu" (item_name, price) VALUES ($1, $2) RETURNING *';
      const values = [itemName, price];
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    }
  
    async updateItem(itemId, { itemName, price }) {
      const query = 'UPDATE "Menu" SET item_name = $1, price = $2 WHERE menu_id = $3 RETURNING *';
      const values = [itemName, price, itemId];
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    }
  
    async deleteItem(itemId) {
      const query = 'DELETE FROM "Menu" WHERE menu_id = $1 RETURNING *';
      const values = [itemId];
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    }
  }
  
  module.exports = MenuQueries;
  