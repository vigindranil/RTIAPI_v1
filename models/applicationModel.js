const db = require('../config/db');
const logger = require('../utils/logger');

// Insert application info
const insertApplicationInfo = async (applicationData) => {
  try {
    const {
      application_no, 
      application_date, 
      application_receive_date, 
      application_file, 
      wakalat_nama_receive, 
      application_type_id, 
      application_through_id, 
      meeting_status, 
      disposed, 
      rejected, 
      answer_draft, 
      user_id, 
      disposed_date, 
      acknowledge_memo, 
      acknowledge_date
    } = applicationData;
    
    return await db.callProcedureWithOutput('insert_application_info', [
      application_no, 
      application_date, 
      application_receive_date, 
      application_file, 
      wakalat_nama_receive, 
      application_type_id, 
      application_through_id, 
      meeting_status, 
      disposed, 
      rejected, 
      answer_draft, 
      user_id, 
      disposed_date, 
      acknowledge_memo, 
      acknowledge_date
    ]);
  } catch (error) {
    logger.error('Error in insertApplicationInfo:', error);
    throw error;
  }
};

// Insert application fees
const insertApplicationFees = async (feesData) => {
  try {
    const {
      bpl,
      bpl_file,
      fees_receive,
      fees_type_id,
      total_fees,
      return_fees,
      fees_not_receive_reason,
      application_id,
      additional_fees
    } = feesData;
    
    return await db.callProcedureWithOutput('insert_application_fees', [
      bpl,
      bpl_file,
      fees_receive,
      fees_type_id,
      total_fees,
      return_fees, // renamed from 'return' to avoid JS keyword
      fees_not_receive_reason,
      application_id,
      additional_fees
    ]);
  } catch (error) {
    logger.error('Error in insertApplicationFees:', error);
    throw error;
  }
};

// Insert application fees details
const insertApplicationFeesDetails = async (feesDetailsData) => {
  try {
    const {
      fees_count,
      fees_number,
      fees_date,
      fees_value,
      application_fees_id
    } = feesDetailsData;
    
    return await db.callProcedure('insert_application_fees_details', [
      fees_count,
      fees_number,
      fees_date,
      fees_value,
      application_fees_id
    ]);
  } catch (error) {
    logger.error('Error in insertApplicationFeesDetails:', error);
    throw error;
  }
};

module.exports = {
  insertApplicationInfo,
  insertApplicationFees,
  insertApplicationFeesDetails
};