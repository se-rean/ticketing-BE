// const LogsModel = require("../model/LoggerModel")
const {LogsModel} = require('../init/mysql-init')
const logger = require("../api-helpers/logger")
const Logger = {}

Logger.create = async (type = "", actions = "", userId = "") => {
  try {
    await LogsModel.create({
      userId,
      actions,
      type
    })
  } catch (error) {
    logger.info(`error on creating logs: ${error}`)
  }
}


module.exports = Logger
