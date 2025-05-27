const db = require('../config/db');
const logger = require('../utils/logger');

// State operations
const insertState = async (name) => {
  try {
    return await db.callProcedure('insert_state', [name]);
  } catch (error) {
    logger.error('Error in insertState:', error);
    throw error;
  }
};

// District operations
const insertDistrict = async (name, stateId) => {
  try {
    return await db.callProcedure('insert_district', [name, stateId]);
  } catch (error) {
    logger.error('Error in insertDistrict:', error);
    throw error;
  }
};

const getDistrictsByState = async (stateId) => {
  try {
    return await db.callProcedure('get_districts_by_state', [stateId]);
  } catch (error) {
    logger.error('Error in getDistrictsByState:', error);
    throw error;
  }
};

// Department operations
const insertDepartment = async (name, stateId) => {
  try {
    return await db.callProcedure('insert_department', [name, stateId]);
  } catch (error) {
    logger.error('Error in insertDepartment:', error);
    throw error;
  }
};

const getDepartmentsByState = async (stateId) => {
  try {
    return await db.callProcedure('get_departments_by_state', [stateId]);
  } catch (error) {
    logger.error('Error in getDepartmentsByState:', error);
    throw error;
  }
};

// Appellate Authority operations
const insertAppellateAuthority = async (name, departmentId) => {
  try {
    return await db.callProcedure('insert_appellate_authority', [name, departmentId]);
  } catch (error) {
    logger.error('Error in insertAppellateAuthority:', error);
    throw error;
  }
};

const getAppellateAuthoritiesByDepartment = async (departmentId) => {
  try {
    return await db.callProcedure('get_appellate_authorities_by_department', [departmentId]);
  } catch (error) {
    logger.error('Error in getAppellateAuthoritiesByDepartment:', error);
    throw error;
  }
};

// SPIO operations
const insertSpio = async (name, departmentId) => {
  try {
    return await db.callProcedure('insert_spio', [name, departmentId]);
  } catch (error) {
    logger.error('Error in insertSpio:', error);
    throw error;
  }
};

const getSpiosByDepartment = async (departmentId) => {
  try {
    return await db.callProcedure('get_spios_by_department', [departmentId]);
  } catch (error) {
    logger.error('Error in getSpiosByDepartment:', error);
    throw error;
  }
};

// RTI Reason Category operations
const insertRtiReasonCategory = async (name, departmentId) => {
  try {
    return await db.callProcedure('insert_rti_reason_category', [name, departmentId]);
  } catch (error) {
    logger.error('Error in insertRtiReasonCategory:', error);
    throw error;
  }
};

const getRtiReasonCategoriesByDepartment = async (departmentId) => {
  try {
    return await db.callProcedure('get_rti_reason_categories_by_department', [departmentId]);
  } catch (error) {
    logger.error('Error in getRtiReasonCategoriesByDepartment:', error);
    throw error;
  }
};

// Application Type operations
const insertApplicationType = async (typeName) => {
  try {
    return await db.callProcedure('insert_application_type', [typeName]);
  } catch (error) {
    logger.error('Error in insertApplicationType:', error);
    throw error;
  }
};

// Application Through operations
const insertApplicationThrough = async (throughName) => {
  try {
    return await db.callProcedure('insert_application_through', [throughName]);
  } catch (error) {
    logger.error('Error in insertApplicationThrough:', error);
    throw error;
  }
};

// Fees Category operations
const insertFeesCategory = async (categoryName) => {
  try {
    return await db.callProcedure('insert_fees_category', [categoryName]);
  } catch (error) {
    logger.error('Error in insertFeesCategory:', error);
    throw error;
  }
};

// Police Station operations
const insertPoliceStation = async (name, districtId) => {
  try {
    return await db.callProcedure('insert_police_station', [name, districtId]);
  } catch (error) {
    logger.error('Error in insertPoliceStation:', error);
    throw error;
  }
};

const getPoliceStationsByDistrict = async (districtId) => {
  try {
    return await db.callProcedure('get_police_stations_by_district', [districtId]);
  } catch (error) {
    logger.error('Error in getPoliceStationsByDistrict:', error);
    throw error;
  }
};

// Post Office operations
const insertPostOffice = async (name, districtId) => {
  try {
    return await db.callProcedure('insert_post_office', [name, districtId]);
  } catch (error) {
    logger.error('Error in insertPostOffice:', error);
    throw error;
  }
};

const getPostOfficesByDistrict = async (districtId) => {
  try {
    return await db.callProcedure('get_post_offices_by_district', [districtId]);
  } catch (error) {
    logger.error('Error in getPostOfficesByDistrict:', error);
    throw error;
  }
};

// Municipality operations
const insertMunicipality = async (name, districtId) => {
  try {
    return await db.callProcedure('insert_municipality', [name, districtId]);
  } catch (error) {
    logger.error('Error in insertMunicipality:', error);
    throw error;
  }
};

const getMunicipalitiesByDistrict = async (districtId) => {
  try {
    return await db.callProcedure('get_municipalities_by_district', [districtId]);
  } catch (error) {
    logger.error('Error in getMunicipalitiesByDistrict:', error);
    throw error;
  }
};

module.exports = {
  // State
  insertState,
  
  // District
  insertDistrict,
  getDistrictsByState,
  
  // Department
  insertDepartment,
  getDepartmentsByState,
  
  // Appellate Authority
  insertAppellateAuthority,
  getAppellateAuthoritiesByDepartment,
  
  // SPIO
  insertSpio,
  getSpiosByDepartment,
  
  // RTI Reason Category
  insertRtiReasonCategory,
  getRtiReasonCategoriesByDepartment,
  
  // Application Type
  insertApplicationType,
  
  // Application Through
  insertApplicationThrough,
  
  // Fees Category
  insertFeesCategory,
  
  // Police Station
  insertPoliceStation,
  getPoliceStationsByDistrict,
  
  // Post Office
  insertPostOffice,
  getPostOfficesByDistrict,
  
  // Municipality
  insertMunicipality,
  getMunicipalitiesByDistrict
};