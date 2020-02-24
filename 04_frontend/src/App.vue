<style>
	h1 {
		font-size: 30px;
	}
</style>

<template>
	<v-app>
		<v-app-bar app color="blue" dark>
			<v-toolbar-title>
				<v-img src="./assets/tflogo.png" width="12%" style="cursor: pointer" @click="home"></v-img>
			</v-toolbar-title>
		</v-app-bar>
		
		<v-content class="mx-4 white">
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",
	data() {
		return {

		}
	},
	methods: {
		home() {
			this.$router.push('/')
		}
	}
}
</script>