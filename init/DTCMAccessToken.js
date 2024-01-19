// tokenManager.js
const axios = require('axios');
const NodeCache = require('node-cache');

const tokenCache = new NodeCache();
const token_url = 'https://et-apiuat.detsandbox.com/adfs/oauth2/token?api_key=8555cns4y3hruga8kbtvaubx';
const TOKEN_KEY = 'access_token';
const TOKEN_REFRESH_INTERVAL = 20 * 60; // 20 minutes in seconds

async function getAccessToken() {

  const response = await axios.post(token_url, {
    "client_id": "ASAEV1",
    "client_secret": "XOG0O6l_Kmi3xMp7QXepG67Ecm3VU6TNgim3IcD_",
    "scope": "profile",
    "grant_type": "client_credentials",
    "resource": "https://et-apiuat.detsandbox.com"
  });

  const accessToken = response.data.access_token;
  tokenCache.set(TOKEN_KEY, accessToken, TOKEN_REFRESH_INTERVAL);
  console.log(tokenCache.get('access_token'))
  return accessToken;
}

async function refreshAccessToken() {
  const newAccessToken = await getAccessToken();
  return newAccessToken;
}

// Set up a timer to refresh the token every 20 minutes
setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL * 1000);

async function getToken() {
  console.log('get token',tokenCache.get(TOKEN_KEY))
  const response = await axios.post(token_url, {
    "client_id": "ASAEV1",
    "client_secret": "XOG0O6l_Kmi3xMp7QXepG67Ecm3VU6TNgim3IcD_",
    "scope": "profile",
    "grant_type": "client_credentials",
    "resource": "https://et-apiuat.detsandbox.com"
  });

  const accessToken = response.data.access_token;
  tokenCache.set(TOKEN_KEY, accessToken, TOKEN_REFRESH_INTERVAL);
  // console.log(tokenCache.get('access_token'))
  return accessToken;
  // return tokenCache.get(TOKEN_KEY);
}

module.exports = {
  getAccessToken,
  refreshAccessToken,
  getToken
};
