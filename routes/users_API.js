const controller = require('../controllers/users_c');
const mid = require('../middlewares');

module.exports = (app)=>{
    // get all user Only ADMIN
    app.get('/crm/app/v1/auth/users',[mid.authJWT.token,mid.authJWT.isAdmin],controller.findAllUsers);
    // Only admin or owner of the Id get 
    app.get('/crm/app/v1/auth/users/:id',[mid.authJWT.token,mid.authJWT.isAdminOrOwner],controller.findById);
    // Update Only ADMIN or owner of the Id
    app.put('/crm/app/v1/auth/users/:id',[mid.authJWT.token,mid.authJWT.isAdminOrOwner],controller.update);
}