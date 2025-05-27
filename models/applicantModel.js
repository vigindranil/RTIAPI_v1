const db = require('../config/db');
const logger = require('../utils/logger');

// Insert applicant address
const insertApplicantAddress = async (addressData) => {
  try {
    const {
      applicant_name,
      client_name,
      email,
      phone_no,
      gender,
      nationality,
      identity_proof_receive,
      identity_no,
      identity_file,
      area,
      address,
      client_address,
      village,
      town,
      block,
      municipality_id,
      ward_no,
      panchayat,
      state_id,
      district_id,
      police_station_id,
      post_office_id,
      pincode,
      application_id
    } = addressData;
    
    return await db.callProcedureWithOutput('insert_applicant_address', [
      applicant_name,
      client_name,
      email,
      phone_no,
      gender,
      nationality,
      identity_proof_receive,
      identity_no,
      identity_file,
      area,
      address,
      client_address,
      village,
      town,
      block,
      municipality_id,
      ward_no,
      panchayat,
      state_id,
      district_id,
      police_station_id,
      post_office_id,
      pincode,
      application_id
    ]);
  } catch (error) {
    logger.error('Error in insertApplicantAddress:', error);
    throw error;
  }
};

// Insert applicant query
const insertApplicantQuery = async (queryData) => {
  try {
    const {
      query,
      rti_reason_id,
      application_id,
      answer_receive
    } = queryData;
    
    return await db.callProcedureWithOutput('insert_applicant_query', [
      query,
      rti_reason_id,
      application_id,
      answer_receive
    ]);
  } catch (error) {
    logger.error('Error in insertApplicantQuery:', error);
    throw error;
  }
};

module.exports = {
  insertApplicantAddress,
  insertApplicantQuery
};