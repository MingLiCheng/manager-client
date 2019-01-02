import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER",
  SET_LOGINACTIVENAME: "SET_LOGINACTIVENAME"
}

const state = {
  isAuthenticated: false,
  user: {},
  LoginActiveName: 'login'
}

const getters = {
  getIsAuthenticated: state => state.isAuthenticated,
  getUser: state => state.user,
  getLoginActiveName: state => state.LoginActiveName
}

const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated) {
    if (isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    }else{
      state.isAuthenticated = false
    }
  },
  [types.SET_USER](state, user){
    if(user){
      state.user = user
    }else{
      state.user = {}
    }
  },
  [types.SET_LOGINACTIVENAME](state, loginActiveName){
    if(loginActiveName){
      state.LoginActiveName = loginActiveName
    }else{
      state.LoginActiveName = 'login'
    }
  }
}

const actions = {
  setIsAuthenticated:({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setLoginActiveName: ({ commit }, LoginActiveName) => {
    commit( types.SET_LOGINACTIVENAME, LoginActiveName)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
