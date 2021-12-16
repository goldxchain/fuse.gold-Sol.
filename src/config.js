require('dotenv').config();

export default {
  GOLD: {
    HOST_URL: 'https://www.goldapi.io/api',
    API_KEY: 'goldapi-5ksukaukheqwiz1-io'
  },
  HXYG: {
    HOST_URL: 'http://localhost:3000',
    API_KEY: process.env.HXYG_API_KEY,
    CONTRACT_ADDRESS: '0xCf1233f2A7957EDeDCda7471eE1C00061232B3cF'
  },
  BTC: {
    HOST_URL: 'https://api.coinbase.com/v2/prices',
    merchantAddress: 'MERCHANT_BTC_ADDRESS'
  },
  endPoints: {
    hxyg: {
      orderRoot: '/order'
    },
    gold: {
      toUSD: '/XAU/USD'
    },
    btc: {
      spot: '/spot'
    },
  },
  params: {
    btc: {
      usd: 'currency=USD'
    }
  }
};
