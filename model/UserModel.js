

const Sequelize = require("sequelize");

class UserModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        regcode: DataTypes.STRING(255),
        fname: DataTypes.STRING(255),
        lname: DataTypes.STRING(255),
        mname: DataTypes.STRING(255),
        email: DataTypes.STRING(255),
        phone: DataTypes.STRING(255),
        username: DataTypes.STRING(255),
        password: DataTypes.STRING(255),
      },
      {
        modelName: "userModel",
        tableName: "user",
        sequelize,
        timestamps: true,
      }
    );
  }
}

module.exports = UserModel;


  