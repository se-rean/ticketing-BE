
const express = require("express");
const TicketingRouter = express.Router();

const TicketingController = require("../controller/TicketingController");

TicketingRouter.get("/performance-map/:PCODE", TicketingController.getPerformanceMap);
TicketingRouter.post("/create-participants/", TicketingController.createParticipants);
TicketingRouter.post("/create-barcode/", TicketingController.createBarcode);


module.exports = TicketingRouter;
