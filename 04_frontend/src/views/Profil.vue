<!-- ANCHOR Template with the compontents. -->
<template>
	<div class="profil">
		<v-dialog v-model="dialog" max-width="75vw">
			<v-card>
				<v-card-title>
					Passwort ändern
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-form ref="form" v-model="valid" lazy-validation>
									<v-text-field v-model="userData.users_password" label="Neues Passwort"
										:rules="passwordRules"></v-text-field>
									<v-checkbox v-model="checkbox" :rules="[v => !!v || 'Ankreuzen um weiterzufahren!']"
										label="Stimmen alle Angaben?" required></v-checkbox>
									<v-card-actions>
										<div class="flex-grow-1"></div>
										<div v-if="checkbox == true && valid == true">
											<v-btn class="ma-2" color="warning" @click="changePassword" :disabled="!valid">
											<v-icon class="mr-2">mdi-checkbox-marked-circle-outline</v-icon><span>Ändern</span>
										</v-btn>
										</div>
										<div v-else>
										</div>
									</v-card-actions>
								</v-form>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
			</v-card>
		</v-dialog>
		<v-dialog v-model="info.on" max-width="75vw">
			<v-card>
				<v-card-title>
					{{info.msg}}
				</v-card-title>
			</v-card>
		</v-dialog>
		<v-layout row wrap>
			<v-flex xs1>
			</v-flex>
			<v-flex xs10>
				<v-simple-table class="mt-10">
					<template v-slot:default>
						<thead>
							<tr>
								<th class="text-left">Bezeichnung</th>
								<th class="text-left">Wert</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>ID:</td>
								<td>{{response.users_id}}</td>
							</tr>
							<tr>
								<td>Benutzername:</td>
								<td>{{response.users_username}}</td>
							</tr>
							<tr>
								<td>Vorname:</td>
								<td>{{response.users_firstname}}</td>
							</tr>
							<tr>
								<td>Nachname:</td>
								<td>{{response.users_lastname}}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
				<v-btn color="warning" class="mt-5" @click="dialog = true">Passwort ändern</v-btn>
				<br>
				<v-btn color="error" class="mt-5" @click="deleteProfil">Profil löschen</v-btn>
			</v-flex>
			<v-flex xs1>
			</v-flex>
		</v-layout>
	</div>
</template>

<!-- ANCHOR JS code -->
<script>

// ANCHOR Imports all the necessary dependencies.
import axios from 'axios'

export default {

	// ANCHOR Sets data.
	data() {
		return {
			isAuth: this.$store.getters.isLoggedIn,
			response: {},
			dialog: false,
			info: {},
			passwordRules: [
				v => !!v || 'Neues Passwort eingeben!',
				v => v.length >= 4 || 'Neues Passwort muss mindestens 4 Zeichen lang sein'
			],
			checkbox: false,
			valid: true,
			userData: {
				users_password: ''
			}
		};
	},

	// ANCHOR Gets profil data and defines variable respone after DOM is mounted.
	async mounted() {
		var response = await axios.get('/employees/profil')
		this.response = response.data[0]
		console.log(this.response);
	},

	methods: {
		
		// ANCHOR Sends PUT-Request to change the password.
		async changePassword() {
			var passwordResponse = await axios.put('/employees/profil', this.userData)
			this.dialog = false
			this.info = passwordResponse.data
		},

		// ANCHOR Sends DELETE-Request to delete the user.
		async deleteProfil() {
			await axios.delete('/employees/profil')
			this.isAuth = false;
			this.$store.dispatch("logout");
			this.$router.push("/");
		}
	}
};
</script>