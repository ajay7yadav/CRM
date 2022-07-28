const verifySigUp = require('./validation');
const authJWT = require('./verifyToken');
const ticketBody = require('./ticket_mid');

module.exports = {
    verifySigUp,
    authJWT,
    ticketBody
}