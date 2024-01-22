
const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRouter");
const TicketingRouter = require("./TicketingRouter");
const AuthRouter = require("./Auth");
const AuthenticateToken = require("../middleware/ValidateCredentials");

router.use("/User", AuthenticateToken, UserRouter);
router.use("/Ticketing", AuthenticateToken, TicketingRouter);
router.use("/Auth", AuthRouter);

module.exports = router;

