const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
  user: {
    type: String
  },
  BTC_order: {
    type: String
  },
  FUSEG_order: {
    type: String
  },
  status: {
    type: String
  },
  tx: {
    type: String
  },
  BTC_Address:{
    type: String
  },
  orderDate:{
    type: String
  }
}, {
    collection: 'orderbook'
  });


let sellOrdersSchema = new Schema({
  user: {
    type: String
  },
  FUSEG_amt: {
    type: String
  },
  tx: {
    type: String
  },
  orderDate:{
    type: String
  },
  status: {
    type: String
  },
  dollarValue: {
    type: String
  }

}, {
    collection: 'sellOrder'
  })

const sellOrders = mongoose.model('sellOrder', sellOrdersSchema)
const buyOrders = mongoose.model('order', orderSchema)
module.exports = {sellOrders, buyOrders}