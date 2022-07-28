const Auth = require('../models/auth_m');
const util = require('../util/constant');

const validRegistration = async(req,res,next)=>{
    // check name field
    if(! req.body.name){
        res.status(400).send({
            message : "Enter Name !"
        });
        return;
    }
    // check userId field
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
    // check email field
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
    // check password field
    if(!req.body.password){
        res.status(400).send({
            message : "Enter password"
        });
        return;
    }
    // check password is strong or not
    let value = req.body.password
    if(value){
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            return res.status(400).send({message : "Password must not contain Whitespaces"});
        }
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;   
        if (!isContainsUppercase.test(value)) {
            return res.status(400).send({message : "Password must have at least one Uppercase Character"});
        }
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            return res.status(400).send({message : "Password must have at least one Lowercase Character."});
        }
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            return res.status(400).send({message : "Password must contain at least one Digit."});
        }
        const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(value)) {
            return res.status(400).send({message : "Password must contain at least one Special Symbol."});
        }
        const isValidLength = /^.{6,}$/;
        if (!isValidLength.test(value)) {
            return res.status(400).send({message : "Password must be 6 - 10 Characters Long."});
        }
    }
    // check userType field
    let userType = req.body.userType;
    if(userType == util.userType.admin){
        return res.status(400).send({
            message : "ADMIN registration is not allowed "
        });
    }
    let userTypes = [util.userType.customer,util.userType.engineer];

    if(!userTypes.includes(req.body.userType)){
        res.status(400).send({
            message : "UserType provided is not correct. Possible correct values : CUSTOMER | ENGINEER"
        });
        return;
    }
    next(); // Give contol to the next middleware or controller
    
}
const validateSignInRequestBody = (req, res, next) => {
    
    // Validate if the userId is present 
    if (!req.body.email) {
        return res.status(400).send({
            message: "Failed ! email is not provided"
        });
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        });
    }

    next();
}

const auth = {
    validSignUp : validRegistration,
    validSignIn : validateSignInRequestBody
}
module.exports = auth;