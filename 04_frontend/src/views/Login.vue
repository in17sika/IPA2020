<!-- ANCHOR Template with the compontents. -->
<template>
	<div class="login">
		<v-app id="inspire">
			<v-content>
				<v-container class="fill-height" fluid>
					<v-row align="center" justify="center">
						<v-col cols="12" sm="8" md="6">
							<v-card class="elevation-12 mb-12">
								<v-toolbar color="blue" dark flat>
									<v-toolbar-title>Login</v-toolbar-title>
									<v-spacer />
								</v-toolbar>
								<v-card-text>
									<v-form>
										<v-text-field v-model="loginData.users_username" label="Username" name="login"
											prepend-icon="mdi-account" type="text">
										</v-text-field>

										<v-text-field v-model="loginData.users_password" id="password" label="Password" name="password"
											prepend-icon="mdi-lock" type="password"></v-text-field>
										<p style="color:red; text-align:center;" v-if="msg">{{ msg }}</p>
									</v-form>
								</v-card-text>
								<v-card-actions>
									<v-spacer />
									<v-btn color="primary" @click="login">Login</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-content>
		</v-app>
	</div>
</template>

<!-- ANCHOR JS code.-->
<script>

// ANCHOR Imports all the necessary dependencies.
import axios from 'axios'

export default {
	
	// ANCHOR Sets data.
	data() {
		return {
			loginData: {
				users_username: '',
				users_password: ''
			},
			msg: ''
		};
	},

	methods: {

		// ANCHOR Trys to log the user in with the given credentials. Shows an error if the login attempt failed.
		async login() {
			try {
				this.$store.dispatch('login', {
					token: await axios.post('/visitors/login', this.loginData).then(response => response.data.split(" ")[1])
				}).then(() => {
					this.$router.push('/Dashboard');
				})
			} catch (error) {
				this.msg = 'Bitte Logindaten überprüfen'
			}
		},
	}
};
</script>