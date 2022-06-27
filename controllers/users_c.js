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
exports.findAllUsers = async(req, res)=>{
    try{
        // Find users from users collection
        const users = await User.find();
        // tranfer details and fetch all the users details
        res.status(200).send(object.userResponse(users));

    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message : "Internal error !"
        })
    }
}

// Here i am fetching using by query
exports.findByQuery = async(req, res)=>{
    let query = {};
    let name = req.query.name;
    let userStatus = req.query.userStatus;
    let userType = req.query.userStatus;
    
    if(name && userStatus && userType){
        console.log("1st If");
        query.name = name;
        query.userStatus = userStatus;
        query.userType = userType;
    }else if(name && userStatus){
        console.log("2st If");
        query.name = name;
        query.userStatus = userStatus;
    }
    else if(name && userType){
        console.log("3st If");
        query.name = name;
        query.userType = userType;
    }
    else if(userStatus && userType){
        console.log("4st If");
        query.userStatus = userStatus;
        query.userType = userType;
    }
    else if(name){
        console.log("5st If");
        query.name = name;
    }
    else if(userStatus){
        console.log("6st If");
        query.userStatus = userStatus;
    }
    else if(userType){
        console.log("7st If");
        query.userType = userType;
    }
    try{

        const users = await User.find(query);
        console.log(users);
        res.status(200).send(object.userResponse(users));

    }catch(err){

        console.log(err.message);
        res.status(500).send({
            message : "queries internal not work "
        })

    }
}

// Find User byId 
exports.findById = (req, res)=>{
    
}