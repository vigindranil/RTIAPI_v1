const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../utils/logger');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Called auth middleware");
    if (!authHeader) {
      logger.warn('No authorization header provided');
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    // Check if authorization header has correct format
    if (!authHeader.startsWith('Bearer ')) {
      logger.warn('Invalid token format in authorization header');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token format'
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
      next();
    } catch (error) {
      logger.error('Token verification failed:', {
        error: error.message,
        token: token
      });
      
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    logger.error('Auth middleware error:', {
      error: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

module.exports = verifyToken;