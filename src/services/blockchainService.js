import Web3 from 'web3';
import hxyg_contract_compiled from '../utils/contracts/HXYG.json';
import config from '../config';

var FUSEG_ABI= [{"inputs":[{"internalType":"address payable","name":"teamAddress","type":"address"},{"internalType":"uint256","name":"feesPercentage","type":"uint256"},{"internalType":"uint256","name":"refFeesPercentage","type":"uint256"},{"internalType":"uint256","name":"sellFeesPercentage","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"client","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"int256","name":"goldPrice","type":"int256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"GoldBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"client","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"int256","name":"goldPrice","type":"int256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"GoldWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_totalValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"client","type":"address"},{"internalType":"address payable","name":"ref","type":"address"},{"internalType":"uint256","name":"initAmount","type":"uint256"}],"name":"buyGold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBTCPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFeesPercentage","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGoldPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"client","type":"address"}],"name":"getRefBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRefFeesPercentage","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSFP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSellFeesPercentage","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTakeFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTeamAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBurnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPercentage","type":"uint256"}],"name":"updateFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPercentage","type":"uint256"}],"name":"updateRefFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPercentage","type":"uint256"}],"name":"updateSellFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"value","type":"bool"}],"name":"updateTakeFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newAddress","type":"address"}],"name":"updateTeamAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newAddress","type":"address"},{"internalType":"bool","name":"status","type":"bool"}],"name":"updateWhiteList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"client","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawGold","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var FUSEG_ADDRESS= "0xeaBC00b9c5b0F23569b9d98329E93B2B9F9Ac586" ;

async function getHXYGBalance(provider){
  try {
    console.log('Calling getHXYGBalance');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    console.log('accounts', accounts);
    let resp = await hxyg_contract.methods.balanceOf(accounts[0]).call();

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error:e}
  }
}

async function getBTCPrice(provider){
  try {
    console.log('Calling getBTCPrice');
    const web3 = new Web3(provider);
    const FUSEG_CONTRACT = await new web3.eth.Contract(FUSEG_ABI, FUSEG_ADDRESS);
    let resp = await FUSEG_CONTRACT.methods.getBTCPrice().call();

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error:e}
  }
}

async function getSellFeePercent(provider){
  try {
    console.log('Calling getSellFeePercent');
    const web3 = new Web3(provider);
    const FUSEG_CONTRACT = await new web3.eth.Contract(FUSEG_ABI, FUSEG_ADDRESS);
    let resp = await FUSEG_CONTRACT.methods.getSFP().call();

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error:e}
  }
}

async function getFeePercent(provider){
  try {
    console.log('Calling getFeePercent');
    const web3 = new Web3(provider);
    const FUSEG_CONTRACT = await new web3.eth.Contract(FUSEG_ABI, FUSEG_ADDRESS);
    let resp = await FUSEG_CONTRACT.methods.getFP().call();

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error:e}
  }
}


async function getRefBalance(data){
  try {
    console.log('Calling getBTCPrice');
    const web3 = new Web3(data.provider);
    const FUSEG_CONTRACT = await new web3.eth.Contract(FUSEG_ABI, FUSEG_ADDRESS);
    let resp = await FUSEG_CONTRACT.methods.getRefBalance(data.user).call();

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error:e}
  }
}

async function getGoldPrice(provider){
  try {
    console.log('Calling getGoldPrice');
    const web3 = new Web3(provider);
    const FUSEG_CONTRACT = await new web3.eth.Contract(FUSEG_ABI, FUSEG_ADDRESS);
    let resp = await FUSEG_CONTRACT.methods.getGoldPrice().call();

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error:e}
  }
}

async function getClaimedDividends(provider){
  try {
    console.log('Calling getClaimedDividends');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    let resp = await hxyg_contract.methods.getClaimedDividends().call();

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    console.log('e:', e);
    return {success: false, error:e}
  }
}

async function getTotalSupply(provider){
  try {
    console.log('Calling getTotalSupply');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    let resp = await hxyg_contract.methods.totalSupply().call();
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error:e}
  }
}

async function getFeesPercentage(provider){
  try {
    console.log('Calling getFeesPercentage');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    let resp = await hxyg_contract.methods.getFeesPercentage().call();
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error: e};
  }
}

