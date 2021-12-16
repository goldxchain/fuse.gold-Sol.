import requestHandler from '../utils/requestHandler';
import networkUtil from '../utils/networkUtil';
import config from '../config';

async function orderCreate(data){
  let result = {};
  try{
    console.log('Calling orderCreate');
    let reqURL = config.endPoints.hxyg.orderRoot;
    let resp = await requestHandler.postRequest(networkUtil.getHXYAPIHost(), null, null, reqURL, data);

    console.log('Create response: ',resp);
    
    result = { success: true, data: resp.data };
  }catch(e){
    result = { success: false, error:e }
  }
  return result;
}

async function checkOrderStatus(data){
  let result = {};
  try{
    console.log('Calling orderCreate');
    let reqURL = config.endPoints.hxyg.orderRoot + '/' + data.order_id;
    let resp = await requestHandler.getRequest(networkUtil.getHXYAPIHost(), null, null, reqURL, data);

    console.log('Create response: ',resp);
    
    result = { success: true, data: resp.data };
  }catch(e){
    result = { success: false, error:e }
  }
  return result;
}

export default {
  orderCreate,
  checkOrderStatus
}