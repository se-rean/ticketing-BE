
const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRouter");
const TicketingRouter = require("./TicketingRouter");

router.use("/User", UserRouter);
router.use("/Ticketing", TicketingRouter);

module.exports = router;

