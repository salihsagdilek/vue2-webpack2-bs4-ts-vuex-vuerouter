import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

import {state, mutations, localStoragePlugin} from './default';


const store = new Vuex.Store({
  state,
  mutations,
  plugins: [localStoragePlugin],
  modules: {}
});

export {
  store
}