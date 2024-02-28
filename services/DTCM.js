const DTCMService = {};
const { ParticipantsModel, sequelize, EventPricingModel } = require('../init/mysql-init');
const { getToken } = require('../init/DTCMAccessToken');
const { Sequelize } = require('sequelize');
const axios = require('axios');
const Logger = require('../lib/logger')
const logsConstant = require('../lib/logsConstant')
const request = require('request');

const API_URL = process.env.ENV == "development" ? process.env.DEV_API_URL : process.env.PROD_API_URL;
const API_KEY = process.env.ENV == "development" ? process.env.DEV_API_KEY : process.env.PROD_API_KEY;

const createHeaders1 = async () => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${await getToken()}`);
  headers.append('Content-Type', 'application/json');
  return headers;
};

const fetchWithHeaders1 = async (url, options = {}) => {
  const headers = await createHeaders();
  options.headers = headers;
  try {
    const response = await fetch(`${API_URL}/${url}?api_key=${API_KEY}`, options);
    const responseData = {
      status: response.status,
      ok: response.ok,
      // apiResponse: JSON.stringify(await response.json())
    };

    if (response.ok) {
      if(response.status !== 204) {
        responseData.data = await response.json();
      }
    } else {
      responseData.apiResponse = JSON.stringify(await response.json());
    }

    return responseData;
  } catch (error) {
    return error
  }
};

const createHeaders2 = async () => {
  const headers = {
    'Authorization': `Bearer ${await getToken()}`,
    'Content-Type': 'application/json'
  };
  return headers;
};

const fetchWithHeaders2 = async (url, options = {}) => {
  const headers = await createHeaders();
  try {
    const response = await axios(`${API_URL}/${url}?api_key=${API_KEY}`, {
      ...options,
      headers: headers
    });

    

    const responseData = {
      status: response.status,
      ok: response.status >= 200 && response.status < 300,
      // apiResponse: JSON.stringify(response.data)
    };

    if (response.status >= 200 && response.status < 300) {
      if (response.status !== 204) {
        responseData.data = response.data;
      }
    } else {
      responseData.apiResponse = JSON.stringify(response.data);
    }
    return responseData;
  } catch (error) {
    return error;
  }
};

const createHeaders = async () => {
  const headers = {
    'Authorization': `Bearer ${await getToken()}`,
    'Content-Type': 'application/json'
  };
  return headers;
};

const fetchWithHeaders = async (url, options = {}) => {
  const headers = await createHeaders();
  const requestOptions = {
    url: `${API_URL}/${url}?api_key=${API_KEY}`,
    headers: headers,
    ...options
  };

  const apiResult = await new Promise((resolve, reject) => {
    request(requestOptions, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const responseData = {
          status: response.statusCode,
          ok: response.statusCode >= 200 && response.statusCode < 300,
          // apiResponse: JSON.stringify(body)
        };

        if (response.statusCode >= 200 && response.statusCode < 300) {
          if (response.statusCode !== 204) {
            responseData.data = JSON.parse(body);
          }
        } else {
          responseData.apiResponse = JSON.stringify(body);
        }

        resolve(responseData);
      }
    });
  });

  return apiResult
};

DTCMService.getEventDetails = async (performanceCode) => {
  const res = await fetchWithHeaders(`performances/${performanceCode}/map`);
  return res
}

DTCMService.createBarcode = async (participant) => {
  const order = await purchaseBasket(participant);

  if (!order.orderId) {
    return false;
  }

  const orderDetail = await orderDetails(order.orderId); 
  if (orderDetail.orderLines[0].orderLineItems[0].barcode) {
    const BC = orderDetail.orderLines[0].orderLineItems[0].barcode;
    await ParticipantsModel.update(
      { generate_barcode_api_respose: 'success', barcode: BC, orderId: order.oderId },
      { where: { id: participant.id } }
    );
  } else {
    await ParticipantsModel.update({ generate_barcode_api_respose: JSON.stringify(order) }, { where: { id: participant.id } });
  }

  return true;
};

async function orderDetails(orderId) {
  const options = { method: 'GET', redirect: 'follow' };
  return fetchWithHeaders(`orders/${orderId}`, options);
}

async function purchaseBasket(participant) {
  const raw = JSON.stringify({
    Seller: process.env.client_id,
    customer: [{ ID: participant.participants_code, Account: 0, AFile: 'tel' }],
    Payments: [{ Amount: participant.totalAmount, MeansOfPayment: 'EXTERNAL' }],
  });

  const options = { method: 'POST', body: raw, redirect: 'follow' };
  return fetchWithHeaders(`baskets/${participant.basket_id}/purchase`, options);
}

async function customerApi(customer) {
  const payload = {
    firstName: customer.firstname,
    lastName: customer.lastname,
    email: customer.email,
    dateOfBirth: customer.dateofbirth,
    nationality: customer.nationality,
    phoneNumber: customer.phonenumber,
    areaCode: customer.areacode,
    city: customer.city,
    state: customer.state,
    countryCode: customer.countrycode,
  };
  const options = { method: 'POST', body: JSON.stringify(payload), redirect: 'follow' };
  return fetchWithHeaders('customers', options);
}

async function craeteBasket(participant) {
  const raw = JSON.stringify({
    "Channel": "5",
    "Seller": process.env.client_id,
    "Performancecode": participant.performance_code,
    "Area": participant.area,
    "autoReduce": false,
    "holdcode": "",
    "Demand": [
      {
        "PriceTypeCode": participant.pricetype_code,
        "Quantity": participant.quantity,
        "Admits": 1,
        "offerCode": "",
        "qualifierCode": "",
        "entitlement": "",
        "Customer": {
          }
      }
    ]
  });
  const options = { method: 'POST', body: raw, redirect: 'follow' };
  return fetchWithHeaders('baskets', options);
}

DTCMService.createCustomer = async (participantsIds = [], performanceCode = "", limit=100, userId = "") => {
  try { 
    const result = await ParticipantsModel.findAll({
      where: {
        [Sequelize.Op.and]: [
          {
            [Sequelize.Op.or]: [
              {
                id: {
                  [Sequelize.Op.in]: participantsIds,
                },
              },
              {
                performance_code: performanceCode,
              },
            ],
          },
          {
            [Sequelize.Op.or]: [
              {barcode: null},
              {barcode: ""},
            ]
          },
          {
            [Sequelize.Op.or]: [
              {status: null},
              {status: "pending"},
              {status: "failed"},
            ]
          }
        ],
      },
      raw: true,
      limit: limit,
    });
    if (result.length < 1) return "All Participant already have barcode"
    // const data = []

    

    const data = await Promise.all(result.map(async (r, i) => {
      let log, status = "failed"
      const customer = await customerApi(r);
      if (customer.status === 200) {  
        result[i].participantsCode = customer?.data?.id
       
        const basket = await craeteBasket(result[i]);
        if (basket.status === 200 ) {
          result[i].basketId = basket?.data?.id
          const orderPayload = {
            participants_code: customer?.data?.id,
            totalAmount: r.totalAmount,
            basket_id: basket?.data?.id
          }
           
          const order = await purchaseBasket(orderPayload)
          if (order.status === 200) {
            const orderDetail = await orderDetails(order?.data?.orderId); 
            if (orderDetail.status == 200) {
              log = { message: "OK" }
              status = "sold"
              const BC = orderDetail?.data?.orderLines[0]?.orderLineItems[0]?.barcode;
              result[i].barcode = BC
              await EventPricingModel.increment({sold: 1},{ where: { section: result[i].area, performanceCode } })
              await ParticipantsModel.update({ status: status, participantsCode: customer?.data?.id, basketId: basket?.data?.id, barcode: BC, orderId: order?.data?.orderId }, { where: { id: r.id } });

              Logger.create(logsConstant.ticketing, `Create participant id:${r.id} fname: ${r.firstname} lname: ${r.lastname} barcode ${ JSON.stringify(BC) }`, userId)

            } else {
              log = JSON.parse(orderDetail.apiResponse)
            }
          } else {
            log = JSON.parse(order.apiResponse)
          }
        } else {
          log = JSON.parse(basket.apiResponse)
        }
      } else {
        log = JSON.parse(customer.apiResponse)
      }

      if (typeof log == 'string') {
        log = JSON.parse(log)
      }

      await ParticipantsModel.update({ status , generate_barcode_api_respose: log.message}, { where: { id: r.id } });
      return result[i]
      
    }));

    return data
  } catch (error) {
    throw new Error(error);
  }
};

DTCMService.getPerformanceMap = async (performance) => {
  const res = await fetchWithHeaders(`performances/${performance}/prices`);
  if (res.status !== 200) throw new Error(res.error.message)
  return res
};

DTCMService.refund = async (orderId, amount, seller, meansOfPayment = 'EXTERNAL') => {
  const raw = JSON.stringify({
    "Seller": seller,
    "refunds": [
      {
          "Amount": amount,
          "MeansOfPayment": meansOfPayment
      }
    ]
  });

  const options = { method: 'POST', body: raw, redirect: 'follow' };
  return fetchWithHeaders(`orders/${orderId}/reverse`, options);
}

module.exports = DTCMService;