

const Sequelize = require("sequelize");

class LogsModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        type: DataTypes.STRING(255),
        userId: DataTypes.STRING(255),
        actions: DataTypes.STRING(255),
      },
      {
        modelName: "logsModel",
        tableName: "logs",
        sequelize,
        timestamps: true,
      }
    );
  }
}

module.exports = LogsModel;


  