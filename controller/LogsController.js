const { apiResponse } = require("../api-helpers/ResponseController")
const dataToSnakeCase = require("../api-helpers/data_to_snake_case")
const LogsModel = require("../model/LoggerModel")
const LogsController = {}

LogsController.get = async (req, res) => {
  try { 
    const logs = await LogsModel.findAll({raw: true})

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: logs
    })));
  } catch (error) {
     res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      isSuccess: false,
      message: error.message, 
    })));
  }
}

module.exports = LogsController