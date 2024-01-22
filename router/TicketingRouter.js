
const express = require("express");
const TicketingRouter = express.Router();

const TicketingController = require("../controller/TicketingController");
const ticketingValidation = require("../middleware/ticketing");

TicketingRouter.post("/create-event/", ticketingValidation.createEvent, TicketingController.createEvent);
TicketingRouter.get("/performance-map/:PCODE", TicketingController.getEventDetails);
TicketingRouter.post("/create-participants/", ticketingValidation.createParticipants, TicketingController.createParticipants);

TicketingRouter.get("/participants/:PCODE", TicketingController.getParticipants);
TicketingRouter.post("/create-barcode/", TicketingController.createBarcode);


module.exports = TicketingRouter;
