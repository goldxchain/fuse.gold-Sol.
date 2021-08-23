const updateGoldPrice = (state, payload) => {
  console.log('gold price mutation', payload);
  state.goldPrice = payload;
  state.hxygPrice = payload;
}

const updateBTCPrice = (state, payload) => {
  console.log('gold price mutation', payload);
  state.btcPrice = payload;
}

export {
  updateGoldPrice,
  updateBTCPrice
}