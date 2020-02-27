<!-- ANCHOR CSS code. -->
<style>
	h1 {
		font-size: 30px;
	}

	@media screen and (max-width: 992px) {
		#logo {
			width: 30% !important;
		}
	}
</style>

<!-- ANCHOR Template with the compontents. -->
<template>
	<v-app>
		<v-app-bar app color="blue" dark>
			<v-toolbar-title>
				<v-app-bar-nav-icon v-if="isAuth" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
				<v-img v-if="!isAuth" src="./assets/tflogo.png" width="12%" @click="toHome" style="cursor: pointer"
					id="logo"></v-img>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<div v-if="isAuth">
				<v-btn text @click="logout">
					<v-icon class="mr-2">mdi-account</v-icon>
					<span class="mr-2">Abmelden</span>
				</v-btn>
			</div>
			<div v-else>
			</div>
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" v-if="isAuth" relative bottom fixed temporary>
			<v-list nav dense>
				<v-list-item-group v-model="group" active-class="primary--text">
					<v-list-item v-for="item in navItems" :key="item.id" :to="item.rout">
						<v-icon class="mr-3">{{ item.icon }}</v-icon>
						<v-list-item-title>{{ item.name }}</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-content v:bind="items" class="mx-4 white">
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
	export default {

		// ANCHOR Sets the compontent name.
		name: "App",

		// ANCHOR Imports compontents.
		components: {},

		// ANCHOR Sets data.
		data: () => ({
			isAuth: "",
			drawer: false,
			group: "",
			navItems: [{
					id: "1",
					icon: "mdi-home",
					name: "Startseite",
					rout: "/"
				},
				{
					id: "2",
					icon: "mdi-calendar-check",
					name: "Dashboard",
					rout: "/Dashboard"
				},
				{
					id: "3",
					icon: "mdi-account",
					name: "Profil",
					rout: "/Profil"
				}
			]
		}),

		// ANCHOR The mounted hook runs the function "init".
		mounted() {
			this.init();
		},

		// ANCHOR The updated hook runs the function "init".
		updated() {
			this.init();
		},

		methods: {

			// ANCHOR Sets the isAuth variable value to the isLoggedIn state.
			init() {
				this.isAuth = this.$store.getters.isLoggedIn;
			},

			// ANCHOR Logs the user out and redirects to the home page.
			logout() {
				this.isAuth = false;
				this.$store.dispatch("logout");
				this.$router.push("/");
			},

			// ANCHOR Redirects to the home screen.
			toHome() {
				this.$router.push("/");
			}
		}
	};
</script>