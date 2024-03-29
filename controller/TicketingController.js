

const { TicketingModel, sequelize, EventModel } = require("../init/mysql-init");
const DTCMService = require("../services/DTCM");
const { apiResponse } = require("../api-helpers/ResponseController");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const ParticipantsModel = require("../model/ParticipantsModel");
const queryPaginate = require("../api-helpers/query-paginate");
const { faker } = require('@faker-js/faker');

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

  const { page, page_size } = req.query;

  try {
    
    const participants = await ParticipantsModel.findAll(
      queryPaginate(
        {
          where: { performance_code: performanceCode },
          order: [["barcode", "ASC"]],
          raw: true,
        },
        { page: page || 1, page_size: page_size || 10 }
      )
    )
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
 
    const result = await ParticipantsModel.bulkCreate(participants)
    
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: result
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

TicketingController.createRandomParticipants = async (req, res) => {
  
  const performanceCode = req.params.PCODE
  const { category } = req.body
  try {

  const eventExists = await EventModel.findAll({ where: {performanceCode}, raw: true })
  if(eventExists.length < 1) throw new Error("Event Not exists")

  let data = []
  const payload = category.map(c => {
    console.log(c.count)
   
    for(let x = 0; x < c.count; x++) {
      data.push({
        "performance_code": performanceCode,
        "area": c.area,
        "pricetype_code": c.code,
        "quantity": "1",
        "firstname": faker.person.firstName(),
        "lastname": faker.person.lastName(),
        "nationality": "filipino",
        "email": faker.internet.email(),
        "dateofbirth": faker.date.birthdate(),
        "internationalcode": "PH",
        "areacode": "AE",
        "phonenumber": faker.phone.number(),
        "address_line_1": faker.location.streetAddress({useFullAddress: true}),
        "city": faker.location.city(),
        "state": faker.location.state(),
        "countrycode": faker.location.countryCode(),
        "totalAmount": c.amount
    })
    } 

  
    return data
  })

  const result = await ParticipantsModel.bulkCreate(data)

  result.forEach((r, i) => {
    result[i] = r.dataValues
  })

  res.send(dataToSnakeCase(apiResponse({
    statusCode: 200,
    message: "sucessful",
    data: result
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
  const { participantsIds, performanceCode, limit, retry = 1 } = req.body

  try {
    let createCustomer = {}
    for(let x = 0; x < retry; x++) {
      createCustomer = await DTCMService.createCustomer(participantsIds, performanceCode, limit);
    }
   
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

module.exports = TicketingController;

