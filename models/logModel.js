const db = require('../config/db');
const logger = require('../utils/logger');

// Create tables if they don't exist
async function createLogTables() {
  try {
    // Create error_log table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS error_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        procedure_name VARCHAR(255),
        error_message TEXT,
        error_code INT,
        stack TEXT,
        url VARCHAR(255),
        method VARCHAR(10),
        status_code INT,
        request_body TEXT,
        request_params TEXT,
        request_query TEXT,
        user_id INT,
        ip_address VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create request_log table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS request_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        method VARCHAR(10),
        url VARCHAR(255),
        status_code INT,
        response_time INT,
        request_body TEXT,
        request_params TEXT,
        request_query TEXT,
        user_id INT,
        ip_address VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    logger.info('Log tables checked/created successfully');
  } catch (error) {
    logger.error('Error creating log tables:', error);
  }
}

// Log error to database
async function logError(errorData) {
  try {
    const sql = `
      INSERT INTO error_log
        (procedure_name, error_message, error_code, stack, url, method, status_code, request_body, request_params, request_query, user_id, ip_address)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      errorData.procedure_name || null,
      errorData.message,
      errorData.error_code || null,
      errorData.stack || null,
      errorData.url || null,
      errorData.method || null,
      errorData.status_code || null,
      errorData.request_body || null,
      errorData.request_params || null,
      errorData.request_query || null,
      errorData.user_id || null,
      errorData.ip_address || null
    ];
    
    const result = await db.query(sql, params);
    return result.insertId;
  } catch (error) {
    logger.error('Error logging to database:', error);
    // Don't throw here to prevent recursive error
    return null;
  }
}

// Log request to database
async function logRequest(requestData) {
  try {
    const sql = `
      INSERT INTO request_log
        (method, url, status_code, response_time, request_body, request_params, request_query, user_id, ip_address)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      requestData.method,
      requestData.url,
      requestData.status_code,
      requestData.response_time,
      requestData.request_body || null,
      requestData.request_params || null,
      requestData.request_query || null,
      requestData.user_id || null,
      requestData.ip_address || null
    ];
    
    const result = await db.query(sql, params);
    return result.insertId;
  } catch (error) {
    logger.error('Error logging request to database:', error);
    // Don't throw here to prevent recursive error
    return null;
  }
}

// Get logs by date-time range
async function getErrorLogsByDateRange(startDate, endDate, limit = 100, offset = 0) {
  try {
    const sql = `
      SELECT * FROM error_log
      WHERE created_at BETWEEN ? AND ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const params = [startDate, endDate, limit, offset];
    return await db.query(sql, params);
  } catch (error) {
    logger.error('Error retrieving error logs:', error);
    throw error;
  }
}

// Get request logs by date-time range
async function getRequestLogsByDateRange(startDate, endDate, limit = 100, offset = 0) {
  try {
    const sql = `
      SELECT * FROM request_log
      WHERE created_at BETWEEN ? AND ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const params = [startDate, endDate, limit, offset];
    return await db.query(sql, params);
  } catch (error) {
    logger.error('Error retrieving request logs:', error);
    throw error;
  }
}

// Initialize tables
createLogTables();

module.exports = {
  logError,
  logRequest,
  getErrorLogsByDateRange,
  getRequestLogsByDateRange
};