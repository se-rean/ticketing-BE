
require("dotenv").config();
const {apiResponse} = require('./api-helpers/ResponseController')
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const rTracer = require("cls-rtracer");
const cors = require("cors");
const router = require("./router/index");
const logger = require("./api-helpers/logger");
const DTCMService = require("./services/DTCM");
const { getAccessToken } = require("./init/DTCMAccessToken");

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const ipAddress =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  if (!ipAddress) return res.send("invalid Ip address");
  req.body.ip = ipAddress;
  next();
});

app.use(
  rTracer.expressMiddleware({
    requestIdFactory: (req) => {
      const sessionId = (Math.random() + 1).toString(36).substring(6);
      const subscriber_id = req.query.subscriber_id;
      return { sessionId, subscriber_id };
    },
  })
);

// custom routes here
app.use("/ticketing/api/v1", router);

app.use((req, res) => {
  res.status(404).send("Resource not found");
});

app.use((err, req, res, next) => {
  if (err.statusCode && err.statusCode !== 500) {
    logger.error(err);
    return res
      .status(err.statusCode)
      .json(apiResponse({ isSuccess: false, errors: err }));
  }

  res
    .status(500)
    .json(apiResponse({ isSuccess: false, errors: "Internal Server Error" }));
});

app.listen(process.env.PORT, process.env.IP, async () => {
  await getAccessToken()
  logger.info(`running on port: ${process.env.PORT}`)
});
