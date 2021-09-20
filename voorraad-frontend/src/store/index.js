import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default new Vuex.Store({
  state: {
	  authenticated: false,
	  username: null
  },
  getters: {
	  isAuth(state) {
		  return state.authenticated;
	  }
  },
  mutations: {
	  loginUser(state) {
		  state.authenticated = true;
	  },
	  logoutUser(state) {
		  state.authenticated = false;
	  },
	  setUsername(state, payload) {
		  state.username = payload;
	  }
  },
  actions: {
	loginUser(context, payload){
		return new Promise((resolve, reject) => {
			axios.get('/sanctum/csrf-cookie')
			.then(() => {
				axios.post('/login', {name: payload.name, password: payload.password})
				.then(response => {
					context.commit('loginUser');
					context.commit('setUsername', response.data.name);
					resolve(response.data);
				})
				.catch(error => { reject(error) })
			})
		  .catch(error => {	reject(error) })
		})
	},
	logoutUser(context){
		return new Promise((resolve, reject) => {
			axios.post('/logout')
			.then((response) => {
				context.commit('logoutUser');
				context.commit('setUsername', null);
				resolve(response.data);
			})
		  .catch(error => {	reject(error) })
		})
	},
  }
})
