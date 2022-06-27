const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended : true}));

const serverConfig = require('../CRM/configs/serverConfig');
const dbConfig = require('../CRM/configs/db.config');
const authUser = require('./models/auth_m');
const bcrypt = require('bcryptjs');

mongoose.connect(dbConfig.DB_URL,()=>{
    console.log("mongoDB connected");
    init();
})
async function init(){
    let user = await authUser.findOne({userId : 'admin1'});
    if(user) return;
    else{
        authUser.create({
            name : "admin",
            userId : "admin1",
            email : "admin@123",
            password : bcrypt.hashSync("admin"),
            userType : "ADMIN",
            userStatus : "APPROVED"
        })
    }
}
require('./routes/auth_API')(app);
require('./routes/users_API')(app);

app.listen(serverConfig.PORT,()=>{
    console.log("server start at port",serverConfig.PORT);
});