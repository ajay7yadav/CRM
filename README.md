# Learning the development of RESTful APIs for backend
# This code base contains logic/structure for creating the Restful APIs for the CRM app

Features
User Registration and User Login
Admin registration will be from the backend directly. No API support for the ADMIN user creation
Engineer registration will be supported through API, but it needs to be approved by the ADMIN
Customer registration will be supported through API with no approval needed from the ADMIN
API to support the ADMIN login. Login API call should return the access token, which will be used to make all the other calls
API to support the CUSTOMER login. Login API call should return the access token, which will be used to make all the other calls
API to support the ENGINEER login. Login API call should return the access token, which will be used to make all the other calls. 
Login API will succeed only if the ENGINEER registration request has been approved by the ADMIN. 
Proper error message in the case ADMIN has yet not approved/rejected the registration request
