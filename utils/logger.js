const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, json } = format;
require('winston-daily-rotate-file');
const path = require('path');
const config = require('../config/config');

// Define log directory
const logDir = path.join(__dirname, '../logs');

// Define format for console output
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
});

// Create file transport for error logs
const errorFileTransport = new transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: config.logging.maxSize,
  maxFiles: config.logging.maxFiles,
  level: 'error'
});

// Create file transport for combined logs
const combinedFileTransport = new transports.DailyRotateFile({
  filename: path.join(logDir, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: config.logging.maxSize,
  maxFiles: config.logging.maxFiles
});

// Create the logger
const logger = createLogger({
  level: config.logging.level,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json()
  ),
  defaultMeta: { service: 'rti-api' },
  transports: [
    // Write all logs to console
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat
      )
    }),
    // Write to log files
    errorFileTransport,
    combinedFileTransport
  ],
  exitOnError: false
});

// Create a stream object for Morgan
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

module.exports = logger;