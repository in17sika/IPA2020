<!-- ANCHOR Template with the compntents. -->
<template>
	<div class="apply">

		<!-- ANCHOR Dialog for confirmation. -->
		<v-dialog v-model="dialog.on" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
			<v-card>
				<v-card-title primary-title>
					{{dialog.title}}
				</v-card-title>
				<v-card-text>
					<p>{{dialog.paragraphOne}}</p>
					<p>{{dialog.paragraphTwo}}</p>
					<p>{{dialog.paragraphThree}}</p>
					<v-btn :color="dialog.color" @click="dialog.on =! dialog.on">Alles Klar!</v-btn>
				</v-card-text>
			</v-card>
		</v-dialog>

		<!-- ANCHOR First section. -->
		<v-layout row wrap>
			<v-flex xs12 md6 lg6 class="white">
				<v-img src="../assets/blue_messages.png" class="ma-5 py-5"></v-img>
			</v-flex>

			<v-flex xs12 md6 lg6 class="white">
				<v-container class="fill-height pb-12" fluid>
					<v-row align="center" justify="center">
						<v-col cols="12" sm="12" md="10" class="ml-2 ">
							<v-card flat class="px-5 py-3 shaped" width="100%">
								<v-card-title primary-title>
									Wie funktioniert es?
								</v-card-title>
								<v-divider></v-divider>
								<v-card class="elevation-10 my-5 ml-8" width="85%">
									<v-toolbar color="blue" dark flat>
										<v-toolbar-title>Schritt 1</v-toolbar-title>
									</v-toolbar>
									<v-card-text>
										Wunschdatum aussuchen
									</v-card-text>
								</v-card>
								<v-card class="elevation-10 my-5 ml-4" width="75%">
									<v-toolbar color="primary" dark flat>
										<v-toolbar-title>Schritt 2</v-toolbar-title>
									</v-toolbar>
									<v-card-text>
										Persönliche Daten eingeben
									</v-card-text>
								</v-card>
								<v-card class="elevation-10 my-5" width="65%">
									<v-toolbar color="indigo" dark flat>
										<v-toolbar-title>Schritt 3</v-toolbar-title>
									</v-toolbar>
									<v-card-text>
										Abschliessen
									</v-card-text>
								</v-card>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-flex>
		</v-layout>

		<v-divider></v-divider>

		<!-- ANCHOR Section with date sliders. -->
		<template>
			<v-sheet class="mx-auto ma-10 mt-10" elevation="8" max-width="79vw">
				<v-card-title primary-title class="primary white--text">
					Wunschdatum:
				</v-card-title>
				<v-slide-group v-model="model" class="pa-4" show-arrows>
					<v-slide-item v-for="date in dates" :key="date.id" v-slot:default="{ active, toggle }">
						<v-card :color="active ? 'primary white--text' : 'grey lighten-1 white--text'" flat class="ma-4"
							height="200" width="150" @click="draw(date),toggle()">
							<v-row class="fill-height" align="center" justify="center">
								<v-scale-transition>
									<p><b>{{date.dates_start}}<br>{{date.dates_end}}<br><br>{{date.dates_time}}</b></p>
								</v-scale-transition>
							</v-row>
						</v-card>
					</v-slide-item>
				</v-slide-group>
				<v-expand-transition>
					<v-sheet v-if="model != null" color="grey lighten-4" height="auto" tile>
						<v-row class="pt-3" align="center" justify="center">
							<v-card-title primary-title>
								Persönliche Daten:
							</v-card-title>
						</v-row>
						<v-row>
							<v-col cols="12">

								<template>
									<v-layout row wrap>
										<v-flex xs1>

										</v-flex>
										<v-flex xs10>
											<v-form class="ma-3" ref="form" v-model="valid" lazy-validation>

												<v-text-field v-model="editedItem.applicants_firstname" :rules="nameRules" label="Vorname"
													outlined required>
												</v-text-field>
												<v-text-field v-model="editedItem.applicants_lastname" :rules="nameRules" label="Nachname"
													outlined required>
												</v-text-field>
												<v-text-field v-model="editedItem.applicants_age" :rules="nameRules" label="Alter" outlined
													required>
												</v-text-field>
												<v-text-field v-model="editedItem.applicants_email" :rules="emailRules" label="E-mail" outlined
													required>
												</v-text-field>
												<v-textarea v-model="editedItem.applicants_info" label="Zu berücksichtigen (Allergien etc.)"
													auto-grow outlined row-height="15"></v-textarea>

												<v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
													label="Stimmen alle Angaben?" required></v-checkbox>

												<div v-if="checkbox == true && valid == true">
													<v-btn :disabled="!valid" color="primary" class="mr-1" @click="save(pass.data)">
													Senden
												</v-btn>
												<v-btn color="teal white--text" class="mr-1" @click="reset">
													Reset
												</v-btn>
												</div>
												<div v-else>
													<v-btn color="teal white--text" class="mr-1" @click="reset">
													Reset
												</v-btn>
												</div>
											</v-form>
										</v-flex>
										<v-flex xs1>

										</v-flex>
									</v-layout>
								</template>
							</v-col>
						</v-row>
					</v-sheet>
				</v-expand-transition>
			</v-sheet>
		</template>

	</div>
</template>

<!-- ANCHOR JS code. -->
<script>

// ANCHOR Imports all the necessary dependencies.
import axios from 'axios'

export default {

	name: 'Apply',

	// ANCHOR Sets data.
	data() {
		return {
			value: '',
			valid: true,
			name: '',
			nameRules: [
				v => !!v || 'Name ist zwingend anzugeben!',
			],
			email: '',
			emailRules: [
				v => !!v || 'E-mail ist zwingend anzugeben!',
				v => /.+@.+\..+/.test(v) || 'E-mail muss gültig sein',
			],
			checkbox: false,
			dialog: {
				on: '',
				title: '',
				paragraphOne: '',
				paragraphTwo: '',
				paragraphThree: '',
				color: ''
			},
			isAuth: this.$store.getters.isLoggedIn,
			dates: [],
			model: null,
			pass: {
				data: ''
			},
			editedItem: {
				applicants_firstname: '',
				applicants_lastname: '',
				applicants_age: '',
				applicants_email: '',
				applicants_dates_id: '',
				applicants_info: ''
			},
			records: []
		};
	},

	// ANCHOR Awaits dates data and puts the date to the variable "dates" after the DOM is mounted.
	async mounted() {
		var dates = await axios.get('/visitors/dates')
		this.dates = dates.data
	},

	methods: {

		// ANCHOR Sets the given data in the parameters to the variable "pass".
		draw(date) {
			this.pass.data = date
		},

		// ANCHOR Checks if the validation was successfull and posts the data.
		async save(data) {
			if (this.$refs.form.validate()) {
				this.editedItem.applicants_dates_id = data.dates_id
				var response = await axios.post('/visitors/applicants', this.editedItem)
				this.dialog = response.data
				this.model = null
				this.dialog.on = true
			}
		},

		// ANCHOR Restes the data in the form.
		reset() {
			this.$refs.form.reset()
		}
	}
};
</script>