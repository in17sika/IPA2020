// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from '../../node_modules/axios';
import createPersistedState from '../../node_modules/vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState()],
	state: {
		token: ""
	},
	getters: {
		isLoggedIn: state => {
			return state.token;
		}
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		RESET: state => {
			state.token = ""
		}
	},

	actions: {
		login: (context, data) => {
			context.commit('SET_TOKEN', data.token);

			Axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
		},
		logout: ({
			commit
		}) => {
			commit('RESET', '');
		}
	}
});