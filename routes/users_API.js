const controller = require('../controllers/users_c');
const validToken = require('../middlewares/verifyToken');
module.exports = (app)=>{

    app.get('/crm/app/v1/auth/users',[validToken.token,validToken.isAdmin],controller.findAllUsers);
    app.get('/crm/app/v1/auth/user',controller.findByQuery);
}