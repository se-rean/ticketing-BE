

const Sequelize = require("sequelize");

class EventModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        performanceCode: DataTypes.STRING(255),
        section: DataTypes.STRING(255),
        typeCode: DataTypes.STRING(255),
        amount: DataTypes.STRING(255),
        capacity: DataTypes.STRING(255),
        state: DataTypes.STRING(255),
      },
      {
        modelName: "eventPricingModel",
        tableName: "event_pricing",
        sequelize,
        timestamps: true,
      }
    );
  }
}

module.exports = EventModel;


  