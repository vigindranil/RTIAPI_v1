const mysql = require('mysql2/promise');
const config = require('./config');
const logger = require('../utils/logger');

// MySQL connection pool configuration
const poolConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create connection pool
const pool = mysql.createPool(poolConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info('Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    logger.error('Database connection failed:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
}

// Execute a query
async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    logger.error('Database query error:', {
      sql: sql,
      params: params,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
}

// Execute a stored procedure
async function callProcedure(procedure, params = []) {
  try {
    const placeholders = params.map(() => '?').join(',');
    const sql = `CALL ${procedure}(${placeholders})`;
    const [results] = await pool.execute(sql, params);
    return results[0];
  } catch (error) {
    logger.error('Database procedure call error:', {
      procedure: procedure,
      params: params,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
}

// Execute a stored procedure with output parameter
async function callProcedureWithOutput(procedure, params = []) {
  try {
    const placeholders = params.map(() => '?').join(',') + ', @errorCode';
    const sql = `CALL ${procedure}(${placeholders})`;
    
    // Execute the procedure
    await pool.execute(sql, params);
    
    // Get the output parameter value
    const [outputResult] = await pool.execute('SELECT @errorCode as errorCode');
    
    return {
      errorCode: outputResult[0].errorCode,
      success: outputResult[0].errorCode === 0
    };
  } catch (error) {
    logger.error('Database procedure call error:', {
      procedure: procedure,
      params: params,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
}

// Graceful shutdown function
async function closePool() {
  try {
    await pool.end();
    logger.info('Database connection pool closed');
  } catch (error) {
    logger.error('Error closing database connection pool:', {
      message: error.message,
      stack: error.stack
    });
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

module.exports = {
  pool,
  testConnection,
  query,
  callProcedure,
  callProcedureWithOutput,
  closePool
};