const ticketController = require('../controllers/ticket_c');
const mid = require('../middlewares');

module.exports = (app) => {
    /**
     * Create a ticket
     *   POST /crm/api/vi/tickets
     */
    app.post("/crm/api/v1/tickets", [mid.ticketBody.verifyTicketBody,mid.authJWT.token],ticketController.createTicket);
    // get all the tickets 
    // who get the tickets  :- owner of tickets | assignee engineer | admin
    app.get("/crm/api/v1/tickets/:id",[mid.authJWT.token],ticketController.getAllTickets);
    // update the ticket
    // who update the ticket :- owner of tickets | assignee engineer | admin
    app.put("/crm/api/v1/tickets/:id",[mid.authJWT.token,mid.ticketBody.verifyUpdate],ticketController.updateTicket);
 }