

const Sequelize = require("sequelize");

class ParticipantsModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        performance_code: DataTypes.STRING(255),
        area: DataTypes.STRING(255),
        pricetype_code: DataTypes.STRING(255),
        quantity: DataTypes.STRING(255),
        firstname: DataTypes.STRING(255),
        lastname: DataTypes.STRING(255),
        nationality: DataTypes.STRING(255),
        email: DataTypes.STRING(255),
        dateofbirth: DataTypes.STRING(255),
        internationalcode: DataTypes.STRING(255),
        areacode: DataTypes.STRING(255),
        phonenumber: DataTypes.STRING(255),
        address_line_1: DataTypes.STRING(255),
        city: DataTypes.STRING(255),
        state: DataTypes.STRING(255),
        countrycode: DataTypes.STRING(255),
        barcode: DataTypes.STRING(255),
        status: DataTypes.STRING(255),
        participantsCode: DataTypes.STRING(255),
        basketId: DataTypes.STRING(255),
        generate_barcode_api_respose: DataTypes.TEXT,
        amount: DataTypes.STRING(500),
        orderId: DataTypes.STRING(255),
        totalAmount: DataTypes.STRING(255),
      },
      {
        modelName: "participants",
        tableName: "participants",
        sequelize,
        timestamps: true,
      }
    );
  }
}

module.exports = ParticipantsModel;


  