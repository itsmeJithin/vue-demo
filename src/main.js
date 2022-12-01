import Vue from 'vue'
import App from './App.vue'
import store from "@/store";
import router from '@/router';

Vue.config.productionTip = false;

function initialiseVueApp() {

  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app');
}

/**
 * Fetching available filters from api before initialising vue app
 */
store.dispatch("filterStore/fetchAvailableFilters").then(() => {
  initialiseVueApp();
}).catch(() => {
  initialiseVueApp();
});