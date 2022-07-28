const jwt = require('jsonwebtoken');
const Key = require('../configs/serverConfig');
const User = require('../models/auth_m');
const canstant = require('../util/constant');
// Middleware for verifing token
const verifyToken = (req,res,next)=>{
    // in postman headers where we put accesstokens
    let headers = req.headers['x-access-token'];
    if(!headers){
        res.status(400).send({
            message : "enter access token !"
        });
        return;
    }
    
    jwt.verify(headers,Key.Secrate,(err,decode)=>{
        if(err){
            res.status(404).send({
                message : "Invaild accessToken, !"
            });
            return;
        }
        req.userId = decode.id; // here i am storing decode token id in req.userId Object 
        next();
    });
}

// Handler for verifing user is admin or not
const isAdmin = async(req, res, next)=>{
    //let userId = req.userId;
    const users = await User.findOne({userId : req.userId});
        if(users && users.userType == canstant.userType.admin){
            next();
        }
        else{
            res.status(403).send({
                message : "Only Admin user access !"
            });
        }
}
const isAdminOrOwner = async(req, res, next)=>{
    // Either the caller should be the ADMIN 
    // Or call should be Owner of the userId
    try{
        const callingUser = await User.findOne({userId : req.userId});
        if(callingUser.userType == canstant.userType.admin || callingUser.userId == req.params.id){
            next();
        }
        else{
            res.status(403).send({
                message : "You can not access another profile only Admin or owner of the id !"
            });
            return;
        }
    }catch(err){
        res.status(500).send({
            message : "Internal error while reading the user info !"
        });
        return;
    }
}

const jwtOrAdmin = {
    token : verifyToken,
    isAdmin : isAdmin,
    isAdminOrOwner : isAdminOrOwner
}
module.exports = jwtOrAdmin;