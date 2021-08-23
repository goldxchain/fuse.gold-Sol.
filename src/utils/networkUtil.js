import config from '../config';

function getLoggedInUser(){
  return JSON.parse(localStorage.getItem('user'));
}

function getToken(){
  return localStorage.getItem('token');
}


function getOrgConfig(){
  return config[getLoggedInUser().orgName];
}

function getHXYAPIHost(){
  return config.HXYG.HOST_URL;
}

function getHXYAPIKey(){
  return config.HXYG.API_KEY;
}

function getGoldAPIHost(){
  return config.GOLD.HOST_URL;
}

function getGoldAPIKey(){
  return config.GOLD.API_KEY;
}

function getBTCAPIHost(){
  return config.BTC.HOST_URL;
}

export default {
  getLoggedInUser,
  getToken,
  getOrgConfig,
  getGoldAPIHost,
  getHXYAPIHost,
  getHXYAPIKey,
  getGoldAPIKey,
  getBTCAPIHost
}