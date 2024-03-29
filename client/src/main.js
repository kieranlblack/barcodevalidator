import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import store from './store';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
    store,
    mode: 'history',
    render(h) { return h(App); },
}).$mount('#app');
