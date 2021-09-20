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
					console.log(response);
					context.commit('loginUser');
					context.commit('setUsername', response.data.name);
					resolve(response.data);
				})
				.catch(error => { reject(error.response) })
			})
		  .catch(error => {	reject(error.response) })
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
		  .catch(error => {	reject(error.response) })
		})
	},
	fetchProducts(){
		return new Promise((resolve, reject) => {
			axios.get('/api/products', {withCredentials: true})
			.then((response) => {
				resolve(response.data);
			})
		  .catch(error => {	reject(error.response) })
		})
	}
  }
})
