

const Sequelize = require("sequelize");

class EventModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        performanceCode: DataTypes.STRING(255),
        title: DataTypes.STRING(255),
        description: DataTypes.STRING(255)
      },
      {
        modelName: "eventsModel",
        tableName: "events",
        sequelize,
        timestamps: true,
      }
    );
  }
}

module.exports = EventModel;


  