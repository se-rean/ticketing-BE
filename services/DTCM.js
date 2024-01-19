const DTCMService = {}
const axios = require('axios');
const httpClientRequest = require('../api-helpers/httpClientRequest');
const httpFetchRequest = require('../api-helpers/httpFetchRequest');
const { ParticipantsModel } = require('../init/mysql-init');
const { getToken } = require('../init/DTCMAccessToken');
let accessToken = null;

DTCMService.createBarcode = async (subscriber) => {
  const data = await httpFetchRequest.get('performances/PDUB01DEC2023B/prices?api_key=3rcbhsn32xmwvu42bmk2pkak')
  return data
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
        "Quantity": 3,
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

    const result = await participants.map(async p => {
      const customer = await customerApi(p)
      const basket = await craeteBasket(p)
      p.participantsCode = customer.id
      p.basketId = basket.id
      console.log(p)
      await ParticipantsModel.create(p)
      return p
    })

    console.log(result)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

DTCMService.getPerformanceMap = async (performance) => {
  return await httpFetchRequest.get(`performances/${performance}/prices?api_key=3rcbhsn32xmwvu42bmk2pkak`)
}

module.exports = DTCMService