async function getLQPoolTotalValue(provider){
  try {
    console.log('Calling getLQPoolTotalValue');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    let resp = await hxyg_contract.methods.getLQPoolTotalValue().call();
    console.log('getLQPoolTotalValue response:', resp);
    return {success: true, data: resp};
  } catch(e) {
    console.log('getLQPoolTotalValue error:', e);
    return {success: false, error: e};
  }
}

async function getLQPoolBalance(provider){
  try {
    console.log('Calling getLQPoolBalance');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    console.log('getLQPoolBalance accounts[0]', accounts[0]);
    let resp = await hxyg_contract.methods.getLQPoolBalance(accounts[0]).call();
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error: e}
  }
}

async function getLastDividendsClaimDate(provider){
  try {
    console.log('Calling getLastDividendsClaimDate');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    let resp = await hxyg_contract.methods.getLastDividendsClaimDate(accounts[0]).call();
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error: e}
  }
}

async function getTotalBurnt(provider){
  try {
    console.log('Calling getTotalBurnt');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    let resp = await hxyg_contract.methods.getTotalBurnt().call();
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    return {success: false, error: e}
  }
}

async function addToLqPool(provider, amount){
  let result = {};
  try {
    console.log('Calling addToLqPool');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    await hxyg_contract.methods.addToLqPool(amount).send({
      from: accounts[0],
      gas: '90000'
    });

  } catch(e) {
    result = {success: false, error: e}
  }
  return result;
}

async function withdrawFromLqPool(provider, amount){
  let result = {};
  try {
    console.log('Calling withdrawFromLqPool');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    let resp = await hxyg_contract.methods.withdrawFromLqPool(amount).send({
      from: accounts[0],
      gas: '90000'
    });
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}

async function leaveLqPool(provider){
  let result = {};
  try {
    console.log('Calling leaveLqPool');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    let resp = await hxyg_contract.methods.leaveLqPool().call();
    
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}

async function claimDividends(provider){
  let result = {};
  try {
    console.log('Calling claimDividends');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    const resp = await hxyg_contract.methods.claimDividends().send({
      from: accounts[0],
      gas: '90000'
    });

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}


async function BuyGold(data){
  let result = {};
  try {
    console.log('Calling BuyGold');
    const web3 = new Web3(data.provider);
    const FUSEG_CONTRACT = await new web3.eth.Contract(FUSEG_ABI, FUSEG_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    let amt = data.goldAmt;
    const resp = await FUSEG_CONTRACT.methods.buyGold(data.buyer,'0xdB0199F8d4CAb8aECb3F39fc74Be6064a852E4Ba', web3.utils.toWei(amt.toString())).send({
      from: accounts[0],
      gas: '900000'
    });

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}

async function BurnGold(data){
  let result = {};
  try {
    console.log('Calling withdrawGold');
    const web3 = new Web3(data.provider);
    const FUSEG_CONTRACT = await new web3.eth.Contract(FUSEG_ABI, FUSEG_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    let amt = data.goldAmt;
    const resp = await FUSEG_CONTRACT.methods.withdrawGold(data.user, web3.utils.toWei(amt.toString())).send({
      from: accounts[0],
      gas: '900000'
    });

    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}


async function calculateDividends(provider){
  let result = {};
  try {
    console.log('Calling calculateDividends');
    const web3 = new Web3(provider);
    const hxyg_contract = await new web3.eth.Contract(hxyg_contract_compiled.abi, config.HXYG.CONTRACT_ADDRESS);
    let resp = await hxyg_contract.methods.calculateDividends().call();
    console.log('Responce:', resp);
    return {success: true, data: resp};
  } catch(e) {
    result = {success: false, error:e}
  }
  return result;
}

export default {
  BurnGold,
  BuyGold,
  getGoldPrice,
  getBTCPrice,
  getHXYGBalance,
  getClaimedDividends,
  getTotalSupply,
  getFeesPercentage,
  getLQPoolBalance,
  getLastDividendsClaimDate,
  getLQPoolTotalValue,
  getTotalBurnt,
  addToLqPool,
  withdrawFromLqPool,
  leaveLqPool,
  claimDividends,
  calculateDividends,
  getRefBalance,
  getFeePercent,
  getSellFeePercent
}