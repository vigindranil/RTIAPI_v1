const masterModel = require('../models/masterModel');
const logger = require('../utils/logger');

// State Controllers
const insertState = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'State name is required'
      });
    }
    
    const result = await masterModel.insertState(name);
    
    res.status(201).json({
      status: 'success',
      message: 'State inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getStates = async (req, res, next) => {
  try {
    const states = await masterModel.getStates();
    res.status(200).json({
      status: 'success',
      data: states
    });
  } catch (error) {
    next(error);
  }
};


// District Controllers
const insertDistrict = async (req, res, next) => {
  try {
    const { name, state_id } = req.body;
    
    if (!name || !state_id) {
      return res.status(400).json({
        status: 'error',
        message: 'District name and state_id are required'
      });
    }
    
    const result = await masterModel.insertDistrict(name, state_id);
    
    res.status(201).json({
      status: 'success',
      message: 'District inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getDistrictsByState = async (req, res, next) => {
  try {
    const { state_id } = req.params;
    
    if (!state_id) {
      return res.status(400).json({
        status: 'error',
        message: 'State ID is required'
      });
    }
    
    const districts = await masterModel.getDistrictsByState(state_id);
    
    res.status(200).json({
      status: 'success',
      data: districts
    });
  } catch (error) {
    next(error);
  }
};

// Department Controllers
const insertDepartment = async (req, res, next) => {
  try {
    const { name, state_id } = req.body;
    
    if (!name || !state_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Department name and state_id are required'
      });
    }
    
    const result = await masterModel.insertDepartment(name, state_id);
    
    res.status(201).json({
      status: 'success',
      message: 'Department inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getDepartmentsByState = async (req, res, next) => {
  try {
    const { state_id } = req.params;
    
    if (!state_id) {
      return res.status(400).json({
        status: 'error',
        message: 'State ID is required'
      });
    }
    
    const departments = await masterModel.getDepartmentsByState(state_id);
    
    res.status(200).json({
      status: 'success',
      data: departments
    });
  } catch (error) {
    next(error);
  }
};

// Appellate Authority Controllers
const insertAppellateAuthority = async (req, res, next) => {
  try {
    const { name, department_id } = req.body;
    
    if (!name || !department_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Authority name and department_id are required'
      });
    }
    
    const result = await masterModel.insertAppellateAuthority(name, department_id);
    
    res.status(201).json({
      status: 'success',
      message: 'Appellate Authority inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getAppellateAuthoritiesByDepartment = async (req, res, next) => {
  try {
    const { department_id } = req.params;
    
    if (!department_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Department ID is required'
      });
    }
    
    const authorities = await masterModel.getAppellateAuthoritiesByDepartment(department_id);
    
    res.status(200).json({
      status: 'success',
      data: authorities
    });
  } catch (error) {
    next(error);
  }
};

// SPIO Controllers
const insertSpio = async (req, res, next) => {
  try {
    const { name, department_id } = req.body;
    
    if (!name || !department_id) {
      return res.status(400).json({
        status: 'error',
        message: 'SPIO name and department_id are required'
      });
    }
    
    const result = await masterModel.insertSpio(name, department_id);
    
    res.status(201).json({
      status: 'success',
      message: 'SPIO inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getSpiosByDepartment = async (req, res, next) => {
  try {
    const { department_id } = req.params;
    
    if (!department_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Department ID is required'
      });
    }
    
    const spios = await masterModel.getSpiosByDepartment(department_id);
    
    res.status(200).json({
      status: 'success',
      data: spios
    });
  } catch (error) {
    next(error);
  }
};

// Additional master controllers for the remaining entities
const insertRtiReasonCategory = async (req, res, next) => {
  try {
    const { name, department_id } = req.body;
    
    if (!name || !department_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Category name and department_id are required'
      });
    }
    
    const result = await masterModel.insertRtiReasonCategory(name, department_id);
    
    res.status(201).json({
      status: 'success',
      message: 'RTI Reason Category inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getRtiReasonCategoriesByDepartment = async (req, res, next) => {
  try {
    const { department_id } = req.params;
    
    if (!department_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Department ID is required'
      });
    }
    
    const categories = await masterModel.getRtiReasonCategoriesByDepartment(department_id);
    
    res.status(200).json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// Application Type Controller
const insertApplicationType = async (req, res, next) => {
  try {
    const { type_name } = req.body;
    
    if (!type_name) {
      return res.status(400).json({
        status: 'error',
        message: 'Application type name is required'
      });
    }
    
    const result = await masterModel.insertApplicationType(type_name);
    
    res.status(201).json({
      status: 'success',
      message: 'Application Type inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Application Through Controller
const insertApplicationThrough = async (req, res, next) => {
  try {
    const { through_name } = req.body;
    
    if (!through_name) {
      return res.status(400).json({
        status: 'error',
        message: 'Application through name is required'
      });
    }
    
    const result = await masterModel.insertApplicationThrough(through_name);
    
    res.status(201).json({
      status: 'success',
      message: 'Application Through inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Fees Category Controller
const insertFeesCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    
    if (!category_name) {
      return res.status(400).json({
        status: 'error',
        message: 'Fees category name is required'
      });
    }
    
    const result = await masterModel.insertFeesCategory(category_name);
    
    res.status(201).json({
      status: 'success',
      message: 'Fees Category inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Municipality Controllers
const insertMunicipality = async (req, res, next) => {
  try {
    const { name, district_id } = req.body;
    
    if (!name || !district_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Municipality name and district_id are required'
      });
    }
    
    const result = await masterModel.insertMunicipality(name, district_id);
    
    res.status(201).json({
      status: 'success',
      message: 'Municipality inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getMunicipalitiesByDistrict = async (req, res, next) => {
  try {
    const { district_id } = req.params;
    
    if (!district_id) {
      return res.status(400).json({
        status: 'error',
        message: 'District ID is required'
      });
    }
    
    const municipalities = await masterModel.getMunicipalitiesByDistrict(district_id);
    
    res.status(200).json({
      status: 'success',
      data: municipalities
    });
  } catch (error) {
    next(error);
  }
};

// Police Station Controllers
const insertPoliceStation = async (req, res, next) => {
  try {
    const { name, district_id } = req.body;
    
    if (!name || !district_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Police station name and district_id are required'
      });
    }
    
    const result = await masterModel.insertPoliceStation(name, district_id);
    
    res.status(201).json({
      status: 'success',
      message: 'Police Station inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getPoliceStationsByDistrict = async (req, res, next) => {
  try {
    const { district_id } = req.params;
    
    if (!district_id) {
      return res.status(400).json({
        status: 'error',
        message: 'District ID is required'
      });
    }
    
    const policeStations = await masterModel.getPoliceStationsByDistrict(district_id);
    
    res.status(200).json({
      status: 'success',
      data: policeStations
    });
  } catch (error) {
    next(error);
  }
};

// Post Office Controllers
const insertPostOffice = async (req, res, next) => {
  try {
    const { name, district_id } = req.body;
    
    if (!name || !district_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Post office name and district_id are required'
      });
    }
    
    const result = await masterModel.insertPostOffice(name, district_id);
    
    res.status(201).json({
      status: 'success',
      message: 'Post Office inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getPostOfficesByDistrict = async (req, res, next) => {
  try {
    const { district_id } = req.params;
    
    if (!district_id) {
      return res.status(400).json({
        status: 'error',
        message: 'District ID is required'
      });
    }
    
    const postOffices = await masterModel.getPostOfficesByDistrict(district_id);
    
    res.status(200).json({
      status: 'success',
      data: postOffices
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // State
  insertState,
  getStates,
  
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