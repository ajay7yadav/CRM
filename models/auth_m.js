const mongoose = require('mongoose');
const constants = require('../util/constant');

const User = new mongoose.Schema({
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
    },
    // user create these tickets
    ticketsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],  // A user create Many tickets
        ref : "ticket"
    },
    // to engineer assigned these tickets
    ticketsAssigned : {
        type : [mongoose.SchemaTypes.ObjectId], // An Engineer assigned Many tickets
        ref : "ticket"
    }
});

module.exports = mongoose.model('users',User);