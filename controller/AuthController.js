const { apiResponse } = require("../api-helpers/ResponseController");
const logger = require("../api-helpers/logger");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const AuthController = {}; 
const logsConstant = require('../lib/logsConstant')
const { UserModel } = require("../init/mysql-init");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const Logger = require("../lib/logger");

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
    const user = await UserModel.findOne({
        where: {
          username,
        },
      });
      

    if (!user) {
      logger.info(`Login failed for username: ${username}`);
      throw new Error("Invalid credentials");
    }

    if(user.dataValues.password != hashedPassword) throw new Error("Invalid password")

    if(user.dataValues.status != 'active') throw new Error("Account not Available")

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const token = { accessToken, refreshToken }; // Add expiresIn property

    logger.info(`User ${username} logged in successfully`);
    try {
      Logger.create(logsConstant.user, `Login user ${username}`, user.id)
    } catch (error) {
      logger.info('error on create logs')
    }
    
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
