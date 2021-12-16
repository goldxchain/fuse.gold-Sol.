import businessService from '../../services/businessService';

// eslint-disable-next-line no-empty-pattern
const orderCreate = ({}, data) => {
  return new Promise((resolve, reject) => {
    businessService.orderCreate(data)
    .then((resp) => {
      if(resp.data) {
        console.log('Order created successfully', resp.data);
        resolve(resp.data.payload);
      }
      else {
        console.log('Call failed', resp);
        reject(resp.error);
      }
    });
  });
}

// eslint-disable-next-line no-empty-pattern
const checkOrderStatus = ({}, data) => {
  return new Promise((resolve, reject) => {
    businessService.checkOrderStatus(data)
    .then((resp) => {
      if(resp.data) {
        console.log('Order created successfully', resp.data);
        resolve(resp.data.payload);
      }
      else {
        console.log('Call failed', resp);
        reject(resp.error);
      }
    });
  });
}

export {
  orderCreate,
  checkOrderStatus
}