// payment.queries.js
class PaymentQueries {
    constructor(pool) {
      this.pool = pool;
    }
  
    async getAllPayments() {
      const query = 'SELECT * FROM payments';
      const result = await this.pool.query(query);
      return result.rows;
    }
  
    async getPaymentsInRestaurant(restaurantId) {
      const query = 'SELECT * FROM payments WHERE restaurant_id = $1';
      const result = await this.pool.query(query, [restaurantId]);
      return result.rows;
    }
  
    async getPaymentsForTable(tableId) {
      const query = 'SELECT * FROM payments WHERE table_id = $1';
      const result = await this.pool.query(query, [tableId]);
      return result.rows;
    }
  
    async addPayment(restaurantId, customerId, tableId, totalBill) {
      const query = 'INSERT INTO payments (restaurant_id, customer_id, table_id, total_bill) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await this.pool.query(query, [restaurantId, customerId, tableId, totalBill]);
      return result.rows[0];
    }
  
    async updatePayment(paymentId, { restaurantId, customerId, tableId, totalBill }) {
      const query = 'UPDATE payments SET restaurant_id = $1, customer_id = $2, table_id = $3, total_bill = $4 WHERE payment_id = $5 RETURNING *';
      const result = await this.pool.query(query, [restaurantId, customerId, tableId, totalBill, paymentId]);
      return result.rows[0];
    }
  
    async deletePayment(paymentId) {
      const query = 'DELETE FROM payments WHERE payment_id = $1 RETURNING *';
      const result = await this.pool.query(query, [paymentId]);
      return result.rows[0];
    }
  }
  
  module.exports = PaymentQueries;
  