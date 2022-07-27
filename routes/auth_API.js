const controller = require('../controllers/auth_c');
const validMid = require('../middlewares/validation');

// 127.01.07:8081/"crm/app/v1/auth/signup" 

module.exports = (app)=>{
    // signUp 
    app.post('/crm/app/v1/auth/signup',[validMid.valid],controller.signup);
    // signIn
    app.post('/crm/app/v1/auth/signin',[validMid.validSignUp],controller.signin);

}