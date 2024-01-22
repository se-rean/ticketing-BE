

const { TicketingModel, sequelize, EventModel } = require("../init/mysql-init");
const DTCMService = require("../services/DTCM");
const { apiResponse } = require("../api-helpers/ResponseController");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const ParticipantsModel = require("../model/ParticipantsModel");

const TicketingController = {};

TicketingController.createEvent = async (req, res) => {
  
  const {
    performanceCode,
    title,
    description
  } = req.body

  try {

    const eventExists = await EventModel.findAll({ where: {performanceCode}, raw: true })
    if(eventExists.length > 0) throw new Error("Event Already exists")

    const event = await EventModel.create({
      performanceCode,
      title,
      description
    }, {raw: true})

    if (!event) throw new Error("Error encounter on create event")
    
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: event.dataValues
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

TicketingController.getEventDetails = async (req, res) => {
  const performanceCode = req.params.PCODE
  
  try {

    const eventExists = await EventModel.findAll({ where: {performanceCode}, raw: true })
    if(eventExists.length < 1) throw new Error("Event Not exists")

    const eventDetails = await DTCMService.getEventDetails(performanceCode)
 
    if (!eventDetails) throw new Error("Error encounter on create event")
    
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: eventDetails.data
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

TicketingController.getPerformanceMap = async (req, res) => {

  const performanceCode = req.params.PCODE

  try {

    if (!performanceCode) throw new Error("Performance Code Required")
    
    const result = await DTCMService.getPerformanceMap(performanceCode)

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

TicketingController.getParticipants = async (req, res) => {

  const performanceCode = req.params.PCODE

  try {
    
    const participants = await ParticipantsModel.findAll({where: { performance_code: performanceCode }, raw: true})
    if (!participants) throw new Error("Error: "+ JSON.stringify(result))

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: participants
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
 
    const createCustomer = await DTCMService.createCustomer(participants);
  
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: createCustomer
    })));

  } catch (error) {
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 402,
      message: "error",
      isSuccess: false,
      errors: error.message
    })));
  }
}

TicketingController.createBarcode = async (req, res) => {
  const { 
    participants
   } = req.body

  try {
    const result = participants.map(async (p) => {
      await DTCMService.createBarcode({
        participants_code: p.participants_code,
        amount: p.amount,
        basketId: p.basket_id,
        id: p.id
      });
    })
  
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

module.exports = TicketingController;

