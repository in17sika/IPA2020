// ANCHOR Imports all the necessary dependencies
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Apply from "../views/Apply.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Profil from "../views/Profil.vue";
import store from "../store/index.js"

Vue.use(VueRouter);

// ANCHOR Sets the routes for each view
var router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/about",
		name: "about",
		component: About
	},
	{
		path: "/apply",
		name: "apply",
		component: Apply
	},
	{
		path: "/login",
		name: "login",
		component: Login
	},
	{
		path: "/Dashboard",
		name: "Dashboard",
		component: Dashboard,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/profil',
		name: 'profil',
		component: Profil,
		meta: {
			requiresAuth: true
		}
	}]
})

// ANCHOR Checks login state
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		// console.log("your token is: " + store.getters.isLoggedIn)
		if (!store.getters.isLoggedIn) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
})

export default router;