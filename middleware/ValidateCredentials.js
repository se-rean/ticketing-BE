const jwt = require("jsonwebtoken");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const { apiResponse } = require("../api-helpers/ResponseController");

const AuthenticateToken = (req, res, next) => {
  const auth = req.header("Authorization");

  try {
    if (!auth) throw new Error("Forbidden");

    const [type, token] = auth.split(" ");

    if (type !== "Bearer") throw new Error("Invalid Token");

    if (!token) throw new Error("Unauthorized");

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new Error("Token expired please re-login");
        } else {
          throw new Error("Forbidden1");
        }
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(403).send(
      dataToSnakeCase(
        apiResponse({
          isSuccess: false,
          statusCode: 403,
          message: error.message,
          error: error,
        })
      )
    );
  }
};

module.exports = AuthenticateToken;
