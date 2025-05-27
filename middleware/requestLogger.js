const logger = require('../utils/logger');
const { logRequest } = require('../models/logModel');

// Request logger middleware
const requestLogger = async (req, res, next) => {
  const startTime = new Date();
  
  // Log basic request info
  logger.info({
    message: `Incoming request: ${req.method} ${req.originalUrl}`,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Save original end function
  const originalEnd = res.end;
  
  // Override end function
  res.end = async function(chunk, encoding) {
    // Restore original end function
    res.end = originalEnd;
    
    // Calculate response time
    const responseTime = new Date() - startTime;
    
    // Call original end function
    res.end(chunk, encoding);
    
    // Log response details
    logger.info({
      message: `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: `${responseTime}ms`
    });

    // Save request log to database
    try {
      await logRequest({
        method: req.method,
        url: req.originalUrl,
        status_code: res.statusCode,
        response_time: responseTime,
        request_body: JSON.stringify(req.body),
        request_params: JSON.stringify(req.params),
        request_query: JSON.stringify(req.query),
        user_id: req.user ? req.user.id : null,
        ip_address: req.ip
      });
    } catch (logErr) {
      logger.error('Failed to save request log to database:', logErr);
    }
  };
  
  next();
};

module.exports = requestLogger;