const app = require('./app');
const config = require('./config/config');
const logger = require('./utils/logger');
const db = require('./config/db');

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    const connected = await db.testConnection();
    if (!connected) {
      throw new Error('Database connection failed');
    }

    // Start the server
    const server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} in ${config.env} mode`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error('UNHANDLED REJECTION! Shutting down...', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      logger.error('UNCAUGHT EXCEPTION! Shutting down...', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', {
      message: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}

startServer();