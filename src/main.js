import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './global.css';
import './responsive.css';
import router from './router';
import store from './store';

const storeInit = createStore(store);

const app = createApp(App);
app.use(router);
app.use(storeInit);
app.mount('#app');
