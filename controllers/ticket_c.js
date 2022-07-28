const Ticket = require('../models/ticket_m');
const User = require('../models/auth_m');
const constants = require('../util/constant');
/**
 * Method to create the logic of creating tickets
 * 
 * 1. Any authenticated user should be able to create the ticket
 *          -- Middleware should take care of this
 * 
 * 2. Ensure that request body has valid data
 *          -- Middleware
 * 
 * 3. After the ticket is created, ensure the customer and Engineer documents are
 * also updated
 *     
 */
exports.createTicket = async(req, res)=>{
    const ticketObj = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId // I  got it from access token
    }
    try{
        // Find All the Engineer available and attach to the ticket Object
        const engineer = await User.find({
            userType : constants.userType.engineer,
            userStatus : constants.userStatus.approved
        });
    
        // find which engineer has less ticket assigned
        let min = Infinity;
        let assigneTo;
        for(let i=0;i<engineer.length; i++){
            if(min > engineer[i].ticketsAssigned.length){
                min = engineer[i].ticketsAssigned.length
                assigneTo = engineer[i];
            }
        }
        if(assigneTo){
            ticketObj.assignee = assigneTo.userId
        }
        // No any engineer in database
        else{
            return res.status(404).send({
                message : "No any engineer at the time aviable, please try some time latter"
            });
        }
        // Create ticket
        const tickets = await Ticket.create(ticketObj);

        if(tickets){
            // get current login user
            const customer = await User.findOne({
                userId : req.userId
            });
            // storing ticket _id
            customer.ticketsCreated.push(tickets.id);
            await customer.save();

            // also update the Engineer document
            if(assigneTo){
                assigneTo.ticketsAssigned.push(tickets.id);
                await assigneTo.save();
            }
            res.status(201).send(tickets);
        }
    }catch(err){
        res.status(500).send({
            message : "Some internal issue !"
        });
    }
}

/**
 * Getting all the tickets
 */
exports.getAllTickets = async(req, res)=>{
    /**
     * We need to find the userType
     * and depending on the user type we need to frame the search query
     */
    const user = await User.findOne({userId : req.userId});
    const queryObj = {};

    if(user.userType == constants.userType.customer){
       /**
        *    Query for fetching all the tickets created by the user
        * 
        * */ 
        const tickets = user.ticketsCreated ; // this is an array of ticket _id 
        if(!tickets){
            return res.staus(200).send({
                message : "No tickets created by the user yet"
            });
        };
    //get all tickets from array    = {"_id" : {$in :["id1","id2","id3"]}}
        queryObj["_id"] = { $in : ticketsCreated};

        console.log(queryObj);


    }else if(user.userType == constants.userType.engineer){
        /**
         * Query object for fetching all the tickets assigned/created to a user
         */
        const tickets = user.ticketsAssigned ;
        if(!tickets){
            return res.staus(200).send({
                message : "You have No tickets any assigned "
            });
        }
        queryObj["_id"] = {$in : ticketsAssigned};
         
    }

    const tickets = await Ticket.find(queryObj);

}
