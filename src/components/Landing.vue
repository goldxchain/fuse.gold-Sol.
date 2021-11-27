<template>
    <Navbar/>
    <Modal/>
    <section class="main-sec wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.20s">
        <div class="container">
            <div class="row ">
                <div class="col-lg-4 flex-column justify-content-between">
                    <!-- <div class="black-bx black-bx-main">
                        <h4>BTC Wallet</h4>
                        <div>BTC in wallet: <strong>2.138345</strong></div>
                        <img src="../assets/btc-bck.png">
                    </div> -->
                    <div class="black-bx black-bx-main">
                        <h4>Sell FuseG</h4>
                                <input v-model="sellOrderItem.FUSEG_amt" class="form-control" id="burnAmt" type="text" name="" placeholder="Enter FUSEG Amount"/><br>
                                <h6><strong><span id="dollarValue">${{Number((GoldPriceChainlink*0.0352)*(sellOrderItem.FUSEG_amt-(sellOrderItem.FUSEG_amt*(SFP/10000)))).toFixed(2)}}</span><br/></strong></h6>
                                <a href="" @click.prevent="placeSellOrder(Number((GoldPriceChainlink*0.0352)*sellOrderItem.FUSEG_amt))" class="btn-main">Sell FUSE G</a>

                        <img src="../assets/btc-bck.png">
                    </div>
                    <div class="black-bx black-bx-main">
                        <h4>FUSE G Wallet</h4>
                        <div>FUSE G in wallet: <strong>{{walletBallanceInWei}}</strong></div>
                        <img src="../assets/hxy-bck.png">
                    </div>
                   
                </div>
                <div class="col-lg-4">
                   <div class="black-bx">
                        <h4>Exchange</h4>
                        <div class="black-bx-cntnt">
                            Every Fuse.Gold (FUSE G) token is backed by 1 gram of allocated gold. <br>
                            Use this tool to exchange BTC to FUSE G.
                            <div class="input-outer">
                                <input v-model="orderItem.BTC_order" id="amount" class="form-control" type="text" name="" placeholder="Enter BTC Amount">
                                <input v-model="orderItem.BTC_Address" id="amount" class="form-control" type="text" name="" placeholder="Enter Your BTC Address">
                            </div>
                             You'll receive <strong class="yellow"><span id="fuseG">{{(Number((BTCPriceChainlink/(GoldPriceChainlink*0.0352))*orderItem.BTC_order)-(((BTCPriceChainlink/(GoldPriceChainlink*0.0352))*orderItem.BTC_order)*(FP/10000))).toFixed(0) }}</span> FUSE G</strong><br><br>
                             <div v-for="order in orders" :key="order._id" class="text-center">
                              <div v-if="order.status == 'Approved'" class="text-center"><a :href="transactionURL+order.tx" target="_blank" class="yellow text-center">Approved Order(Click To See Transaction)</a></div>
                              <div v-if="order.status == 'Pending'" class="text-center">One Transaction Pending</div>  
                              
                            </div>
                        </div>
                        <a href="" @click.prevent="placeOrder((Number(BTCPriceChainlink/(GoldPriceChainlink*0.0352))*orderItem.BTC_order).toFixed(0))" class="btn-main">Exchange</a>
                        <a href="" @click="getOrders">Check Order</a>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="black-bx">
                        <div class="black-bx-single">Ref : 
                        </div>
                        <!-- <div class="tooltipout">
                            <i class="fas fa-question-circle"></i>
                            <span class="tooltiptext">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua
                            </span>
                        </div> -->
                    </div>
                     <div class="black-bx ">
                        <div class="black-bx-single">Your Ref :<strong>{{refBalance}} FUSEG</strong></div>
                    </div>
                    <div class="black-bx">
                            <h5><strong>Sell Transactions</strong></h5>
                        <div class="black-bx-single">
                            <div id="transaction_ref"  style="height: 140px;" class="container tab-pane" ><br>
                                <div v-for="order in filteredOrders" :key="order._id">
                                    <div class="trans_ref_outer">
                                    <div id="date">{{order.orderDate}}</div>
                                    <div >{{order.FUSEG_amt}} <span class="ml-2">FUSEG</span></div>
                                    <div ><a :href="'https://rinkeby.etherscan.io/tx/'+order.tx" target="_blank">view Tx</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="black-bx">
                        <div class="black-bx-single">Your pool balance: <strong>{{poolBalanceInWei}} 0z</strong></div>
                    </div>
                    <div class="black-bx">
                        <div class="black-bx-single">Burned FUSE G token: <strong>{{burntTokensInWei}} FUSE G</strong></div>
                    </div>



                </div>
            </div>
            <div class="row" style="margin-top: -16%;">
                <div class="col-lg-4">
                    <div class="black-bx">
                        <h4>Need BTC?</h4>
                        <div class="black-bx-cntnt">
                            Use the the below window to purchase
                            BTC with more than 200 different 
                            Cryptocurrencies.
                            <div class="input-outer">
                                <div class="option-group">
                                    <div class="dropdown">
                                        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                                        <img src="../assets/icons/com-icon.png" alt="icons" class="from-icon">
                                        ETH 
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">
                                            <img src="../assets/icons/com-icon.png" alt="icons">
                                            ETH 
                                            </a>
                                            <a class="dropdown-item" href="#">
                                            <img src="../assets/icons/com-icon.png" alt="icons">
                                            ETH 
                                            </a>
                                            <a class="dropdown-item" href="#">
                                            <img src="../assets/icons/com-icon.png" alt="icons">
                                            ETH 
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <input class="form-control" type="text" name="" placeholder="Enter ETH Amount">
                            </div>
                            <div>You'll receive: <strong class="yellow">0.000 BTC</strong></div>
                        </div>
                        <a href="" class="btn-main">Buy BTC</a>
                        <div class="tooltipout">
                            <i class="fas fa-question-circle"></i>
                            <span class="tooltiptext">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 ">
                    
                    <div class="black-bx">
                        <div class="black-bx-single">BTC Price <span><strong> ${{BTCPriceChainlink}} </strong></span></div>
                    </div>
                     <div class="black-bx">
                        <div class="black-bx-single">Gold Spot Price(Oz) <span><strong>${{GoldPriceChainlink}}</strong></span></div>
                    </div>
                     <div class="black-bx">
                        <div class="black-bx-single">FUSE G Price<span><strong>$60.79 = $1,890 per Oz</strong></span></div>
                    </div>
                     <div class="black-bx">
                        <div class="black-bx-single">Last Gold Audit: <span><strong>2 days ago</strong><strong> check</strong></span></div>
                    </div>  
                </div>
            </div>
            <div class="info">
                <img src="../assets/info.png">
               The liquidity Gold pool you are entering by buying FUSE is held and insured Audited under the holdings company Fuse.Gold holdings LTD
            </div>
        </div>
    </section>
    <Footer/>
