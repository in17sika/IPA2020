<!-- ANCHOR Templates with the compontents. -->
<template>
	<div>

		<v-layout row wrap>
			<v-flex xs1>
			</v-flex>
			<v-flex xs10>
				<!-- ANCHOR This is the applicants table. -->
				<v-data-table :headers="applicantsHeader" :items="records" :items-per-page="10" class="elevation-3 mt-10"
					:search="applicantsSearch">
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>Teilnehmer</v-toolbar-title>
							<div class="flex-grow-1"></div>
							<v-text-field name="search" label="Search" v-model="applicantsSearch" class="mt-5"
								append-icon="mdi-table-search"></v-text-field>
							<v-dialog v-model="applicantsDialog" max-width="75vw">
								<v-card>
									<v-card-title>
										<span class="headline">{{ formTitle }}</span>
									</v-card-title>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12">
													<v-text-field v-model="editedItem.applicants_firstname" label="Vorname">
													</v-text-field>
													<v-text-field v-model="editedItem.applicants_lastname" label="Nachname">
													</v-text-field>
													<v-text-field v-model="editedItem.applicants_age" label="Alter"></v-text-field>
													<v-text-field v-model="editedItem.applicants_email" label="E-mail">
													</v-text-field>
													<v-textarea v-model="editedItem.applicants_info" label="Info"></v-textarea>
													<v-text-field v-model="editedItem.applicants_dates_id"
														label="Datum (DD.MM.YYYY)">
													</v-text-field>
													<v-checkbox label="Anwesend" v-model="editedItem.applicants_present">
													</v-checkbox>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<div class="flex-grow-1"></div>
										<v-btn class="ma-2" color="indigo white--text" @click="applicantsClose">
											<v-icon class="mr-2">mdi-cancel</v-icon><span>Abbrechen</span>
										</v-btn>
										<v-btn class="ma-2" color="info" @click="applicantsSave">
											<v-icon class="mr-2">mdi-checkbox-marked-circle-outline</v-icon><span>Speichern</span>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
							<v-dialog v-model="info.on" scrollable :overlay="false" max-width="500px"
								transition="dialog-transition">
								<v-card>
									<v-card-title primary-title>
										{{info.data.applicants_firstname + ' ' + info.data.applicants_lastname}}
									</v-card-title>
									<v-card-text>
										<v-simple-table class="mt-5">
											<template v-slot:default>
												<thead>
													<tr>
														<th class="text-left">Infos (Alergien, Behinderungen etc.)</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>{{info.data.applicants_info}}</td>
													</tr>
												</tbody>
												<thead>
													<tr>
														<th class="text-left">Benachrichtigungs-Status</th>
													</tr>
												</thead>
												<tbody v-if="info.data.applicants_notified">
													<tr>
														<td class="green--text">
															Bestätigungs-Mail wurde gesendet.
														</td>
													</tr>
												</tbody>
												<tbody v-else>
													<tr>
														<td class="orange--text">
															Bestätigungs-Mail wurde noch nicht gesendet.
														</td>
													</tr>
													<v-btn color="info" @click="mail" class="mt-5">senden</v-btn>
												</tbody>
											</template>
										</v-simple-table>
									</v-card-text>
								</v-card>
							</v-dialog>
							<v-dialog v-model="pop.on" scrollable :overlay="false" max-width="500px"
								transition="dialog-transition">
								<v-card>
									<v-card-title primary-title>
										Bestätigungsmail
									</v-card-title>
									<v-card-text>
										{{pop.msg}}
									</v-card-text>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<!-- the actual data table -->
					<template slot="item" slot-scope="props">
						<tr>
							<td>{{ props.item.applicants_firstname }}</td>
							<td>{{ props.item.applicants_lastname }}</td>
							<td>{{ props.item.applicants_age }}</td>
							<td>{{ props.item.applicants_email }}</td>
							<td>
								<v-layout row wrap>
									<v-chip
										v-if="props.item.applicants_notified == true && props.item.applicants_present == true"
										color="success">{{ props.item.dates_start }}</v-chip>
									<v-chip
										v-else-if="props.item.applicants_present == true && props.item.applicants_notified == false"
										color="success">{{ props.item.dates_start }}</v-chip>
									<v-chip
										v-else-if="props.item.applicants_notified == true && props.item.applicants_present == false"
										color="info">{{ props.item.dates_start }}</v-chip>
									<v-chip v-else color="blue-grey white--text">{{ props.item.dates_start }}</v-chip>
								</v-layout>
							</td>
							<td>
								<v-layout justify-space-between>
									<v-btn color="info" @click="passOn(props.item)">
										<v-icon small>mdi-information</v-icon>
									</v-btn>
									<v-btn color="warning" @click="editApplicants(props.item)">
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
									<v-btn color="error" @click="deleteItem(props.item)">
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</v-layout>
							</td>
						</tr>
					</template>
				</v-data-table>
			</v-flex>
			<v-flex xs1>
			</v-flex>

			<v-flex xs1>
			</v-flex>
			<v-flex xs10>
				<v-card class="mt-10">
					<v-card-title primary-title>
						Liste exportieren
					</v-card-title>
					<v-card-actions>
						<div id="container"></div>
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex xs1>
			</v-flex>

			<v-flex xs1>
			</v-flex>
			<v-flex xs10>
				<!-- ANCHOR This is the dates table -->
				<v-data-table :headers="datesHeader" :items="dates" :items-per-page="10" class="elevation-3 mt-10"
					:search="datesSearch">
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>Schnupperlehrgänge</v-toolbar-title>
							<div class="flex-grow-1"></div>
							<v-text-field name="search" label="Search" v-model="datesSearch" class="mt-5"
								append-icon="mdi-table-search"></v-text-field>
							<v-dialog v-model="datesDialog" max-width="75vw">
								<v-card>
									<v-card-title>
										<span class="headline">Daten</span>
									</v-card-title>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12">
													<v-text-field v-model="editedItem.dates_start" label="Startdatum">
													</v-text-field>
													<v-text-field v-model="editedItem.dates_end" label="Enddatum">
													</v-text-field>
													<v-text-field v-model="editedItem.dates_time" label="Uhrzeit"></v-text-field>
													<v-checkbox label="Relevanz" v-model="editedItem.dates_relevant">
													</v-checkbox>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<div class="flex-grow-1"></div>
										<v-btn class="ma-2" color="indigo white--text" @click="datesClose">
											<v-icon class="mr-2">mdi-cancel</v-icon><span>Abbrechen</span>
										</v-btn>
										<v-btn class="ma-2" color="info" @click="datesSave">
											<v-icon class="mr-2">mdi-checkbox-marked-circle-outline</v-icon><span>Speichern</span>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
							<v-dialog v-model="pop.on" scrollable :overlay="false" max-width="500px"
								transition="dialog-transition">
								<v-card>
									<v-card-title primary-title>
										Bestätigungsmail
									</v-card-title>
									<v-card-text>
										{{pop.msg}}
									</v-card-text>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<!-- ANCHOR the actual data table -->
					<template slot="item" slot-scope="props">
						<tr>
							<td>{{ props.item.dates_start }}</td>
							<td>{{ props.item.dates_end }}</td>
							<td>{{ props.item.dates_time }}</td>
							<td>
								<v-layout row wrap>
									<v-chip v-if="props.item.dates_relevant == true" color="success">{{ props.item.dates_start }}
									</v-chip>
									<v-chip v-else color="blue-grey white--text">{{ props.item.dates_start }}</v-chip>
								</v-layout>
							</td>
							<td>
								<v-layout justify-space-between>
									<v-btn color="warning" @click="editDates(props.item)">
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</v-layout>
							</td>
						</tr>
					</template>
				</v-data-table>
			</v-flex>
			<v-flex xs1>
			</v-flex>
			<v-flex xs1>
			</v-flex>
			<v-flex xs10>
				<v-card class="mt-10">
					<v-card-title primary-title>
						Neues Datum erstellen
					</v-card-title>
					<v-card-actions>
						<v-btn color="success" @click="addDate()">
							<v-icon small>mdi-plus</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex xs1>
			</v-flex>
		</v-layout>

		<v-layout row wrap>
			<v-flex xs1>
			</v-flex>
			<v-flex xs10>
				<!-- ANCHOR This is the new user form. -->
				<v-card class="my-10 elevation-3">
					<v-card-title primary-title>
						Benutzer erstellen
					</v-card-title>
					<v-form>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-form ref="form" v-model="valid" lazy-validation>
										<v-text-field v-model="newUser.users_username" label="Benutzername"
											:rules="usernameRules">
										</v-text-field>
										<v-text-field v-model="newUser.users_password" label="Passwort" :rules="passwordRules">
										</v-text-field>
										<v-text-field v-model="newUser.users_firstname" label="Vorname"></v-text-field>
										<v-text-field v-model="newUser.users_lastname" label="Nachname"></v-text-field>
										<v-checkbox v-model="checkbox" :rules="[v => !!v || 'Ankreuzen um weiterzufahren!']"
											label="Stimmen alle Angaben?" required></v-checkbox>
										<v-card-actions>
											<div class="flex-grow-1"></div>
											<div v-if="checkbox == true && valid == true">
												<v-btn class="ma-2" color="warning" @click="createUser" :disabled="!valid">
													<v-icon class="mr-2">mdi-checkbox-marked-circle-outline</v-icon>
													<span>Erstellen</span>
												</v-btn>
											</div>
											<div v-else>
											</div>
										</v-card-actions>
									</v-form>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card>
			</v-flex>
			<v-flex xs1>
			</v-flex>
		</v-layout>
		<!-- ANCHOR This is the snckbar which allow me to show the user important push notifications. -->
		<v-snackbar v-model="snackbar.on" :color="snackbar.color" :timeout="timeOut">
			{{snackbar.data}}
		</v-snackbar>

	</div>
