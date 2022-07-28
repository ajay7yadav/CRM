const constants  = require("../util/constant");
const mongoose = require("mongoose");

const TicketSchema =  new mongoose.Schema({
   
    title : {
        type : String,
        required : true
    },
    ticketPriority : {
        type : Number,
        required : true,
        default :  4
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : constants.ticketStatuses.open,
        enum : [constants.ticketStatuses.open,constants.ticketStatuses.close,constants.ticketStatuses.blocked]
    },
    reporter : {
        type : String,
        required : true
    },
    // Id name  of engineer
    assignee : {
        type : String
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () =>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now()
        }
    },
}, { versionKey : false })

module.exports = mongoose.model("ticket", TicketSchema);