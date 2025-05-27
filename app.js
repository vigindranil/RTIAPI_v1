const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const masterRoutes = require('./routes/masterRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const logRoutes = require('./routes/logRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request body

// Request logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Custom request logger
app.use(requestLogger);

// API routes
app.use('/api/auth', authRoutes); // Auth routes are public
app.use('/api/master', masterRoutes); // Protected routes
app.use('/api/application', applicationRoutes); // Protected routes
app.use('/api/applicant', applicantRoutes); // Protected routes
app.use('/api/logs', logRoutes); // Protected routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

module.exports = app;