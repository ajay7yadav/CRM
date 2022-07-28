const controller = require('../controllers/auth_c');
const validMid = require('../middlewares');

// 127.01.07:8081/"crm/app/v1/auth/signup" 

module.exports = (app)=>{
    // signUp 
    app.post('/crm/app/v1/auth/signup',[validMid.verifySigUp.validSignUp],controller.signup);
    // signIn
    app.post('/crm/app/v1/auth/signin',[validMid.verifySigUp.validSignIn],controller.signin);

}