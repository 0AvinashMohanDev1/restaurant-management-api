// menu.controller.js
const pool = require('../../db'); 
const MenuQueries = require('../Queries/menu.queries');

class MenuController {
  constructor() {
    this.menuQueries = new MenuQueries(pool); 
  }

  async getAllItems() {
    return this.menuQueries.getAllItems();
  }

  async addItem(itemName, price) {
    return this.menuQueries.addItem(itemName, price);
  }

  async updateItem(itemId, { itemName, price }) {
    return this.menuQueries.updateItem(itemId, { itemName, price });
  }

  async deleteItem(itemId) {
    return this.menuQueries.deleteItem(itemId);
  }
}

module.exports = MenuController;
