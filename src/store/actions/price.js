/*
import priceService from '../../services/priceService';

const getGoldPrice = ({commit}) => {
  return new Promise((resolve, reject) => {
    priceService.getGoldPrice()
    .then((resp) => {
      if(resp.data) {
        commit('updateGoldPrice', resp.data.price);
        resolve(resp.data.price);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getBTCPrice = ({commit}) => {
  return new Promise((resolve, reject) => {
    priceService.getBTCPrice()
    .then((resp) => {
      if(resp.data) {
        commit('updateBTCPrice', resp.data.data.amount);
        resolve(resp.data.price);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

export {
  getGoldPrice,
  getBTCPrice
}
*/