const { apiResponse } = require("../api-helpers/ResponseController");
const logger = require("../api-helpers/logger");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const AuthController = {};
const { UserModel } = require("../init/mysql-init");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ user }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

AuthController.login = async (req, res) => {
  const { username, password, ip } = req.body;
  try {

    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    console.log(hashedPassword)
    const user = await UserModel.findOne({
        where: {
          username,
          password: hashedPassword,
        },
        attributes: { exclude: ["password"] },
      });
      

    if (!user) {
      logger.info(`Login failed for username: ${username}`);
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const token = { accessToken, refreshToken }; // Add expiresIn property

    logger.info(`User ${username} logged in successfully`);
    
    res.send(
      dataToSnakeCase(
        apiResponse({
          statusCode: 200,
          message: "successful",
          data: { ...user.dataValues, ...token },
        })
      )
    );
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    res.send(
      dataToSnakeCase(
        apiResponse({
          statusCode: 200,
          message: error.message,
          isSuccess: false,
          errors: error,
        })
      )
    );
  }
};

module.exports = AuthController;
