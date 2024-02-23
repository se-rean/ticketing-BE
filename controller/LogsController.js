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

    const role = await UserModel.findAll({
      where: {
        id: user.id,
        role: 'admin'
      },
        raw: true,
        attributes: { exclude: ["password"] },
    }); 
    if (role.length == 0) {
      query.where.userId = user.id
    }
 

    if (type) {
      query.where.type = type
    }

    const logs = await LogsModel.findAndCountAll(
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