</template>

<!-- ANCHOR JS code -->
<script>
	// ANCHOR Import all the necessary dependencies.
	import axios from 'axios'

	export default {

		// ANCHOR Sets compontents name.
		name: 'Dashboard',

		// ANCHOR Sets data.
		data: () => ({
			applicantsHeader: [{
					text: 'Vorname',
					value: 'applicants_firstname',
					sortable: true
				},
				{
					text: 'Nachname',
					value: 'applicants_lastname'
				},
				{
					text: 'Alter',
					value: 'applicants_age'
				},
				{
					text: 'E-Mail',
					value: 'applicants_email'
				},
				{
					text: 'Datum',
					value: 'dates_start'
				},
				{
					text: 'Aktionen',
					sortable: false
				},
			],
			datesHeader: [{
					text: 'Start-Datum',
					align: 'start',
					sortable: true,
					value: 'dates_start',
				},
				{
					text: 'End-Datum',
					value: 'dates_end'
				},
				{
					text: 'Uhrzit',
					value: 'dates_time'
				},
				{
					text: 'Relevanz',
					value: 'dates_relevant'
				},
				{
					text: 'Aktionen',
					sortable: false
				}
			],
			records: [],
			dates: [],
			applicantsDialog: false,
			datesDialog: false,
			pop: {},
			info: {
				on: '',
				data: ''
			},
			newUser: {},
			passwordRules: [
				v => !!v || 'Passwort eingeben!',
				v => v.length >= 4 || 'Passwort muss mindestens 4 Zeichen lang sein'
			],
			usernameRules: [
				v => !!v || 'Einen gültigen Benutzernamen eingeben!!',
				v => v.length >= 4 || 'Benutzname muss mindestens 4 Zeichen lang sein'
			],
			checkbox: false,
			valid: true,
			editedIndex: -1,
			editedId: -1,
			editedItem: {},
			snackbar: {
				on: '',
				color: '',
				data: ''
			},
			applicantsSearch: '',
			datesSearch: '',
			timeOut: 1500,
			pass: {
				data: ''
			}
		}),

		// ANCHOR Computes data based upon the parameters or data that is referenced in another way.
		computed: {
			formTitle() {
				return this.editedIndex === -1 ? 'Besucher hinzufügen' : 'Besucher bearbeiten'
			}
		},

		// ANCHOR Checks val and closes dialog if criteria is met.
		watch: {
			dialog(val) {
				val || this.close()
			},
		},

		// ANCHOR Runs method init after DOM is mounted and creates a download link for the applicants list.
		async mounted() {
			await this.init()
			var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.records));

			var a = document.createElement('a');
			a.href = 'data:' + data;
			a.download = 'data.json';
			a.innerHTML = 'Teilnehmerliste herunterladen (JSON)';

			var container = document.getElementById('container');
			container.appendChild(a);
		},

		methods: {

			// ANCHOR Defines variable editedItem and gets applicants data.
			async init() {
				this.editedItem = Object.assign({}, this.defaultItem)
				var applicantsResponse = await axios.get('/employees/applicants')
				this.records = applicantsResponse.data

				// ANCHOR Gets dates data.
				var datesResponse = await axios.get('/employees/dates')
				this.dates = datesResponse.data
			},

			// ANCHOR Defines editedIndex, editedId, editedItem and closes applicants dialog.
			editApplicants(item) {
				this.editedIndex = this.records.indexOf(item)
				this.editedId = item.id
				this.editedItem = Object.assign({}, item)
				this.applicantsDialog = true
			},

			// ANCHOR Defines editedIndex, editedId, editedItem and closes dates dialog.
			editDates(item) {
				this.editedIndex = this.dates.indexOf(item)
				this.editedId = item.id
				this.editedItem = Object.assign({}, item)
				this.datesDialog = true
			},

			// ANCHOR Opens dates dialog.
			addDate() {
				this.datesDialog = true
			},

			// ANCHOR Deletes applicant from variable records and sends a DELETE request.
			async deleteItem(data) {
				const index = this.records.indexOf(data)
				if (confirm('Are you sure you want to delete this item?')) {
					this.records.splice(index, 1)
					await axios.delete(`/employees/applicants/${data.applicants_id}`)
					this.snackbar.on = true
					this.snackbar.color = 'error'
					this.snackbar.data = 'Eintrag wurde entfehrnt'
				}
			},

			// ANCHOR Sends POST- or PUT-Request to save applicants data.
			async applicantsSave() {
				if (this.editedIndex > -1) {
					// ANCHOR update
					Object.assign(this.records[this.editedIndex], this.editedItem)
					await axios.put(`/employees/applicants`, this.editedItem)
					this.snackbar.on = true
					this.snackbar.color = 'warning'
					this.snackbar.data = `Eintrag wurde bearbeitet.`
				} else {
					// ANCHOR create
					this.records.push(this.editedItem)
					await axios.post('/employees/applicants/', this.editedItem)
					this.snackbar.on = true
					this.snackbar.color = 'success'
					this.snackbar.data = `Eintrag wurde erstellt`
					var response = await axios.get('/employees/applicants')
					this.records = []
					this.records = response.data
				}
				this.applicantsClose()
			},

			// ANCHOR Sends POST- or PUT-Request to save date data.
			async datesSave() {
				if (this.editedIndex > -1) {
					// ANCHOR update
					Object.assign(this.dates[this.editedIndex], this.editedItem)
					await axios.put(`/employees/dates`, this.editedItem)
					this.snackbar.on = true
					this.snackbar.color = 'warning'
					this.snackbar.data = `Eintrag wurde bearbeitet.`
				} else {
					// ANCHOR create
					var response = await axios.post('/employees/dates/', this.editedItem)
					this.snackbar.on = response.data.on
					this.snackbar.color = response.data.color
					this.snackbar.data = response.data.data
					var dates = await axios.get('/employees/dates')
					this.records = []
					this.records = dates.data
				}
				this.datesClose()
			},

			// ANCHOR Sends PUT-Request to edit applicants data.
			// async applicantsEdit() {
			// 	await axios.put('/employees/applicants', this.editedItem)
			// },

			// ANCHOR Sends PUT-Request to edit date data.
			// async datesEdit() {
			// 	await axios.put('/employees/dates', this.editedItem)
			// },

			// ANCHOR Closes applicants dialog and defines editedItem and editedIndex with a timeout of 0.3 seconds.
			applicantsClose() {
				this.applicantsDialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			// ANCHOR Closes date dialog and defines editedItem and editedIndex with a timeout of 0.3 seconds.
			datesClose() {
				this.datesDialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			// ANCHOR Passes parameter data to variable info.
			passOn(x) {
				this.info.on = true
				this.info.data = x
			},

			// ANCHOR Sends a POST-Request to send an E-Mail to the applicant.
			async mail() {
				var mailResponse = await axios.post('/employees/confirm', this.info.data)
				this.info.on = false
				this.pop = mailResponse.data
				await this.init()
			},

			// ANCHOR Sends a POST-Request to create a new users.
			async createUser() {
				var createResponse = await axios.post('/employees/users', this.newUser)
				this.pop = createResponse.data
				console.log(createResponse);

			}
		}
	};
</script>