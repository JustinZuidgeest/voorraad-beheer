import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default new Vuex.Store({
  state: {
	  
  },
  getters: {

  },
  mutations: {

  },
  actions: {
	loginUser(context, payload){
		return new Promise((resolve, reject) => {
			axios.get('/sanctum/csrf-cookie')
			.then(() => {
				axios.post('/login', {name: payload.name, password: payload.password})
				.then(response => {
					resolve(response);
				})
				.catch(error => {reject(error)})
			})
		  .catch(error => {
			reject(error);
		  })
		})
	},
  }
})
