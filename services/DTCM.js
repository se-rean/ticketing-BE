const DTCMService = {}
const axios = require('axios');
const httpClientRequest = require('../api-helpers/httpClientRequest');
const httpFetchRequest = require('../api-helpers/httpFetchRequest');
const { ParticipantsModel } = require('../init/mysql-init');
const { getToken } = require('../init/DTCMAccessToken');
let accessToken = null;

DTCMService.createBarcode = async (participant) => {
  let BC = ''
  const order = await purchaseBasket(participant)
  console.log("orderId", order)
  if (order.orderId) {
    const orderDetail = await orderDetails(order.orderId)
  
    if (orderDetail.orderLines[0].orderLineItems[0].barcode) {
      console.log(JSON.stringify(orderDetail.orderLines[0].orderLineItems[0].barcode))
      BC = orderDetail.orderLines[0].orderLineItems[0].barcode
    }
    await ParticipantsModel.update({ generate_barcode_api_respose: 'success', barcode: BC, orderId: order.oderId }, { where: { id: participant.id } })
    return true
  } else {
    return false
  }
}

async function orderDetails(oderId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${await getToken()}`);
  myHeaders.append("Content-Type", "application/json");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  const result = await fetch(`https://et-apiuat.detsandbox.com/orders/${oderId}?api_key=3rcbhsn32xmwvu42bmk2pkak`, requestOptions)
  const details = await result.json()
  console.log("order details: ", details)
  return details
}

async function purchaseBasket(participant) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${await getToken()}`);
  myHeaders.append("Content-Type", "application/json");
  console.log(participant)
  var raw = JSON.stringify({
    "Seller": "ASAEV1",
    "customer": [
      {
        "ID": participant.participants_code,
        "Account": 0,
        "AFile": "tel"
      }
    ],
    "Payments": [
      {
        "Amount": participant.amount,
        "MeansOfPayment": "EXTERNAL"
      }
    ]
  });
 
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const res = await fetch(`https://et-apiuat.detsandbox.com/baskets/${participant.basketId}/purchase?api_key=3rcbhsn32xmwvu42bmk2pkak`, requestOptions)
  const basket = await res.json()
  console.log(basket)
  return basket
}

async function customerApi(customer) {
  const payload = {      
    "firstName": customer.firstname,
    "lastName": customer.lastname,
    "email": customer.email,
    "dateOfBirth": customer.dateofbirth,
    "nationality": customer.internationalcode,
    "phoneNumber": customer.phonenumber,
    "areaCode": customer.areacode,
    "city": customer.city,
    "state": customer.state,
    "countryCode": customer.countrycode,
  }
  var myHeaders = new Headers();
  myHeaders.append(`Authorization`, `Bearer ${await getToken()}`)
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(payload),
    redirect: 'follow'
  }; 

      const response = await fetch(`https://et-apiuat.detsandbox.com/customers?api_key=3rcbhsn32xmwvu42bmk2pkak`, requestOptions)
      // console.log(response)
  // const data = await httpFetchRequest.post('customers?api_key=3rcbhsn32xmwvu42bmk2pkak', payload)
  return response.json()
}

async function craeteBasket(participant) {
  var myHeaders = new Headers();
  myHeaders.append(`Authorization`, `Bearer ${await getToken()}`)
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "Channel": "5",
    "Seller": "ABART11",
    "Performancecode": "PDUB01DEC2023B",
    "Area": "SVIP1",
    "autoReduce": false,
    "holdcode": "",
    "Demand": [
      {
        "PriceTypeCode": "A",
        "Quantity": 1,
        "Admits": 1,
        "offerCode": "",
        "qualifierCode": "",
        "entitlement": "",
        "Customer": {}
      }
    ]
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

 const response = await fetch("https://et-apiuat.detsandbox.com/baskets?api_key=3rcbhsn32xmwvu42bmk2pkak", requestOptions)
 console.log(response)
 return response.json()
}

DTCMService.createCustomer = async (participants) => {
  try {

    const result = await ParticipantsModel.bulkCreate(participants, { raw: true })
    
    result.forEach( async (r, i) => {
      result[i] = result[i].dataValues
      const customer = await customerApi(r)
      const basket = await craeteBasket(r)
      await ParticipantsModel.update({ participantsCode: customer.id, basketId: basket.id  }, { where: { id: r.id } })
    })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

DTCMService.getPerformanceMap = async (performance) => {
  return await httpFetchRequest.get(`performances/${performance}/prices?api_key=3rcbhsn32xmwvu42bmk2pkak`)
}

module.exports = DTCMService