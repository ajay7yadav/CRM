const Auth = require('../models/auth_m');
const util = require('../util/constant');
const validRegistration = async(req,res,next)=>{
    // check name fild
    if(! req.body.name){
        res.status(400).send({
            message : "Enter Name !"
        });
        return;
    }
    // check userId fild
    if(!req.body.userId){
        res.status(400).send({
            message : "Enter userId !"
        });
        return;
    }
    // check duplicate userId
    if(req.body.userId){
        const userID = await Auth.findOne({userId : req.body.userId});
        if(userID){
            res.status(400).send({
                message : userID.userId +" userId already exist, please enter unique userID"
            });
            return;
        }
    }
    // check email fild
    if(!req.body.email){
        res.status(400).send({
            message : "Enter email ! "
        });
        return;
    }
    // check duplicate email
    if(req.body.email){
        const emails = await Auth.findOne({email : req.body.email});
        if(emails){
            res.status(401).send({
                message : emails.email +" email already exist !"
            });
            return;
        }
    }
    // check password fild
    if(!req.body.password){
        res.status(400).send({
            message : "Enter password"
        });
        return;
    }
    // check userType fild
    let userType = req.body.userType;
    let userTypes = [util.userType.admin,util.userType.customer,util.userType.engineer];
    if(userType && !userTypes.includes(userType)){
        res.status(400).send({
            message : " invalid userType "
        });
        return;
    }
    next();
}

module.exports = {
    valid : validRegistration
}