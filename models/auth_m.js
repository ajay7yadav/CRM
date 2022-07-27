const mongoose = require('mongoose');
const constants = require('../util/constant');

const auth = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        default : constants.userType.customer,
        enum : [constants.userType.customer, constants.userType.admin,constants.userType.engineer]
    },
    userStatus : {
        type : String,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.approved, constants.userStatus.pending]
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    }
});

module.exports = mongoose.model('auth',auth);