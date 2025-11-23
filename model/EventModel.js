

const Sequelize = require("sequelize");

class EventModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        performanceCode: DataTypes.STRING(255),
        title: DataTypes.STRING(255),
        status: DataTypes.STRING(255),
        description: DataTypes.STRING(255),
        name: DataTypes.STRING(255),
        startDate: DataTypes.STRING(255),
        endDate: DataTypes.STRING(255),
        webSaleStartDate: DataTypes.STRING(255),
        showCode: DataTypes.STRING(255),
        webSaleEndDate: DataTypes.STRING(255),
        venueCode: DataTypes.STRING(255),
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


  