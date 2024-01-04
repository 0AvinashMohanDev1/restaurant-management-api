// payment.controller.js

const pool = require('../../db'); 
const PaymentQueries = require('../Queries/payment.queries');


class PaymentController {
    constructor(paymentQueries) {
      this.paymentQueries = new PaymentQueries(pool);;
    }
  
    async getAllPayments() {
      return this.paymentQueries.getAllPayments();
    }
  
    async getPaymentsInRestaurant(restaurantId) {
      return this.paymentQueries.getPaymentsInRestaurant(restaurantId);
    }
  
    async getPaymentsForTable(tableId) {
      return this.paymentQueries.getPaymentsForTable(tableId);
    }
  
    async addPayment(restaurantId, customerId, tableId, totalBill) {
      return this.paymentQueries.addPayment(restaurantId, customerId, tableId, totalBill);
    }
  
    async updatePayment(paymentId, { restaurantId, customerId, tableId, totalBill }) {
      return this.paymentQueries.updatePayment(paymentId, { restaurantId, customerId, tableId, totalBill });
    }
  
    async deletePayment(paymentId) {
      return this.paymentQueries.deletePayment(paymentId);
    }
  }
  
  module.exports = PaymentController;
  