// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY="SECRET_KEY"

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
}

function authorizeManager(req, res, next) {
  const userRole = req.user.role;

  if (userRole !== 'manager') {
    return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
  }

  next();
}

module.exports = {
  authenticateToken,
  authorizeManager,
};
