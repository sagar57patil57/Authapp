import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'  //  custom axios instance
import globalAxios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: {
      email: null,
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: []
    }
  },
  mutations: {
    authUser(state, authData) {   //  store token and current userid in state
      state.idToken = authData.idToken
      state.userId = authData.userId
    },

    setCurrentUser(state, authData) {
      state.user = authData
    },

    clearAuth(state) {
      state.userId = null
      state.idToken = null

      router.replace('/signin') //  redirect to login
    }
  },
  //  ACTIONS

  actions: {

    //  1.LOGIN
    login({commit, dispatch}, authData) { //  login sent post req to firebase
      axios.post('/accounts:signInWithPassword?key=AIzaSyC2o_mNGgUteF-60aY9yKwKTBV2wiKytmM', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {  //  which returns data
          commit('authUser', { idToken: res.data.idToken, userId: res.data.localId }) //  update state
          console.log(res.data.localId)
          localStorage.setItem('idToken', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          router.replace('/dashboard') //  redirect to dashboard
        })
        .catch(err => console.log(err))
    },

    //  2.SIGNUP
    signup({commit, dispatch}, authData) {  //  store new user in auth db
      axios.post('/accounts:signUp?key=AIzaSyC2o_mNGgUteF-60aY9yKwKTBV2wiKytmM', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', { idToken: res.data.idToken, userId: res.data.localId })
          dispatch('storeUser', authData) //  store user in original users db
          console.log(res.data.idToken)
          localStorage.setItem('idToken', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          router.replace('/dashboard') //  redirect to dashboard
        })
        .catch(err => console.log(err))
    },

    //  3.FETCHUSER
      fetchUser({commit, state}) {
        if(!state.idToken){ //  if not authenticated
          return
        }

        globalAxios.get('/users.json?auth=' + state.idToken)
        .then(res => {
          let usersArr = []
          let data = res.data
          for(let key in data){
            let tempUser = data[key]
            tempUser.id = key
            usersArr.push(tempUser)
          }
          commit('setCurrentUser', usersArr[0])
        })
        .catch(err => console.log(err))
      },

      //  4.STOREUSER
      storeUser({commit, state}, userData) { //  utlilty for signup action
        if(!state.idToken){ //  if not authenticated
          return
        }

        globalAxios.post('/users.json?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      },

      //  5.LOGOUT
      logout({commit}) {
        commit('clearAuth')
        localStorage.removeItem('userId')
        localStorage.removeItem('idToken')
      },

      autologin({commit}) {
        const idToken = localStorage.getItem('idToken')
        const userId = localStorage.getItem('userId')

        if(!idToken){
          return
        }

        commit('authUser', {
          idToken,
          userId
        })
      }
  },
  getters: {

  }
})