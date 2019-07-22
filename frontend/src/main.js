import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Home from './views/Home.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    router,
    render: h => h(Home),
}).$mount('#app');
