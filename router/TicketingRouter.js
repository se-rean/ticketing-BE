
const express = require("express");
const TicketingRouter = express.Router();

const TicketingController = require("../controller/TicketingController");
const ticketingValidation = require("../middleware/ticketing");

TicketingRouter.post("/create-event/", ticketingValidation.createEvent, TicketingController.createEvent);
TicketingRouter.get("/performance-map/:PCODE", TicketingController.getEventDetails);
TicketingRouter.post("/create-participants/", ticketingValidation.createParticipants, TicketingController.createParticipants);

TicketingRouter.get("/participants/:PCODE", TicketingController.getParticipants);
TicketingRouter.post("/create-barcode/", ticketingValidation.createBarcode, TicketingController.createBarcode);
TicketingRouter.post("/create-random-participants/:PCODE", TicketingController.createRandomParticipants)

TicketingRouter.put("/participants/", TicketingController.editParticipants)

TicketingRouter.delete("/participants/", TicketingController.deleteParticipants)

module.exports = TicketingRouter;
