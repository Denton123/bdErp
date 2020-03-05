import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemKey: '1',
    breadcrumb: ''
  },
  mutations: {
    setItemKey(state, payload) {
      state.itemKey = payload
    },
    setBreadcrumb(state, payload) {
      state.breadcrumb = payload
    }
  },
  actions: {

  },
})
