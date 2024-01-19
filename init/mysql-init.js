

require("dotenv").config();
const Sequelize = require("sequelize"); 
const UserModel = require("../model/UserModel"); 
const logger = require('../api-helpers/logger');
const ParticipantsModel = require("../model/ParticipantsModel");
const DEFAULT_TIMEZONE = "+08:00";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: (queryString) => logger.info(queryString),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      connectionLimit: 10,
    },
    timezone: process.env.DB_TIMEZONE || DEFAULT_TIMEZONE,
  }
);

const models = {
  UserModel: UserModel.init(sequelize, Sequelize),
  ParticipantsModel: ParticipantsModel.init(sequelize, Sequelize),
};

module.exports = {
  ...models,
  sequelize,
};

