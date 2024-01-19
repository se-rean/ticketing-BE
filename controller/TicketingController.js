

const { TicketingModel, sequelize } = require("../init/mysql-init");
const DTCMService = require("../services/DTCM");
const { apiResponse } = require("../api-helpers/ResponseController");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const ParticipantsModel = require("../model/ParticipantsModel");

const TicketingController = {};

TicketingController.getPerformanceMap = async (req, res) => {

  const performanceCode = req.params.PCODE

  try {

    if (!performanceCode) throw new Error("Performance Code Required")
    
    const result = await DTCMService.getPerformanceMap(performanceCode)
    
    if (result.statusCode != 200) throw new Error("Error: "+ JSON.stringify(result))

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: result
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

TicketingController.createParticipants = async (req, res) => {
  const { participants } = req.body

  try {
 
    if (!participants) throw new Error("Participants Required")

  
    const createCustomer = await DTCMService.createCustomer(participants);
  
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: createCustomer
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

TicketingController.createBarcode = async (req, res) => {
  const { customer } = req.body

  try {
 
    if (!participants) throw new Error("Participants Required")

  
    const createCustomer = await DTCMService.createBarcode(customer);
  
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: createCustomer
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

module.exports = TicketingController;

