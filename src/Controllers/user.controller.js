// user.controller.js
const pool = require('../../db'); 
const UserQueries = require('../Queries/user.queries');

// class UserController {
//   constructor() {
//     this.userQueries = new UserQueries(pool);
//   }
  
    // const getAllUsers=()=> {
    //   return UserQueries.getAllUsers();
    // }
    
    const getAllUsers=async()=>{
      const users=await UserQueries.getAllUsers();
      return users
    }
    const login=async(username, password)=> {
        // Retrieve user by username
        const user = await UserQueries.getUserByUsername(username);
    
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
  
      const getUserById=async(userId)=> {
      return UserQueries.getUserById(userId);
    }
  
    const addUser=async(username, password, role, restaurantId)=> {
      return UserQueries.addUser(username, password, role, restaurantId);
    }
  
    const updateUser=async(userId, { username, password, role, restaurantId })=> {
      return UserQueries.updateUser(userId, { username, password, role, restaurantId });
    }
  
    const deleteUser=async(userId)=> {
      return UserQueries.deleteUser(userId);
    }
  
    // You may include additional methods for authentication, authorization, etc.
  // }
  
  module.exports = {
    login,
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
  };
  