const controller = require('../controllers/users_c');
const validToken = require('../middlewares/verifyToken');

module.exports = (app)=>{
    // get all user Only ADMIN
    app.get('/crm/app/v1/auth/users',[validToken.token,validToken.isAdmin],controller.findAllUsers);
    // Only admin or owner of the Id get 
    app.get('/crm/app/v1/auth/users/:id',[validToken.token,validToken.isAdminOrOwner],controller.findById);
    // Update Only ADMIN or owner of the Id
    app.put('/crm/app/v1/auth/users/:id',[validToken.token,validToken.isAdminOrOwner],controller.update);
}