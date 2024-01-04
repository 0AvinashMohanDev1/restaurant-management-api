// user.routes.js
const express = require('express');
const UserController = require('../Controllers/user.controller');

const userController = new UserController();
const router = express.Router();

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userController.login(username, password);
    if (token) {
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User logout (just an example, as token-based authentication doesn't always require explicit logout)
router.post('/logout', (req, res) => {
  // Perform logout actions if needed
  res.json({ message: 'Logout successful' });
});

// User update
router.put('/users/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { username, password, role, restaurantId } = req.body;

    const updatedUser = await userController.updateUser(userId, { username, password, role, restaurantId });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User delete
router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const deletedUser = await userController.deleteUser(userId);

    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
