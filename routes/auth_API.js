const controller = require('../controllers/auth_c');
const validMid = require('../middlewares/validation');
// 127.01.07:8081/"crm/app/v1/auth/signup"   
module.exports = (app)=>{
    app.post('/crm/app/v1/auth/signup',[validMid.valid],controller.signup);
    app.post('/crm/app/v1/auth/signin',controller.signin);
}