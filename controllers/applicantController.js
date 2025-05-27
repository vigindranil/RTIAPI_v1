const applicantModel = require('../models/applicantModel');
const logger = require('../utils/logger');

// Insert applicant address
const insertApplicantAddress = async (req, res, next) => {
  try {
    const addressData = {
      applicant_name: req.body.applicant_name,
      client_name: req.body.client_name,
      email: req.body.email,
      phone_no: req.body.phone_no,
      gender: req.body.gender,
      nationality: req.body.nationality,
      identity_proof_receive: req.body.identity_proof_receive,
      identity_no: req.body.identity_no,
      identity_file: req.body.identity_file,
      area: req.body.area,
      address: req.body.address,
      client_address: req.body.client_address,
      village: req.body.village,
      town: req.body.town,
      block: req.body.block,
      municipality_id: req.body.municipality_id,
      ward_no: req.body.ward_no,
      panchayat: req.body.panchayat,
      state_id: req.body.state_id,
      district_id: req.body.district_id,
      police_station_id: req.body.police_station_id,
      post_office_id: req.body.post_office_id,
      pincode: req.body.pincode,
      application_id: req.body.application_id
    };

    // Validate required fields
    const requiredFields = ['applicant_name', 'address', 'state_id', 'district_id', 'application_id'];
    const missingFields = requiredFields.filter(field => !addressData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const result = await applicantModel.insertApplicantAddress(addressData);
    
    if (!result.success) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to insert applicant address',
        errorCode: result.errorCode
      });
    }
    
    res.status(201).json({
      status: 'success',
      message: 'Applicant address inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Insert applicant query
const insertApplicantQuery = async (req, res, next) => {
  try {
    const queryData = {
      query: req.body.query,
      rti_reason_id: req.body.rti_reason_id,
      application_id: req.body.application_id,
      answer_receive: req.body.answer_receive
    };

    // Validate required fields
    const requiredFields = ['query', 'rti_reason_id', 'application_id'];
    const missingFields = requiredFields.filter(field => !queryData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const result = await applicantModel.insertApplicantQuery(queryData);
    
    if (!result.success) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to insert applicant query',
        errorCode: result.errorCode
      });
    }
    
    res.status(201).json({
      status: 'success',
      message: 'Applicant query inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertApplicantAddress,
  insertApplicantQuery
};