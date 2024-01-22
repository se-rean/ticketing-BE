const DTCMService = {};
const { ParticipantsModel } = require('../init/mysql-init');
const { getToken } = require('../init/DTCMAccessToken');
const logger = require('../api-helpers/logger');

const API_URL = 'https://et-apiuat.detsandbox.com';
const API_KEY = '3rcbhsn32xmwvu42bmk2pkak';

const createHeaders = async () => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${await getToken()}`);
  headers.append('Content-Type', 'application/json');
  return headers;
};

const fetchWithHeaders = async (url, options = {}) => {
  const headers = await createHeaders();
  options.headers = headers;
  try {
    const response = await fetch(`${API_URL}/${url}?api_key=${API_KEY}`, options);

    const responseData = {
      status: response.status,
      ok: response.ok,
    };

    if (response.ok) {
      responseData.data = await response.json();
    } else {
      responseData.error = new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }

    return responseData;
  } catch (error) {
    logger.info(error)
  }
};

DTCMService.getEventDetails = async (performanceCode) => {
  const res = await fetchWithHeaders(`performances/${performanceCode}/map`);
  if (res.status !== 200) throw new Error(res.error.message)
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
    Seller: 'ASAEV1',
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
    nationality: customer.internationalcode,
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
    "Seller": "ABART11",
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

DTCMService.createCustomer = async (participants) => {
  try {
    const result = await ParticipantsModel.bulkCreate(participants, { raw: true });
    // const data = []
    const data = await Promise.all(result.map(async (r, i) => {
      result[i] = result[i].dataValues;
      const customer = await customerApi(r);
      result[i].participantsCode = customer?.data?.id
      const basket = await craeteBasket(result[i]);
      result[i].basketId = basket?.data?.id
      
      const orderPayload = {
        participants_code: customer?.data?.id,
        totalAmount: r.totalAmount,
        basket_id: basket?.data?.id
      }
      
      const order = await purchaseBasket(orderPayload)
      const orderDetail = await orderDetails(order?.data?.orderId); 
      const BC = orderDetail?.data?.orderLines[0]?.orderLineItems[0]?.barcode;
      result[i].barcode = BC
      await ParticipantsModel.update({ participantsCode: customer?.data?.id, basketId: basket?.data?.id, barcode: BC }, { where: { id: r.id } });
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

module.exports = DTCMService;