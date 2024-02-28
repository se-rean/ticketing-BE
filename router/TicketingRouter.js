
const express = require("express");
const TicketingRouter = express.Router();

const TicketingController = require("../controller/TicketingController");
const ticketingValidation = require("../middleware/ticketing");

// create event 
TicketingRouter.post("/create-event/", ticketingValidation.createEvent, TicketingController.createEvent);
// get event by performance code
TicketingRouter.get("/event/", TicketingController.getEventDetails);
// get all events
TicketingRouter.get("/events/", TicketingController.getAllEvent);
// update event 
TicketingRouter.put("/update-event/", TicketingController.updateEventDetails);
// get performance pricing by performance code
TicketingRouter.get("/performance-map/:PCODE", TicketingController.getEventDetails);
// create participants by uploaded excel
TicketingRouter.post("/create-participants/", ticketingValidation.createParticipants, TicketingController.createParticipants);
// get participants by performance code
TicketingRouter.get("/participants/:PCODE", TicketingController.getParticipants);
// create barcode by performance code
TicketingRouter.post("/create-barcode/", ticketingValidation.createBarcode, TicketingController.createBarcode);
// create random participants by performance code
TicketingRouter.post("/create-random-participants/:PCODE", TicketingController.createRandomParticipants)
// create refund
TicketingRouter.put("/refund/", TicketingController.createRefund)
// edit participants
TicketingRouter.put("/participants/", TicketingController.editParticipants)
// delete participants
TicketingRouter.delete("/participants/", TicketingController.deleteParticipants)

module.exports = TicketingRouter;
