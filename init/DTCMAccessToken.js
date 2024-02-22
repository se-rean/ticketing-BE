const axios = require('axios');
const NodeCache = require('node-cache');

const tokenCache = new NodeCache();
const token_url = 'https://et-apiuat.detsandbox.com/adfs/oauth2/token?api_key=8555cns4y3hruga8kbtvaubx';
const TOKEN_KEY = 'access_token';
const TOKEN_REFRESH_INTERVAL = 20 * 60; 

async function getAccessToken() {

  const response = await axios.post(token_url, {
    "client_id": process.env.client_id,
    "client_secret": process.env.client_secret,
    "scope": process.env.scope,
    "grant_type": process.env.grant_type,
    "resource": process.env.resource
  });

  const accessToken = response.data.access_token;
  tokenCache.set(TOKEN_KEY, accessToken, TOKEN_REFRESH_INTERVAL);
  return accessToken;
}

async function refreshAccessToken() {
  const newAccessToken = await getAccessToken();
  return newAccessToken;
}

setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL * 1000);

async function getToken() {
  return tokenCache.get(TOKEN_KEY);
}

module.exports = {
  getAccessToken,
  refreshAccessToken,
  getToken
};
