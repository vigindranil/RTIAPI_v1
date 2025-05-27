const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

// Log routes
router.get('/errors', logController.getErrorLogsByDateRange);
router.get('/requests', logController.getRequestLogsByDateRange);

module.exports = router;