const bcrypt = require('bcryptjs');    
const util = require('../util/constant');
const Auth = require('../models/auth_m');
const jwt = require('jsonwebtoken');
const Key = require('../configs/serverConfig');
// Handler for users signup
exports.signup = async(req, res)=>{
    let userStatus = req.body.userStatus;
    if(!req.body.userType || req.body.userType == util.userType.customer){
        userStatus = util.userStatus.approved;
    }
    else{
        userStatus = util.userStatus.pending;
    }
    // whatever object required for signup any user
    let userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8),
        userType : req.body.userType,
        userStatus : userStatus
    };
    // create mathod give me promis we wait till than promise full eighter failed
    try{
        const users = await Auth.create(userObj);
        res.status(201).send({
            name : users.name,
            userId : users.userId,
            email : users.email,
            userType : users.userType,
            userStatus : users.userStatus
        });
    }catch(err){
        console.log("Error while signup",err.message);
        res.status(500).send({
            message : "Internal Error !"
        });
    }
}

// Handler for users signin

exports.signin = async(req, res)=>{
    const emails = req.body.email;
    try{

        const users = await Auth.findOne({email : emails});
        if(!users){
            res.status(400).send({
                message : "Failed ! email does not exist"
            });
            return;
        }
        // verifying password with current user
        let pass = bcrypt.compareSync(req.body.password,users.password);
        if(!pass){
            res.status(400).send({
                message : "password is not matched, please enter valid password !"
            });
            return;
        }
        // check if user is approved or not for login
        if(users.userStatus == util.userStatus.pending){
            return res.status(401).send({ message : "You are approved for login"});
        }
        // accessToken :      id(header) | key(secrate key) | time (200 sec)
        let token = jwt.sign({id : users.userId},Key.Secrate,{expiresIn : 200});
        
        res.status(200).send({
            message : "Welcome "+users.name,
            userId : users.userId,
            userType : users.userType,
            AccessToken : token
        });

    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message : "Internal error while signin !"
        });
    }
};