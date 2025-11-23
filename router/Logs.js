const express = require("express");
const router = express.Router();

const LogsController = require("../controller/LogsController");

router.get("/", LogsController.get);

module.exports = router;