const express = require('express');
const applicantController = require('../controllers/applicantController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Applicant routes
router.post('/address', applicantController.insertApplicantAddress);
router.post('/query', applicantController.insertApplicantQuery);

module.exports = router;