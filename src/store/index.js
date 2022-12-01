import Vue from 'vue';
import Vuex from 'vuex';
import filterStore from "./FilterStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    filterStore
  }
})