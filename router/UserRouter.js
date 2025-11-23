
const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/UserController");
const ticketingValidation = require("../middleware/ticketing");

UserRouter.get("/", UserController.get);
UserRouter.post("/", ticketingValidation.createUser, UserController.create);
UserRouter.put("/", ticketingValidation.updateUser, UserController.update);
UserRouter.get("/:id", ticketingValidation.getUserById, UserController.getById);
UserRouter.delete("/:id", UserController.deleteById);

module.exports = UserRouter;