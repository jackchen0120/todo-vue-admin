import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
  	userInfo
  },
	getters: {
		isLogined: state => {
			return state.userInfo.isLogined
		}
	},
	plugins: [createPersistedState({
	    key: 'store',
	    storage: window.localStorage,
	})]
})
