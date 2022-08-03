/**
 * This file should have the logic to connect to the Notification service
 */
const Client = require('node-rest-client').Client;
const client = Client();   // this client Object which will be used for colling the REST API

/**
 * Exposing a method which takes the request parameters for sending the
 * notification request to the notification service
 */
module.exports = (subject, content, recepients, requester)=>{
    // create request body
    const reqBody = {
        subject : subject,
        recepientEmails : recepients,
        content : content,
        requester : requester
    };
    // Prepare the header
    const reqHeader = {
        "content-Type" : "application/json"
    }
    // Combine header and req body together
    const args = {
        data : reqBody,
        header : reqHeader
    }
    /**
     * Make a POST call and handle the response
     * 
     * URI should go in the .env file
     */
    try {

        client.post("http://localhost:8000/notifiServ/api/v1/notifications",args,(data, res)=>{

            console.log("Request Sent");
            console.log(data);

        });
        
    } catch(err){

        console.log(err.message);

    }
}