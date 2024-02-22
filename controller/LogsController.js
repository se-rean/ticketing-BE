const { apiResponse } = require("../api-helpers/ResponseController")
const dataToSnakeCase = require("../api-helpers/data_to_snake_case")
const LogsModel = require("../model/LoggerModel")
const queryPaginate = require("../api-helpers/query-paginate");
const LogsController = {}

LogsController.get = async (req, res) => {
  const { page, page_size, type } = req.query;
  try { 
    let query = {}
    if (type) {
      query.where = { type }
    }
    const logs = await LogsModel.findAll(
      queryPaginate(
        {
          ...query,
          order: [["type", "ASC"], ["createdAt", "DESC"]],
          raw: true,
        },
        { page: page || 1, page_size: page_size || 3000 }
      )
    )

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