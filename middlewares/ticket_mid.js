const User = require('../models/auth_m');
const Ticket = require('../models/ticket_m');
const constants = require('../util/constant');
const verifyTicketBody = (req, res, next)=>{
    // check title field
    if(!req.body.title){
        return res.status(400).send({message : "please enter title"});
    }
    // check description field
    if(!req.body.description){
        return res.status(400).send({message : "please enter description"});
    }
    next();
}

const verifyUpdateCheck = async(req, res, next)=>{

    const user = await User.findOne({userId : req.userId});
    const ticket = await Ticket.findOne({_id : req.params.id});
    
    if(!ticket){
        return res.status(401).send({
            message : "ticket not found !"
        })
    }
    if(user.userType == constants.userType.customer){
        if(user.userId != ticket.reporter){
            return res.status(403).send({
                message : " Not authorized, Only ADMIN | OWNER | ASSIGNED ENINEER allowed "
            });
        }
    }
    else if(user.userType == constants.userType.engineer){
        if(user.userId != ticket.assignee && user.userId != ticket.reporter){
            return res.status(403).send({
                message : "You are not allow for this ticket !"
            });
        }
    }
    /**
    * If the update requires the change in the assignee | change Engineer
    * 
    *    1. Only ADMIN should be allowed to do this change
    */
   if(req.body.assignee != undefined && ticket.assignee !== req.body.assignee){

        if( user.userType == constants.userType.admin){
            let newAssignee =  await User.findOne({userId : req.body.assignee});

            if(!newAssignee){
                return res.status(401).send({
                    message : "Engineer userId passed as assignee is wrong"
                });
            }
            if(newAssignee.userStatus == constants.userStatus.pending){
                return res.status(401).send({
                    message : "Engineer is not approved !"
                });
            }
        }else{
            return res.status(403).send({
                message : "Only ADMIN  | OWner of ticket is allowed to re-assign a ticket"
            });
        }  
   }

   next();
}
module.exports = {
    verifyTicketBody : verifyTicketBody,
    verifyUpdate : verifyUpdateCheck
}