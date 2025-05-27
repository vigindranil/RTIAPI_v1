const logger = require('../utils/logger');
const { logError } = require('../models/logModel');

// Global error handler middleware
const errorHandler = async (err, req, res, next) => {
  // Set default status code and message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Log the error details
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    user: req.user ? req.user.id : 'unauthenticated',
    ip: req.ip
  });

  // Save error to database
  try {
    await logError({
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      status_code: err.statusCode,
      request_body: JSON.stringify(req.body),
      request_params: JSON.stringify(req.params),
      request_query: JSON.stringify(req.query),
      user_id: req.user ? req.user.id : null,
      ip_address: req.ip
    });
  } catch (logErr) {
    logger.error('Failed to save error to database:', logErr);
  }

  // Send error response
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // For production
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
};

module.exports = errorHandler;