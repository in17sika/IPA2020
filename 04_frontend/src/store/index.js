// ANCHOR Imports all the necessary dependencies.
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
	// ANCHOR Defines getters
	getters: {
		isLoggedIn: state => {
			return state.token;
		}
	},

	// ANCHOR defines mutations. Mutations are basic functions to set, reset data.
	mutations: {

		// ANCHOR Sets the token in object state.
		SET_TOKEN: (state, token) => {
			state.token = token;
		},

		// ANCHOR Resets the token by setting it's value to ""
		RESET: state => {
			state.token = ""
		}
	},

	// ANCHOR Defines actions. Actions are basically methods.
	actions: {

		// ANCHOR Calls a mutation to set the token.
		login: (context, data) => {
			context.commit('SET_TOKEN', data.token);
			Axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
		},

		// ANCHOR Calls a mutation to reset the state object.
		logout: ({
			commit
		}) => {
			commit('RESET', '');
		}
	}
});