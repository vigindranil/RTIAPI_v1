const logModel = require('../models/logModel');
const logger = require('../utils/logger');
const moment = require('moment');

// Get error logs by date range
const getErrorLogsByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate, limit, offset } = req.query;
    
    // Validate required parameters
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Start date and end date are required'
      });
    }
    
    // Validate date format
    if (!moment(startDate, 'YYYY-MM-DD', true).isValid() || 
        !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }
    
    // Format dates for query
    const formattedStartDate = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const formattedEndDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    
    // Parse pagination parameters
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    
    const logs = await logModel.getErrorLogsByDateRange(
      formattedStartDate,
      formattedEndDate,
      parsedLimit,
      parsedOffset
    );
    
    // Get total count (for pagination)
    const totalCount = logs.length;
    
    res.status(200).json({
      status: 'success',
      data: {
        logs,
        pagination: {
          total: totalCount,
          limit: parsedLimit,
          offset: parsedOffset,
          hasMore: totalCount === parsedLimit
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get request logs by date range
const getRequestLogsByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate, limit, offset } = req.query;
    
    // Validate required parameters
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Start date and end date are required'
      });
    }
    
    // Validate date format
    if (!moment(startDate, 'YYYY-MM-DD', true).isValid() || 
        !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }
    
    // Format dates for query
    const formattedStartDate = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const formattedEndDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    
    // Parse pagination parameters
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    
    const logs = await logModel.getRequestLogsByDateRange(
      formattedStartDate,
      formattedEndDate,
      parsedLimit,
      parsedOffset
    );
    
    // Get total count (for pagination)
    const totalCount = logs.length;
    
    res.status(200).json({
      status: 'success',
      data: {
        logs,
        pagination: {
          total: totalCount,
          limit: parsedLimit,
          offset: parsedOffset,
          hasMore: totalCount === parsedLimit
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getErrorLogsByDateRange,
  getRequestLogsByDateRange
};