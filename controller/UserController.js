

const { apiResponse } = require("../api-helpers/ResponseController");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const { UserModel, sequelize } = require("../init/mysql-init");

const UserController = {};
UserController.get = async (req, res) => {
  try {
    const User = await UserModel.findAll({
      raw: true,
      attributes: { exclude: ["password"] },
    });

    if(!User.length) throw new Error('No User Data')
    
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: User
    })));

  } catch (error) {
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "error",
      isSuccess: false,
      errors: error.message
    })));
  }
}

UserController.getById = async (req, res) => {
  const { id } = req.params
  try {
    const User = await UserModel.findAll({
      where: {
        id
      },
        raw: true,
        attributes: { exclude: ["password"] },
    });
    console.log(User)
    if(!User.length) throw new Error('User not found')
    
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: User
    })));

  } catch (error) {
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "error",
      isSuccess: false,
      errors: error.message
    })));
  }
}

UserController.deleteById = async (req, res) => {
  const { id } = req.params
  try {
    const User = await UserModel.findAll({
      where: {
        id
      },
        raw: true,
        attributes: { exclude: ["password"] },
    });

    if(!User.length) throw new Error('User not found')
    
    await UserModel.destroy({
      where: {
        id
      },
    });

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      // data: User
    })));

  } catch (error) {
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "error",
      isSuccess: false,
      errors: error.message
    })));
  }
}

module.exports = UserController;

