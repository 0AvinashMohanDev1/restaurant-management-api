// payment.routes.js
const express = require('express');
const PaymentController = require('../Controllers/payment.controller');

const paymentController = new PaymentController();
const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await paymentController.getAllPayments();
    res.json(payments);
  } catch (error) {
    console.error('Error retrieving payments', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get payments for a specific restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const paymentsInRestaurant = await paymentController.getPaymentsInRestaurant(restaurantId);

    if (paymentsInRestaurant) {
      res.json(paymentsInRestaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error retrieving payments in restaurant', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get payments for a specific table
router.get('/table/:tableId', async (req, res) => {
  try {
    const tableId = parseInt(req.params.tableId);
    const paymentsForTable = await paymentController.getPaymentsForTable(tableId);

    if (paymentsForTable) {
      res.json(paymentsForTable);
    } else {
      res.status(404).json({ error: 'Table not found' });
    }
  } catch (error) {
    console.error('Error retrieving payments for table', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new payment
router.post('/', async (req, res) => {
  try {
    const { restaurantId, customerId, tableId, totalBill } = req.body;
    const newPayment = await paymentController.addPayment(restaurantId, customerId, tableId, totalBill);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error adding payment', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a payment
router.put('/:paymentId', async (req, res) => {
  try {
    const paymentId = parseInt(req.params.paymentId);
    const { restaurantId, customerId, tableId, totalBill } = req.body;

    const updatedPayment = await paymentController.updatePayment(paymentId, { restaurantId, customerId, tableId, totalBill });
    if (updatedPayment) {
      res.json(updatedPayment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.error('Error updating payment', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a payment
router.delete('/:paymentId', async (req, res) => {
  try {
    const paymentId = parseInt(req.params.paymentId);
    const deletedPayment = await paymentController.deletePayment(paymentId);

    if (deletedPayment) {
      res.json({ message: 'Payment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.error('Error deleting payment', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
