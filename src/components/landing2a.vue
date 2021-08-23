<template>
   <Navbar/>
   <section class="main-sec">
      <div class="container">
         <div class="row">
            <div class="col-md-4 wow fadeInLeft">
               <div class="black-bx black-bx-leftbg">
                  <h4>Accept BTC, Mint & Send FUSE G</h4>

                  <div v-for="order in filteredOrders" :key="order._id"  class="trans_ref_outer">
                     <div id="date">{{order.orderDate}}</div>
                     <div >{{order.BTC_order}} BTC</div>
                     <div >{{order.FUSEG_order}} FUSEG</div>
                     <a :href="'https://www.blockchain.com/btc/address/'+order.BTC_Address" target="_blank">BTC Address</a>
                     <a href="" @click.prevent="BuyGold(order.FUSEG_order, order.user, order._id)" class="btn-main">Mint</a>
                  </div>

                  <div>
                     clicking on the blue button you’ll 
                     accept buyer's BTC, mint the 
                     corresponding amount of FUSE G and 
                     send them to the buyer's address.
                     <br>
                  </div>
               </div>
               <div class="black-bx black-bx-leftbg">
                  <h4>Burn FUSEG</h4>
                  <div v-for="order in filteredSellOrders" :key="order._id"  class="trans_ref_outer">
                     <div id="date">{{order.orderDate}}</div>
                     <div >{{order.dollarValue}}</div>
                     <div >{{order.FUSEG_amt}} FUSEG</div>
                     <a :href="'https://rinkeby.etherscan.io/address/'+order.user" target="_blank">User Address</a>
                     <a href="" @click.prevent="BurnGold(order.user, order.FUSEG_amt, order._id)" class="btn-main">Burn</a>
                  </div>

                  <div>
                     clicking on the blue button you’ll 
                     Burn the user's FUSEG.
                     <br>
                  </div>
               </div>
            </div>
            <div class="col-md-8 wow fadeInRight">
               <div class="black-bx ">
                  <div class="nav-blck-bx-outer">
                     <h4>{{tblheading}}</h4>
                     <ul class="nav nav-pills" role="tablist">
                        <li class="nav-item">
                           <a class="nav-link active" data-toggle="pill" href="#home" v-on:click="tblheading='Buy Transactions'">Buy Orders</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" data-toggle="pill" href="#menu1" v-on:click="tblheading='Sell Transactions'">Sell Orders</a>
                        </li>
                     </ul>
                  </div>

                  <!-- Tab panes -->
                  <div class="tab-content">
                     <div id="home" class="container tab-pane active"><br>
                              <div id="transaction_ref"><br>
                                <div v-for="order in filteredApprovedOrders" :key="order._id">
                                    <div class="trans_ref_outer">
                                    <div id="date">{{order.orderDate}}</div>
                                    <div >{{order.FUSEG_amt}} <span class="ml-2">FUSEG</span></div>
                                    <div id="date">{{order.user}}</div>
                                    <div ><a :href="'https://rinkeby.etherscan.io/tx/'+order.tx" target="_blank">view Tx</a></div>
                                    </div>
                                </div>
                            </div>
                     </div>
                     <div id="menu1" class="container tab-pane fade"><br>
                        <div id="transaction_ref">
                            <div v-for="order in filteredBurnedSellOrders" :key="order._id">
                                    <div class="trans_ref_outer">
                                    <div id="date">{{order.orderDate}}</div>
                                    <div >{{order.FUSEG_amt}} <span class="ml-2">FUSEG</span></div>
                                    <div id="date">{{order.user}}</div>
                                    <div ><a :href="'https://rinkeby.etherscan.io/tx/'+order.tx" target="_blank">view Tx</a></div>
                                    </div>
                                </div>
                        </div>
                     </div>
                  </div>
   
               </div>
               <div class="black-bx">
                  <div class="black-bx-single">BTC Received: <strong>3432.43543 BTC</strong></div>
               </div>
               <div class="black-bx">
                  <div class="black-bx-single">Gold sent to vault: <strong>30,453.845 Oz</strong></div>
               </div>
            </div>
         </div>
      </div>
   </section>
   <Footer/>
</template>
<script>
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import axios from "axios";

export default {
  name: 'Landing2',
  components: {
    Navbar,
    Footer
  },


  data() {
      return{
         web3: null,
         provider: null,
         content:"",
         tblheading:"Latest Accepted Transactions Reference",
         orders: [],
         sellOrders: []

         }
   },

   computed: {
      filteredOrders() {
      return this.orders.filter(v => v.status === "Pending");
       },

       filteredApprovedOrders() {
      return this.orders.filter(v => v.status === "Approved");
       },

       filteredSellOrders() {
      return this.sellOrders.filter(v => v.status === "Submitted");
       },

       filteredBurnedSellOrders() {
      return this.sellOrders.filter(v => v.status === "Burned");
       }
   },

   mounted() {
      this.setProvider();
      let endpoint = 'https://vue-ui-test.herokuapp.com/api';
            axios.get(endpoint).then((response) => {
                this.orders = response.data;
            }).catch(error => {
                console.log(error)
            });

            let endpoint2 = 'https://vue-ui-test.herokuapp.com/api/get-sell-orders';
            axios.get(endpoint2).then((response) => {
                this.sellOrders = response.data;
            }).catch(error => {
                console.log(error)
            }); 

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
            } 
         else {
        console.log('Please install MetaMask!');
            }
      },

      BuyGold(fusegAmt, client, id) {
         const data = {provider:this.provider, goldAmt:fusegAmt, buyer:client, orderid:id};
         this.$store.dispatch('BuyGold',data)
         .then(() => {
            let orderIndex = this.orders.findIndex(i => i._id === id);
            this.orders.splice(orderIndex, 1);
         }).catch((err) => {
            console.log(err);
         });

      },

      BurnGold(client, fusegAmt, id) {
         const data = {provider:this.provider, goldAmt:fusegAmt, user:client, orderid:id};
         this.$store.dispatch('BurnGold',data)
         .then(() => {
            let orderIndex = this.sellOrders.findIndex(i => i._id === id);
            this.sellOrders.splice(orderIndex, 1);
         }).catch((err) => {
            console.log(err);
         });

      },




   }
}

</script>
