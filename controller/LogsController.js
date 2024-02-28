const { apiResponse } = require("../api-helpers/ResponseController")
const dataToSnakeCase = require("../api-helpers/data_to_snake_case")
const LogsModel = require("../model/LoggerModel")
const { UserModel } = require('../init/mysql-init')
const queryPaginate = require("../api-helpers/query-paginate");
const LogsController = {}

LogsController.get = async (req, res) => {
  const { page, page_size, type } = req.query;
  const { user } = req.user;
  try { 
    let query = { where: {}}
    query.where.userId = user.id

    if (user.role == "admin") {
      delete query.where.userId
    }

    if (type) {
      query.where.type = type
    }

    const logs = await LogsModel.findAndCountAll(
      queryPaginate(
        {
          ...query,
          order: [["createdAt", "DESC"]],
          raw: true,
        },
        { page: page || 1, page_size: page_size || 3000 }
      )
    )

    await Promise.all(
      logs.rows.map(async (l, i) => {
         logs.rows[i].userData = await UserModel.findOne({ 
          where: { id: l.userId },  
          attributes: { 
            exclude: ["password"] 
          }, 
          raw: true 
        })
      })
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