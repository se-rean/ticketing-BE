

const { TicketingModel, sequelize, EventModel, EventPricingModel } = require("../init/mysql-init");
const DTCMService = require("../services/DTCM");
const { apiResponse } = require("../api-helpers/ResponseController");
const dataToSnakeCase = require("../api-helpers/data_to_snake_case");
const ParticipantsModel = require("../model/ParticipantsModel");
const queryPaginate = require("../api-helpers/query-paginate");
const { faker, fa } = require('@faker-js/faker');
const { Sequelize, where } = require("sequelize");

const TicketingController = {};
const eventStatus = {
  1: 'Pending For Barcode Generation',
  2: 'Completed',
  3: 'Cancelled',
  4: 'Event Not Available'
}

TicketingController.createEvent = async (req, res) => {
  
  const {
    performanceCode,
    title,
    description
  } = req.body

  try {

    const eventDetails = await DTCMService.getEventDetails(performanceCode)
    console.log(eventDetails)
    if (eventDetails.status !== 200) throw new Error("Event/Performance Code Not Available")
    
    const eventExists = await EventModel.findAll({ where: {performanceCode}, raw: true })
    if(eventExists.length > 0) throw new Error("Event Already exists")

    const event = await EventModel.create({
      performanceCode,
      title,
      description,
      status: eventStatus[1]
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

TicketingController.createRefund = async (req, res) => {
  const PCODE = req.query.PCODE
  const { participants } = req.body
  try {

    if (!PCODE) throw new Error('Performance Code required')
    if (!participants || participants.length < 1)  throw new Error('Participants id required')

    const participantsData = await ParticipantsModel.findAll({ 
      where: {
        performance_code: PCODE, 
        status: 'sold', 
        [Sequelize.Op.not]: [
          {barcode: null},
          {barcode: ""},
        ],
        [Sequelize.Op.not]: [
          {orderId: null},
          {orderId: ""},
        ],
        id: { 
          [Sequelize.Op.in]: 
          participants
        }
      }, raw: true })
    if(participantsData.length < 1) throw new Error("Participant/s not Available for refund")
    const result = await Promise.all(participantsData.map(async p => {
      const refunded = await DTCMService.refund(p.orderId, p.totalAmount, process.env.client_id)
      if (refunded.status === 204) {
        ParticipantsModel.update({ status: 'refunded', generate_barcode_api_respose: 'refund successful' }, { where: {id: p.id} })
        await EventPricingModel.decrement({sold: 1},{ where: { section: p.area, performanceCode: p.performance_code } })
        await EventPricingModel.increment({refunded: 1},{ where: { section: p.area, performanceCode: p.performance_code } })
      } else {
        let log = JSON.parse(refunded.apiResponse)
        ParticipantsModel.update({ generate_barcode_api_respose: 'Error on refund: '+log.message }, { where: {id: p.id} })
      }
    }))
    

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: participantsData
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
    if (!eventDetails) throw new Error("Error encounter on get event details")
    

    let ep = []
    if (eventDetails.data) {
      await EventModel.update({
        name,
        startDate,
        endDate,
        webSaleStartDate,
        webSaleEndDate,
        showCode,
        venueCode, 
      } = eventDetails.data, { where: { performanceCode } })

      
      eventDetails.data.sections.forEach(s => {
        eventDetails.data.ticketPrices.forEach(async t => {
          if (s.categoryId === t.categoryId && t.price !== 0) {
            const pricing = await EventPricingModel.findAll({ where: { performanceCode, typeCode: t.typeCode  }, raw: true })
            console.log(pricing)
            if (pricing.length > 0) {
              await EventPricingModel.update({ 
                section: s.code,
                capacity: s.capacity,
                typeCode: t.typeCode,
                amount: t.price,
                state: eventDetails.data.priceTypes.find(p => p.code === t.typeCode).state
               }, { where:  { performanceCode, typeCode: t.typeCode, section: s.code  } })
            } else {
              await EventPricingModel.create({ 
                  performanceCode,
                  section: s.code,
                  capacity: s.capacity,
                  typeCode: t.typeCode,
                  amount: t.price,
                  state: eventDetails.data.priceTypes.find(p => p.code === t.typeCode).state
               })
            }
            // ep.push({
            //   performanceCode,
            //   section: s.code,
            //   capacity: s.capacity,
            //   typeCode: t.typeCode,
            //   amount: t.price,
            //   state: eventDetails.data.priceTypes.find(p => p.code === t.typeCode).state
            //   })
          } 
        })
        })

       
    } else {
      await EventModel.update({
        status: eventStatus[4]
      }, { where: { performanceCode } })
    }
 
    const eventDetail = await EventModel.findAll({ where: {performanceCode}, raw: true })
    const eventPricing = await EventPricingModel.findAll({ where: { performanceCode }, raw: true })

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: { ...eventDetail[0], eventPricing }
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

TicketingController.getAllEvent = async (req, res) => {

  try {

    const events = await EventModel.findAll({raw: true })
    if(events.length < 1) throw new Error("Event Not exists")
 
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data:  events 
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

TicketingController.getEventDetails1 = async (req, res) => {
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

TicketingController.updateEventDetails = async (req, res) => {
  const PCODE = req.query.PCODE
  const { title, status, description } = req.body
  try { 

    if (!PCODE) throw new Error('Performance Code required')

    const eventExists = await EventModel.findAll({ where: {performanceCode: PCODE}, raw: true })
    if(eventExists.length < 1) throw new Error("Event Not exists")

    await EventModel.update({
      title,
      status: eventStatus[status],
      description
    }, { where: {performanceCode: PCODE} })

    const eventData = await EventModel.findAll({ where: {performanceCode: PCODE}, raw: true })

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: eventData
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
    const allParticipants = await ParticipantsModel.findAll({where: { performance_code: performanceCode }})
    const participants = await ParticipantsModel.findAll(
      queryPaginate(
        {
          where: { performance_code: performanceCode },
          order: [["status", "ASC"], ["createdAt", "DESC"]],
          raw: true,
        },
        { page: page || 1, page_size: page_size || 3000 }
      )
    )
    if (!participants) throw new Error("Error: "+ JSON.stringify(result))

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      count: allParticipants.length,
      pages: (allParticipants.length / page_size),
      data: participants,
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

TicketingController.editParticipants = async (req, res) => {
  const query = req.body
  const { id } = req.query
  try {
 
    const result = await ParticipantsModel.update(query, {
      where: {
        id,
        barcode: null
      },
      raw: true
    })
    
    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: {
        updated: result
      }
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

TicketingController.deleteParticipants = async (req, res) => {
  const query = req.body
  const { id } = req.query

  try {
 
    const result = await ParticipantsModel.destroy({
      where: {
        id,
        barcode: null
      }
    })

    res.send(dataToSnakeCase(apiResponse({
      statusCode: 200,
      message: "sucessful",
      data: {
        deleted: result
      }
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
  const payload = await Promise.all(category.map(c => {
   
    const countryCode = faker.location.countryCode()
    for(let x = 0; x < c.count; x++) {
      data.push({
          "performance_code": performanceCode,
          "area": c.area,
          "pricetype_code": c.code,
          "quantity": "1",
          "firstname": faker.person.firstName(),
          "lastname": faker.person.lastName(),
          "nationality": faker.location.countryCode(),
          "email": faker.internet.email(),
          "dateofbirth": faker.date.birthdate(),
          "internationalcode": countryCode,
          "areacode": countryCode,
          "phonenumber": faker.phone.number(),
          "address_line_1": faker.location.streetAddress({useFullAddress: false}),
          "city": faker.location.city(),
          "state": faker.location.state(),
          "countrycode": countryCode,
          "totalAmount": c.amount,
          "salutation": faker.person.prefix(),
          "offerCode": "",
          "qualifierCode": "",
          "job_title": faker.person.jobTitle(),
          "company_name": faker.company.name(),
          "type":faker.person.jobType()
      })
    }
    return data
  }))

  console.log(payload)
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

