const express = require('express');
const applicationController = require('../controllers/applicationController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Application routes
router.post('/info', applicationController.insertApplicationInfo);
router.post('/fees', applicationController.insertApplicationFees);
router.post('/fees-details', applicationController.insertApplicationFeesDetails);

module.exports = router;