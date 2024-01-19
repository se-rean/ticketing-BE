
const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/UserController");
const ticketingValidation = require("../middleware/ticketing");

UserRouter.get("/", UserController.get);
UserRouter.get("/:id", ticketingValidation.getUserById, UserController.getById);
UserRouter.delete("/:id", UserController.deleteById);

module.exports = UserRouter;