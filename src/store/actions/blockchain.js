import blockchainService from '../../services/blockchainService';
import axios from "axios";

const getBTCPrice = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getBTCPrice(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('BTC Price', resp.data);
        commit('updateBTCPrice', Number(resp.data/100000000).toFixed(2));
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getFeePercent = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getFeePercent(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('FP', resp.data);
        commit('updateFP', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getSellFeePercent = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getSellFeePercent(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('SFP', resp.data);
        commit('updateSFP', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getRefBalance = ({commit}, data) => {
  return new Promise((resolve, reject) => {
    blockchainService.getRefBalance(data)
    .then((resp) => {
      if(resp.success) {
        console.log('getRefBalance', resp.data);
        commit('updateRefBalance', Number(resp.data/1000000000000000000).toFixed(2));
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}


const getGoldPrice = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getGoldPrice(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('Gold Price', resp.data);
        commit('updateGoldPrice', resp.data/100000000);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}
/*
const getHXYGBalance = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getHXYGBalance(provider)
    .then(async (resp) => {
      if(resp.success) {
        console.log('Account balance:', resp.data);
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        commit('updateETHAddress', accounts[0]);
        commit('updateHXYGBalance', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp);
        reject(resp);
      }
    });
  });
}

const getAddress = async({commit}, provider) => {
        const web3 = await new Web3(provider);
        const accounts =  await web3.eth.getAccounts();
        commit('updateETHAddress', accounts[0]);
        console.log("this is"+accounts[0]);
      }

*/

const getClaimedDividends = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getClaimedDividends(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('Dividends claimed', resp.data);
        commit('updateTotalClaimedDividends', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getTotalSupply = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getTotalSupply(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('Total supply retrived', resp.data);
        commit('updateTotalSupply', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getLQPoolTotalValue = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getLQPoolTotalValue(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('getLQPoolTotalValue Retrived', resp.data);
        commit('updateLQPoolTotalValue', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getLQPoolBalance = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getLQPoolBalance(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('retrived', resp.data);
        commit('updateLQPoolBalance', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const calculateDividends = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.calculateDividends(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('etrived', resp.data);
        commit('updateDividends', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const getTotalBurnt = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.getTotalBurnt(provider)
    .then((resp) => {
      if(resp.success) {
        console.log('etrived', resp.data);
        commit('updateBurnAmount', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const claimDividends = ({commit}, provider) => {
  return new Promise((resolve, reject) => {
    blockchainService.claimDividends(provider)
    .then((resp) => {
      if(resp.success) {
        commit();
        console.log('etrived', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

function updateOrder(id, txhash) {
            let endpoint = `https://vue-ui-test.herokuapp.com/api/update-order/${id}&${txhash}`;
            axios.post(endpoint,)
            .then((response) => {
                console.log(response)
            }).catch((err) => {
                alert(err)
            });
        }

function updateSellOrder(id, txhash) {
            let endpoint = `https://vue-ui-test.herokuapp.com/api/update-sell-order/${id}&${txhash}`;
            axios.post(endpoint,)
            .then((response) => {
                console.log(response)
            }).catch((err) => {
                alert(err)
            });
        }


const BuyGold = ({commit}, data) => {
  return new Promise((resolve, reject) => {
    blockchainService.BuyGold(data)
    .then((resp) => {
      if(resp.success) {
        commit('updateBurnAmount', "checkBuyGoldToFixThis");
        updateOrder(data.orderid, resp.data.transactionHash);
        console.log('etrived', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

const BurnGold = ({commit}, data) => {
  return new Promise((resolve, reject) => {
    blockchainService.BurnGold(data)
    .then((resp) => {
      if(resp.success) {
        commit('updateBurnAmount', data.goldAmt);
        updateSellOrder(data.orderid, resp.data.transactionHash, );
        console.log('etrived', resp.data);
        resolve(resp.data);
      }
      else {
        console.log('Call failed', resp.error);
        reject(resp.error);
      }
    });
  });
}

export {
  //getAddress,
  BurnGold,
  BuyGold,
  getGoldPrice,
  getBTCPrice,
  getFeePercent,
  getSellFeePercent,
  //getHXYGBalance,
  getClaimedDividends,
  getTotalSupply,
  getLQPoolTotalValue,
  getLQPoolBalance,
  calculateDividends,
  claimDividends,
  getTotalBurnt,
  getRefBalance
}