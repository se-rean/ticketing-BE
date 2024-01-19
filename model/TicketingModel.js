

const Sequelize = require("sequelize");

class TicketingModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        columnName: DataTypes.STRING(255),
      },
      {
        modelName: "modelName",
        tableName: "tableName",
        sequelize,
        timestamps: true,
      }
    );
  }
}

module.exports = TicketingModel;


  