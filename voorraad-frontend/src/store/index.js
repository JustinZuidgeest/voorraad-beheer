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
		//   Authentication related methods
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

		// Product related methods
		fetchProducts(){
			return new Promise((resolve, reject) => {
				axios.get('/api/products')
				.then((response) => {
					resolve(response.data);
				})
				.catch(error => {	reject(error.response) })
			})
		},

		// User related methods
		fetchUsers(){
			return new Promise((resolve, reject) => {
				axios.get('/api/users')
				.then((response) => {
					resolve(response.data);
				})
				.catch(error => {	reject(error.response) })
			})
		},
		storeUser(context, payload){
			return new Promise((resolve, reject) => {
				axios.post('/api/users/store', {
					name: payload.name,
					email: payload.email,
					password: payload.password
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch(error => {	reject(error.response) })
			})
		},
		updateUser(context, payload){
			return new Promise((resolve, reject) => {
				axios.patch('/api/users/update/' + payload.id, {
					name: payload.name,
					email: payload.email,
					password: payload.password
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch(error => {	reject(error.response) })
			})
		},
		deleteUser(context, payload){
			return new Promise((resolve, reject) => {
				axios.delete('/api/users/delete/' + payload.id)
				.then((response) => {
					resolve(response.data);
				})
				.catch(error => {	reject(error.response) })
			})
		}
  }
})
