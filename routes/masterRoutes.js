const express = require('express');
const masterController = require('../controllers/masterController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Apply verifyToken middleware to all routes in this router
router.use(verifyToken);

// State routes
router.post('/state', masterController.insertState);
router.get('/state', masterController.getStates);

// District routes
router.post('/district', masterController.insertDistrict);
router.get('/district/state/:state_id', masterController.getDistrictsByState);

// Department routes
router.post('/department', masterController.insertDepartment);
router.get('/department/state/:state_id', masterController.getDepartmentsByState);

// Appellate Authority routes
router.post('/appellate-authority', masterController.insertAppellateAuthority);
router.get('/appellate-authority/department/:department_id', masterController.getAppellateAuthoritiesByDepartment);

// SPIO routes
router.post('/spio', masterController.insertSpio);
router.get('/spio/department/:department_id', masterController.getSpiosByDepartment);

// RTI Reason Category routes
router.post('/rti-reason-category', masterController.insertRtiReasonCategory);
router.get('/rti-reason-category/department/:department_id', masterController.getRtiReasonCategoriesByDepartment);

// Application Type routes
router.post('/application-type', masterController.insertApplicationType);

// Application Through routes
router.post('/application-through', masterController.insertApplicationThrough);

// Fees Category routes
router.post('/fees-category', masterController.insertFeesCategory);

// Police Station routes
router.post('/police-station', masterController.insertPoliceStation);
router.get('/police-station/district/:district_id', masterController.getPoliceStationsByDistrict);

// Post Office routes
router.post('/post-office', masterController.insertPostOffice);
router.get('/post-office/district/:district_id', masterController.getPostOfficesByDistrict);

// Municipality routes
router.post('/municipality', masterController.insertMunicipality);
router.get('/municipality/district/:district_id', masterController.getMunicipalitiesByDistrict);

module.exports = router;