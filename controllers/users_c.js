// This file will have all the logic to manipulate users resource
/** 
 * Fetch the list of all users
 *  - Only Admin is allowed to call this method 
 *  - Admin should able to filter based on:
 *     1. Name
 *     2. UserType
 *     3. UserStatus
*/ 
const User = require('../models/auth_m');
const object = require('../util/objectConvert');
// Only Admin should know how many users are in the application

// Here i am fetching ALL or using by query?userStatus=PENDING
exports.findAllUsers = async(req, res)=>{
    let query = {};
    // Reading the optional query params
    
    let userStatus = req.query.userStatus;
    let userType = req.query.userStatus;
    
    if(userStatus){
        query.userStatus = userStatus;
    }
    
    if(userType){
        query.userType = userType;
    }
    try{

        const users = await User.find(query);
        if(!users){
            return res.status(404).send({
                message : "userId does not exist !"
            });
        }
        res.status(200).send(object.userResponse(users));

    }catch(err){

        console.log(err.message);
        res.status(500).send({
            message : "queries internal not work "
        });
    }
}

// Find User by /:id 
exports.findById = async(req, res)=>{
    try{
        const users = await User.findOne({userId : req.params.id});
        if(!users){
            return res.status(404).send({
                message : "userId does not exist !"
            })
        }
        res.status(200).send({
            name : users.name,
            userId : users.userId,
            email : users.email,
            userType : users.userType,
            userStatus : users.userStatus
        });

    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message : "internal server error ! "
        })
    }
}

// Update by /:id
exports.update = async(req, res)=>{
    try {
        const user = await User.findOne({userId : req.params.id});
                    //  if user we get req                     take req            else no changes          
        user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
        user.name = req.body.name != undefined ? req.body.name : user.name
        user.userType = req.body.userType != undefined ? req.body.userType : user.userType

        const updatedUser = await user.save();

        res.status(200).send({
            name : updatedUser.name,
            userId : updatedUser.userId,
            email : updatedUser.email,
            userType : updatedUser.userType,
            userStatus : updatedUser.userStatus
        })
    } catch(err){
        console.log("Error while DB operation",err.message);
        res.status(500).send({
            message : "Internal server error !"
        })
    }

}