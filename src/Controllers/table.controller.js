// table.controller.js
const pool = require('../../db'); 
const TableQueries = require('../Queries/table.queries');

class TableController {
  constructor() {
    this.tableQueries = new TableQueries(pool);
  }
    async getAllTables() {
      return this.tableQueries.getAllTables();
    }
  
    async getFreeTables() {
      return this.tableQueries.getFreeTables();
    }
  
    async getFreeTablesInRestaurant(restaurantId) {
      return this.tableQueries.getFreeTablesInRestaurant(restaurantId);
    }
  
    async getFreeTablesByLocation(location) {
      return this.tableQueries.getFreeTablesByLocation(location);
    }
  
    async addTable(restaurantId, tableNumber, menuId) {
      return this.tableQueries.addTable(restaurantId, tableNumber, menuId);
    }
  
    async updateTable(tableId, { restaurantId, tableNumber, menuId }) {
      return this.tableQueries.updateTable(tableId, { restaurantId, tableNumber, menuId });
    }
  
    async deleteTable(tableId) {
      return this.tableQueries.deleteTable(tableId);
    }
  }
  
  module.exports = TableController;
  