const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const serverConfig = require('../CRM/configs/serverConfig');
const dbConfig = require('../CRM/configs/db.config');
const User = require('./models/auth_m');
const bcrypt = require('bcryptjs');

mongoose.connect(dbConfig.DB_URL,()=>{
    console.log("mongoDB connected");
    defaultCreate();
});
// Create ADMIN 
async function defaultCreate(){
    try {
        // clean my user collection for better experience
        // await User.collection.drop();
        const admin = await User.create({
            name : "admin",
            userId : "admin1",
            email : "admin@123",
            password : bcrypt.hashSync("admin"),
            userType : "ADMIN",
            userStatus : "APPROVED"
        });
        console.log(admin);

    }catch(err){
        console.log("error while admin creation",err.message);
    }
}
require('./routes/auth_API')(app);
require('./routes/users_API')(app);
require('./routes/ticket_API')(app);

app.listen(serverConfig.PORT,()=>{
    console.log("server start at port",serverConfig.PORT);
});