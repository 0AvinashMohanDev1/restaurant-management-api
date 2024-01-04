// user.controller.js
const pool = require('../../db'); 
const UserQueries = require('../Queries/user.queries');

class UserController {
  constructor() {
    this.userQueries = new UserQueries(pool);
  }
  
    async getAllUsers() {
      return this.userQueries.getAllUsers();
    }
    
    async login(username, password) {
        // Retrieve user by username
        const user = await this.userQueries.getUserByUsername(username);
    
        if (!user) {
          throw new Error('User not found');
        }
    
        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
    
        return user;
      }
  
    async getUserById(userId) {
      return this.userQueries.getUserById(userId);
    }
  
    async addUser(username, password, role, restaurantId) {
      return this.userQueries.addUser(username, password, role, restaurantId);
    }
  
    async updateUser(userId, { username, password, role, restaurantId }) {
      return this.userQueries.updateUser(userId, { username, password, role, restaurantId });
    }
  
    async deleteUser(userId) {
      return this.userQueries.deleteUser(userId);
    }
  
    // You may include additional methods for authentication, authorization, etc.
  }
  
  module.exports = UserController;
  