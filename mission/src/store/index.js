import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import cartModule from './modules/cartModule';
import orderModule from './modules/orderModule';
import userModule from './modules/userModule';

export default createStore({
  /* ******** state { ******** */
  state: {},
  /* ******** } state 끝 ******** */

  /* ******** mutations { ******** */
  mutations: {},
  /* ******** } mutations 끝 ******** */

  /* ******** actions { ******** */
  actions: {},
  /* ******** } actions 끝 ******** */

  /* ******** getters { ******** */
  getters: {},
  /* ******** } getters 끝 ******** */

  /* ******** modules { ******** */
  modules: {
    cartModule,
    orderModule,
    userModule,
  },
  /* ******** } modules 끝 ******** */

  plugins: [
    createPersistedState({
      paths: ['cartModule', 'orderModule', 'userModule'],
    }),
  ],
});