</template>
<script>
import { mapGetters } from 'vuex';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import Modal from './modals/modal.vue';
import config from '../config';
import axios from "axios";

export default {
  name: 'Landing',
  components: {
    Navbar,
    Footer,
    Modal
  },
  async mounted () {
    await this.setProvider();
      let endpoint = 'https://vue-app-djnd6.ondigitalocean.app/api/get-sell-orders';
            axios.get(endpoint).then((response) => {
                this.sellOrders = response.data;
            }).catch(error => {
                console.log(error)
            });    
    this.getAddress();
    this.getGoldPrice();
    this.getBTCPrice();
    this.getSellFeePercent();
    this.getFeePercent();
    //this.getFUSEG_Balance();
    //this.getTotalBurnt();
   },
  data() {
    return {
      web3: null,
      provider: null,
      content:'',
      poolBalanceInWei: 0,
      burntTokensInWei: 0,
      walletBallanceInWei: 3454.34564,
      dollarAmt:'',
      btcAmount: 0,
      ethAddress: '',
      merchantBTCAddress: config.BTC.merchantAddress,
      transactionURL: 'https://rinkeby.etherscan.io/tx/',
      orders: [],
      sellOrders: [],
      orderItem: {
                   user: '',
                   BTC_order: '',
                   BTC_Address: '',
                   FUSEG_order: '',
                   tx: '',
                   orderDate: ''
                },
      sellOrderItem: {
                        user: '',
                        FUSEG_amt: '',
                        tx: '',
                        orderDate: '',
                        status: '',
                        dollarValue: ''
                     }
    }
  },

  computed: {
    ...mapGetters(
      [
        'BTCPriceChainlink',
        'GoldPriceChainlink',
        'refBalance',
        'FP',
        'SFP'
      ]
    ),

    filteredOrders() {
      return this.sellOrders.filter(v => v.status === "Burned");
       }

  },
  methods: {
    async setProvider() {
      const provider = await detectEthereumProvider();

      if (provider) {
        this.provider = provider;
        this.web3 = new Web3(provider);
        console.log('provider', this.provider);
        this.provider.enable();
        console.log('accounts', await this.web3.eth.getAccounts());
        console.log('MetaMask provider retrived!');
      } else {
        console.log('Please install MetaMask!');
      }
    },

    getFUSEG_Balance() {
      console.log('this.provider', this.provider);
      this.$store.dispatch('getBalance', this.provider)
      .then(() => {
        this.walletBallanceInWei = this.web3.utils.fromWei(this.$store.getters.hxygBalance, 'ether');
      }).catch(() => {
        
      });
    },
    /* checkOrderStatus(e) {
      e.preventDefault();
      const data = {order_id: this.orderId};
      this.$store.dispatch('checkOrderStatus', data)
      .then((resp) => {
        console.log('checkOrderStatus', resp.order);
        this.orderStatus = resp.order.status;
        this.txId = resp.order.transaction_hash;
        this.transactionURL = 'https://rinkeby.etherscan.io/tx/' + this.txId;
      }).catch(() => {

      });
    }, */
   getGoldPrice() {
      this.$store.dispatch('getGoldPrice', this.provider)
      .then(() => {

      }).catch(() => {

      });
    },
    
    getBTCPrice() {
      this.$store.dispatch('getBTCPrice',this.provider)
      .then(() => {

      }).catch(() => {
        
      });
    },
    async getAddress() {
        const web3 = await new Web3(this.provider);
        const accounts =  await web3.eth.getAccounts();
        this.ethAddress = accounts[0];
        this.getRefBalance();
      },

    getOrders(e) {
        e.preventDefault();
        console.log("fetching order")
      let endpoint = `https://vue-app-djnd6.ondigitalocean.app/api/check-order`;
            axios.get(endpoint, {params:{address: this.ethAddress}}).then((response) => {
                this.orders = response.data;
            }).catch(error => {
                console.log(error)
            });
    },

    BuyGold(e) {
        e.preventDefault();
        const data = {provider:this.provider, goldAmt:document.getElementById("fuseG").innerHTML};
      this.$store.dispatch('BuyGold',data)
      .then(() => {

      }).catch(() => {
        
      });
    },

    BurnGold(e) {
        e.preventDefault();
        const data = {provider:this.provider, goldAmt:document.getElementById("burnAmt").value, user:this.ethAddress};
      this.$store.dispatch('BurnGold',data)
      .then(() => {
            this.dollarAmt='';
      }).catch(() => {
        
      });
    },

    getRefBalance() {
        const data = {provider:this.provider, user:this.ethAddress};
      this.$store.dispatch('getRefBalance',data)
      .then(() => {

        }).catch(() => {
        
         });
        },

    getTotalSupply() {
      this.$store.dispatch('getTotalSupply', this.provider)
      .then(() => {

      }).catch(() => {
        
      });
    },

        getFeePercent() {
      this.$store.dispatch('getFeePercent', this.provider)
      .then(() => {

      }).catch(() => {
        
      });
    },

        getSellFeePercent() {
      this.$store.dispatch('getSellFeePercent', this.provider)
      .then(() => {

      }).catch(() => {
        
      });
    },

    getTotalBurnt() {
      this.$store.dispatch('getTotalBurnt', this.provider)
      .then(() => {
        this.burntTokensInWei = this.web3.utils.fromWei(this.$store.getters.burnAmount, 'ether');
      }).catch(() => {
        
      });
    },

    /* orderCreate(e) {
      e.preventDefault();
      const data = {
        gold_amount: this.goldAmount.toString(),
        btc_amount: this.btcAmount.toString(),
        eth_address: this.ethAddress,
        btc_address: this.btcAddress
      };
      this.orderCreation = 'pending';
      this.error = false;
      this.$store.dispatch('orderCreate', data)
      .then(resp => {
        console.log('create response', resp);
        this.orderId = resp.order._id
        this.orderCreation = 'created';
      }).catch(err => {
        console.log('create err', err);
        this.error = true;
        this.errorMessage = err.response.data.payload;
        this.orderCreation = '';
      });
    } */

      placeOrder(amount) {
                let endpoint = 'https://vue-app-djnd6.ondigitalocean.app/api/create-order';
                this.orderItem.user= this.ethAddress;
                this.orderItem.status= 'Pending'; 
                var day= new Date();
                this.orderItem.tx= '';
                var year= (day.getFullYear()).toString();
                this.orderItem.orderDate= day.getDate()+'/'+(day.getMonth()+1)+'/'+year.slice(year.length - 2);
                this.orderItem.FUSEG_order= amount;
                axios.post(endpoint, this.orderItem).then(() => {
                  this.orderItem = {
                   user: '',
                   BTC_order: '',
                   FUSEG_order: '',
                   BTC_Address: '',
                   orderDate: '',
                  }
                  alert('order created!')
                }).catch((err) => {
                    alert(err)
                });
            },

      placeSellOrder(amount) {
                let endpoint = 'https://vue-app-djnd6.ondigitalocean.app/api/create-sell-order';
                this.sellOrderItem.user= this.ethAddress;
                this.sellOrderItem.status= 'Submitted'; 
                var day= new Date();
                this.sellOrderItem.tx= '';
                var year= (day.getFullYear()).toString();
                this.sellOrderItem.orderDate= day.getDate()+'/'+(day.getMonth()+1)+'/'+year.slice(year.length - 2);
                this.sellOrderItem.dollarValue= amount;
                axios.post(endpoint, this.sellOrderItem).then(() => {
                  this.sellOrderItem = {
                   user: '',
                   FUSEG_amt: '',
                   dollarValue: '',
                   orderDate: '',
                  }
                  alert('order created!')
                }).catch((err) => {
                    alert(err)
                });
            }

  }
}
</script>

