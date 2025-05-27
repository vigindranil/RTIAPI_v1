const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || '15.207.85.206',
    user: process.env.DB_USER || 'dbnexintel',
    password: process.env.DB_PASSWORD || 'dbnexintel@123',
    database: process.env.DB_NAME || 'RTI_v1',
    port: process.env.DB_PORT || 3306
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    maxSize: process.env.MAX_LOG_FILE_SIZE || '20m',
    maxFiles: process.env.MAX_LOG_FILES || 14
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiam9obmRvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjgwMzYwMCwiZXhwIjoxNzE2ODA3MjAwfQ.kqXEVqR'
  }
};

module.exports = config;