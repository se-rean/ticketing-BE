

const { apiResponse } = require("../api-helpers/ResponseController");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const regcodeWrapper = require("../api-helpers/regcode-generator-wrapper");
const crypto = require('crypto');
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

UserController.create = async (req, res) => {
  const {
    regcode,
    fname,
    lname,
    mname,
    email,
    phone,
    username,
    password,
  } = req.body

  try {

    const UserExists = await UserModel.findAll({
      where: {
        username
      },
        raw: true,
        attributes: { exclude: ["password"] },
    });
    if(UserExists.length) throw new Error('Please try different username')
     
    const User = await UserModel.create({
      regcode: regcodeWrapper(),
      fname,
      lname,
      mname,
      email,
      phone,
      username,
      password: crypto.createHash('md5').update(password).digest('hex'),
    });
    
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: User.dataValues
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

UserController.update = async (req, res) => {
  const query = req.body
  const userData = req.user
  try {
  
    if(query?.username) {
      const UserExists = await UserModel.findAll({
        where: {
          username: query.username
        },
          raw: true,
          attributes: { exclude: ["password"] },
      });
      if(UserExists.length) throw new Error('Please try different username')
    }

    if (query.password) {
      query.password = crypto.createHash('md5').update(query.password).digest('hex')
    }
    
   
    const User = await UserModel.update(query, { where: { id: userData.user.id } });

    const UserExists = await UserModel.findAll({
      where: {
        id: userData.user.id
      },
        raw: true,
        // attributes: { exclude: ["password"] },
    });

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: (User[0] == 0) ? "No Data Updated": "sucessful",
      data: UserExists
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

