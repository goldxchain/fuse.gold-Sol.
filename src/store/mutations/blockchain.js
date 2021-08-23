import state from '../state' 
var states= state;

const updateHXYGBalance = (state, payload) => {
  console.log('hxyg balance mutation', payload);
  states.hxygBalance = payload;
}

const updateGoldPrice = (state, payload) => {
  console.log('BTCprice', payload);
  state.GoldPriceChainlink = payload;
}

const updateFP = (state, payload) => {
  console.log('FP', payload);
  state.FP = payload;
}

const updateSFP = (state, payload) => {
  console.log('SFP', payload);
  state.SFP = payload;
}

const updateBTCPrice = (state, payload) => {
  console.log('BTCprice', payload);
  state.BTCPriceChainlink = payload;
}

const updateETHAddress = (state, payload) => {
  console.log('ETH Address yup', payload);
  state.ethAddress = payload;
}

const updateRefBalance = (state, payload) => {
  console.log('Ref Balance', payload);
  state.refBalance = payload;
}

const updateTotalSupply = (state, payload) => {
  console.log('hxyg balance mutation', payload);
  state.totalSupply = payload;
}

const updateTotalClaimedDividends = (state, payload) => {
  console.log('hxyg balance mutation', payload);
  state.totalDividends = payload;
}

const updateLQPoolTotalValue = (state, payload) => {
  console.log('hxyg balance mutation', payload);
  state.totalLQPoolValue = payload;
}

const updateLQPoolBalance = (state, payload) => {
  console.log('hxyg balance mutation', payload);
  state.poolBalance = payload;
}

const updateDividends = (state, payload) => {
  console.log('hxyg balance mutation', payload);
  state.dividends = payload;
}

const updateBurnAmount = (state, payload) => {
  console.log('hxyg balance mutation', payload);
  state.burnAmount = payload;
}

export {
  updateGoldPrice,
  updateBTCPrice,
  updateHXYGBalance,
  updateTotalSupply,
  updateTotalClaimedDividends,
  updateLQPoolTotalValue,
  updateLQPoolBalance,
  updateDividends,
  updateETHAddress,
  updateRefBalance,
  updateBurnAmount,
  updateFP,
  updateSFP
}