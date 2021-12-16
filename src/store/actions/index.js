import { getGoldPrice, getBTCPrice, BuyGold, BurnGold, getRefBalance, getFeePercent, getSellFeePercent} from './blockchain';
import { orderCreate, checkOrderStatus } from './business';
import {
  getClaimedDividends,
  getTotalSupply, getLQPoolTotalValue,
  getLQPoolBalance, calculateDividends, 
  claimDividends, getTotalBurnt
} from './blockchain';

export default { 
  BurnGold,
  BuyGold,
  getGoldPrice,
  getBTCPrice,
  orderCreate,
  checkOrderStatus,
  getClaimedDividends,
  getTotalSupply,
  getLQPoolTotalValue,
  getLQPoolBalance,
  calculateDividends,
  claimDividends,
  getTotalBurnt,
  getRefBalance,
  getSellFeePercent,
  getFeePercent
};