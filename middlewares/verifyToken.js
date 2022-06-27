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
    if(headers){
        jwt.verify(headers,Key.Secrate,(err,decode)=>{
            if(err){
                res.status(400).send({
                    message : "Invaild accessToken, !"
                });
                return;
            }
            req.userId = decode.id;
            next();
        });
    }
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
            return;
        }
}
module.exports = {
    token : verifyToken,
    isAdmin : isAdmin
}