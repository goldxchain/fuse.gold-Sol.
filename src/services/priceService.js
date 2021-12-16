import requestHandler from '../utils/requestHandler';
import networkUtil from '../utils/networkUtil';
import config from '../config';

async function getGoldPrice(){
  let result = {};
  try {
    console.log('Calling goldGetPrice');
    let reqURL = config.endPoints.gold.toUSD;
    let resp = await requestHandler.getRequest(networkUtil.getGoldAPIHost(), null, config.GOLD.API_KEY, reqURL, null);

    console.log('Gold price response: ', resp);
    
    result = resp;
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}

async function getBTCPrice(){
  let result = {};
  try {
    console.log('Calling goldGetPrice');
    let reqURL = config.endPoints.btc.spot;
    let reqParams = config.params.btc.usd;
    let resp = await requestHandler.getRequest(networkUtil.getBTCAPIHost(), null, null, reqURL, reqParams);

    console.log('Gold price response: ', resp);
    
    result = resp;
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}

export default {
  getGoldPrice,
  getBTCPrice
}