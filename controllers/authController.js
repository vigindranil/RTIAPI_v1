const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const config = require('../config/config');
const logger = require('../utils/logger');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username, email and password are required'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const result = await db.callProcedure('insert_user', [
      username,
      email,
      hashedPassword
    ]);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Get user from database
    const users = await db.query(
      'SELECT id, username, email, password FROM users WHERE email = ?',
      [email]
    );

    // Check if user exists
    if (!users || users.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const user = users[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    logger.error('Login error:', {
      message: error.message,
      stack: error.stack
    });
    next(error);
  }
};

module.exports = {
  register,
  login
};