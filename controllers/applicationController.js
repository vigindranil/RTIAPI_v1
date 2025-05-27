const applicationModel = require('../models/applicationModel');
const logger = require('../utils/logger');

// Insert application info
const insertApplicationInfo = async (req, res, next) => {
  try {
    const applicationData = {
      application_no: req.body.application_no,
      application_date: req.body.application_date,
      application_receive_date: req.body.application_receive_date,
      application_file: req.body.application_file,
      wakalat_nama_receive: req.body.wakalat_nama_receive,
      application_type_id: req.body.application_type_id,
      application_through_id: req.body.application_through_id,
      meeting_status: req.body.meeting_status,
      disposed: req.body.disposed,
      rejected: req.body.rejected,
      answer_draft: req.body.answer_draft,
      user_id: req.body.user_id,
      disposed_date: req.body.disposed_date,
      acknowledge_memo: req.body.acknowledge_memo,
      acknowledge_date: req.body.acknowledge_date
    };

    // Validate required fields
    const requiredFields = ['application_no', 'application_date', 'application_type_id', 'application_through_id', 'user_id'];
    const missingFields = requiredFields.filter(field => !applicationData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const result = await applicationModel.insertApplicationInfo(applicationData);
    
    if (!result.success) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to insert application information',
        errorCode: result.errorCode
      });
    }
    
    res.status(201).json({
      status: 'success',
      message: 'Application information inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Insert application fees
const insertApplicationFees = async (req, res, next) => {
  try {
    const feesData = {
      bpl: req.body.bpl,
      bpl_file: req.body.bpl_file,
      fees_receive: req.body.fees_receive,
      fees_type_id: req.body.fees_type_id,
      total_fees: req.body.total_fees,
      return_fees: req.body.return, // renamed to avoid JS keyword
      fees_not_receive_reason: req.body.fees_not_receive_reason,
      application_id: req.body.application_id,
      additional_fees: req.body.additional_fees
    };

    // Validate required fields
    const requiredFields = ['fees_receive', 'fees_type_id', 'application_id'];
    const missingFields = requiredFields.filter(field => feesData[field] === undefined);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const result = await applicationModel.insertApplicationFees(feesData);
    
    if (!result.success) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to insert application fees',
        errorCode: result.errorCode
      });
    }
    
    res.status(201).json({
      status: 'success',
      message: 'Application fees inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Insert application fees details
const insertApplicationFeesDetails = async (req, res, next) => {
  try {
    const feesDetailsData = {
      fees_count: req.body.fees_count,
      fees_number: req.body.fees_number,
      fees_date: req.body.fees_date,
      fees_value: req.body.fees_value,
      application_fees_id: req.body.application_fees_id
    };

    // Validate required fields
    const requiredFields = ['fees_number', 'fees_date', 'fees_value', 'application_fees_id'];
    const missingFields = requiredFields.filter(field => !feesDetailsData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const result = await applicationModel.insertApplicationFeesDetails(feesDetailsData);
    
    res.status(201).json({
      status: 'success',
      message: 'Application fees details inserted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertApplicationInfo,
  insertApplicationFees,
  insertApplicationFeesDetails
};