const ticketController = require('../controllers/ticket_c');
const mid = require('../middlewares');

module.exports = (app) => {
    /**
     * Create a ticket
     *   POST /crm/api/vi/tickets
     */
    app.post("/crm/api/v1/tickets", [mid.ticketBody.verifyTicketBody,mid.authJWT.token],ticketController.createTicket);

    //app.get("/crm/api/v1/tickets",ticketController.find);
 }