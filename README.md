RTI Management System (v2)


Stakeholders of the application 
Chiefs Information Commission
State Information Commission/AKA 2nd Appellate Authority
Department
1st Appellate Authority
State Public Information Officer (SPIO)
Objective of the Application 
Citizens will file Online/Offline RTI applications in a different portal with the relevant documents for a specific department 
SPIO will download the online application and scan the offline application 
In our RTI Management System application, SPIO will create a New RTI application and enter information that they get from online/offline RTI applications, and upload relevant information 
This answer to the Citizens may be simple and without a committee meeting, then he just fills up the final answer form and submits 
This answer to the Citizens may be critical and needs a committee meeting, then they schedule a committee meeting and generate a meeting invitation letter 
The application needs to capture the committee member's attendance if a representative, then the name of the representative, the committee meeting  discussion, the application, and query-wise, and upload the attendance sheet 
After the committee meeting discussion needs to fill up the Final Answer application-wise, query-wise. 
If Citizens are unsatisfied with the answer can appeal, called the “1st appeal”, SPIO will fill in this information in the application 
This Information will flow to the 1st Appellate Authority of the department user login
Then the 1st Appellate Authority will update the answer to the appeal 
If Citizens are unsatisfied with the answer of the “1st appeal” can appeal again, called the “2nd appeal”, SPIO will fill in this information in the application 
State Information Commission/AKA 2nd Appellate Authority can view this appeal department-wise and will update the answer 
Viewing level 
SPIO  can insert/edit/view all applications related to that particular SPIO of the Department
1st Appellate Authority can insert/edit/view all the applications after the 1st appeal of that department or some group of SPIO (one “1st Appellate Authority” tagged with multiple SPIO)
The department can view all the applications of that department of the State 
State Information Commission/AKA 2nd Appellate Authority can view/update all “2nd appeal” of all departments, and view all the reports of all departments 
The Chiefs Information Commission can view all state,  departments, application details 
Super Admin Login Master Records creation 
State Master 
District Master 
Police Station 
Post Office 
Municipality 
Department Master (State Wise)
1st Appellate Authority Master (Department Wise)
SPIO Master (Department Wise)
RTI Reason (Department Wise)
Committee Member (SPIO-wise)
Application Type 
Direct 
Indirect 
Vakalatnama
Fees Category
IPO
DD
Application through 
Online 
Offline 
ENDORSEMENT MEMBER (Department-wise/SPIO-wise)
User Creation 
Chief's Information Commission -  Role → Admin - Level –> Country 
State Information Commission/AKA 2nd Appellate Authority -  Role → Admin - Level –> State
 Department -  Role → Admin - Level –> Department
1st Appellate Role → Authority - Level –> Department
State Public Information Officer (SPIO)  Role –> EntryUser Level –> Department


















Example of Application Details 
1. application_info
Primary Key: id


Fields:


application_no, application_date, application_receive_date, application_file
wakalat_nama_receive, application_type_id, application_through_id
meeting_status, disposed, rejected, answer_draft
user_id, is_delete, createdAt, UpdatedAt
disposed_date, acknowledge_memo, acknowledge_date


Relationships:


user_id → user(id)
application_type_id → application_type(id)
application_through_id → application_through(id)
Referenced by: applicant_address, applicant_query, application_fees, application_letter



2. applicant_address
Primary Key: id
Fields:


applicant_name, client_name, email, phone_no, gender, nationality
identity_proof_receive, identity_no, identity_file
area, address, client_address
village, town, block, municipality_id, ward_no, panchayat
state_id, district_id, police_station_id, post_office_id, pincode
application_id (Unique)


Relationships:


application_id → application_info(id) (CASCADE)
state_id → state(id)
district_id → district(id)
municipality_id → municipality(id)
police_station_id → police_station(id)
post_office_id → post_office(id)



3. applicant_query
Primary Key: id
Fields:
query, pollution_id, application_id, answer_receive
Relationships:
application_id → application_info(id) (CASCADE)
pollution_id → pollution_category(id) (CASCADE)

4. application_fees
Primary Key: id
Fields:
bpl, bpl_file, fees_receive, fees_type_id, total_fees
return, fees_not_receive_reason, application_id (Unique)
additional_fees


Relationships:


application_id → application_info(id) (CASCADE)
fees_type_id → fees_category(id)


Referenced by: application_fees_details



5. application_fees_details
Primary Key: id
Fields:
fees_count, fees_number, fees_date, fees_value, application_fees_id
Relationships:


application_fees_id → application_fees(id) (CASCADE)



6. application_letter
Primary Key: id


Fields:


application_id (Unique), improper_letter, reject_letter, acknowledgement_letter
createdAt, UpdatedAt
Relationships:
application_id → application_info(id) (CASCADE)

7. application_through
Primary Key: id
Fields:
application_through_name
Relationships:
Referenced by: application_info(application_through_id)






