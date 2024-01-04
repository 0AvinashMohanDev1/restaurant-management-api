// restaurant.controller.js
const pool = require('../../db'); 
const PaymentQueries = require('../Queries/restaurant.queries');
class RestaurantController {
    constructor(restaurantQueries) {
      this.restaurantQueries = new PaymentQueries(pool);
    }
  
    async getAllRestaurants() {
      return this.restaurantQueries.getAllRestaurants();
    }
  
    async getRestaurantById(restaurantId) {
      return this.restaurantQueries.getRestaurantById(restaurantId);
    }
  
    async addRestaurant(managerId, location, name, rating) {
      return this.restaurantQueries.addRestaurant(managerId, location, name, rating);
    }
  
    async updateRestaurant(restaurantId, { managerId, location, name, rating }) {
      return this.restaurantQueries.updateRestaurant(restaurantId, { managerId, location, name, rating });
    }
  
    async deleteRestaurant(restaurantId) {
      return this.restaurantQueries.deleteRestaurant(restaurantId);
    }
  }
  
  module.exports = RestaurantController;
  