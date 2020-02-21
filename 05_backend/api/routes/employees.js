// SECTION Packages
// ANCHOR Requires all the neccesary packages.
var express = require('../node_modules/express')
var router = express.Router()
var knex = require('../knex')
var bcrypt = require('../node_modules/bcrypt')
var nodemailer = require('../node_modules/nodemailer');
// !SECTION 

// SECTION Profil
// ANCHOR Handles incoming GET-Requests for '/profil'.
router.get('/profil', async (req, res) => {
	try {
		var data = await knex('users').where({
			users_id: req.decodedToken.id
		})
		res.status(200).send(data)
	} catch (err) {
		res.sendStatus(500)
		console.log(err)
	}
})

// ANCHOR Handles incoming PUT-Requests for '/profil'.
router.put('/profil', async (req, res) => {
	try {
		var {
			users_password
		} = req.body
		console.log(req.body);
		
		var hashedPassword = await bcrypt.hash(users_password, 10)
		await knex('users').update({
			users_password: hashedPassword
		}).where({
			users_id: req.decodedToken.id
		})
		res.status(200).send('Password of user ' + req.decodedToken.id + ' was updated.')
	} catch (err) {
		res.status(500).send(err)
		console.log(err);
	}
})

// ANCHOR Handles incoming DELETE-Requests for '/profil'.
router.delete('/profil', async (req, res) => {
	try {
		await knex('users').del().where({
			users_id: req.decodedToken.id
		})
		res.status(200).send('User ' + req.decodedToken.id + ' was deleted.')
	} catch (err) {
		res.status(500).send(err)
		console.log(err);
	}
})
// !SECTION 

// SECTION Users
// ANCHOR Handles incoming GET-Requests for '/users'.
router.get('/users', async (req, res) => {
	try {
		var data = await knex('users')
		res.status(200).send(data)
	} catch (err) {
		res.status(500).send(err)
		console.log(err);
	}
})

// ANCHOR Handles incoming POST-Requests for '/users'.
router.post('/users', async (req, res) => {
	try {
		var {
			users_username,
			users_password,
			users_firstname,
			users_lastname
		} = req.body
		var hashedPassword = await bcrypt.hash(users_password, 10)
		await knex('users').insert({
			users_username: users_username,
			users_password: hashedPassword,
			users_firstname: users_firstname,
			users_lastname: users_lastname,
		})
		res.status(200).send('User was created successfully.')
		console.log('User ' + users_username + ' was created successfully.');
	} catch (err) {
		res.status(500).send(err)
		console.log(err);
	}
})

// NOTE Commented out because users should not be able to update other users data.
// ANCHOR Handles incoming PUT-Requests for '/users'.
// router.put('/users', async (req, res) => {
// 	try {
// 		var {
// 			username,
// 			password
// 		} = req.body
// 		var hashedPassword = await bcrypt.hash(password, 10)
// 		await knex('users').update({
// 			password: hashedPassword
// 		}).where({
// 			username: username
// 		})
// 		res.status(200).send('Password of user ' + username + ' has changed.')
// 	} catch (err) {

// 	}
// })

// NOTE Commented out because users should not be able to delete others user data.
// ANCHOR Handles incoming DELETE-Requests for '/users'.
// router.delete('/users', async (req, res) => {
// 	try {
// 		var {
// 			username
// 		} = req.body
// 		await knex('users').del().where({
// 			username: username
// 		})
// 		res.status(200).send('User ' + username + ' was deleted.')
// 	} catch (err) {
// 		res.status(500).send(err)
// 		console.log(err);
// 	}
// })
// !SECTION 

// SECTION Dates
// ANCHOR Handles incoming GET-Requests for '/dates'.
router.get('/dates', async (req, res) => {
	try {
		var data = await knex('dates')
		res.status(200).send(data)
	} catch (err) {
		res.sendStatus(500)
		console.log(err);
	}
})

// ANCHOR Handles incoming POST-Requests for '/dates'.
router.post('/dates', async (req, res) => {
	try {
		var {
			dates_start,
			dates_end,
			dates_time,
			dates_relevant
		} = req.body
		await knex('dates').insert({
			dates_start: dates_start,
			dates_end: dates_end,
			dates_time: dates_time,
			dates_relevant: dates_relevant
		})
		res.status(200).send('Date ' + dates_date + ' was added.')
	} catch (err) {
		res.sendStatus(500)
		console.log(err);
	}
})

// ANCHOR Handles incoming PUT-Requests for '/dates'.
router.put('/dates', async (req, res) => {
	try {
		var {
			dates_id,
			dates_start,
			dates_end,
			dates_time,
			dates_relevant
		} = req.body
		await knex('dates').update({
				dates_date: dates_start,
				dates_date: dates_end,
				dates_date: dates_time,
				dates_date: dates_relevant
			})
			.where({
				dates_id: dates_id
			})
		res.status(200).send('Date ' + dates_id + ' was updated.')
	} catch (err) {
		res.sendStatus(500)
		console.log(err);
	}
})

// ANCHOR Handles incoming DEL-Requests for '/dates'.
router.delete('/dates', async (req, res) => {
	try {
		var {
			dates_id
		} = req.body
		await knex('dates').del().where({
			dates_id: dates_id
		})
		res.status(200).send('Date ' + dates_id + ' was deleted.')
	} catch (err) {
		res.sendStatus(500)
		console.log(err)
	}
})
// !SECTION 

// SECTION Applicants
// ANCHOR Handles incoming GET-Requests for '/applicants'.
router.get('/applicants', async (req, res) => {
	try {
		var data = await knex('applicants')
			.join('dates', 'dates.dates_id', 'applicants.applicants_dates_id')
		res.send(data)
	} catch (err) {
		res.sendStatus(500)
		console.log(err)
	}
})

// ANCHOR Handles incoming POST-Requests for '/applicants'.
router.post('/applicants', async (req, res) => {
	try {
		var {
			applicants_firstname,
			applicants_lastname,
			applicants_age,
			applicants_email,
			applicants_info,
			applicants_dates_id,
			applicants_present
		} = req.body
		await knex('applicants').insert({
			applicants_firstname: applicants_firstname,
			applicants_lastname: applicants_lastname,
			applicants_age: applicants_age,
			applicants_email: applicants_email,
			applicants_info: applicants_info,
			applicants_dates_id: applicants_dates_id,
			applicants_present: applicants_present
		})
		res.status(200).send('Applicant ' + applicants_firstname + ' was added.')
	} catch (err) {
		res.sendStatus(500)
		console.log(err)
	}
})

// ANCHOR Handles incoming PUT-Requests for '/applicants'.
router.put('/applicants', async (req, res) => {
	try {
		var {
			applicants_id,
			applicants_firstname,
			applicants_lastname,
			applicants_age,
			applicants_email,
			applicants_info,
			applicants_dates_id,
			applicants_present
		} = req.body
		await knex('applicants').update({
			applicants_firstname: applicants_firstname,
			applicants_lastname: applicants_lastname,
			applicants_age: applicants_age,
			applicants_email: applicants_email,
			applicants_info: applicants_info,
			applicants_dates_id: applicants_dates_id,
			applicants_present: applicants_present
		}).where({
			applicants_id: applicants_id
		})
		res.status(200).send('Applicant ' + applicants_firstname + ' was updated.')
	} catch (err) {
		res.sendStatus(500)
		console.log(err);
	}
})

// ANCHOR Handles incoming DELETE-Requests for '/applicants'
router.delete('/applicants/:id', async (req, res) => {
	try {
		var {
			id
		} = req.params
		
		await knex('applicants').del().where({
			applicants_id: id
		})
		res.sendStatus(200)
	} catch (err) {
		res.sendStatus(500)
		console.log(err);
	}
})
// !SECTION 

// SECTION E-Mail
router.post('/confirm', async (req, res) => {
	try {
		"use strict";

		// async..await is not allowed in global scope, must use a wrapper
		async function main() {
			// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				auth: {
					user: "in17sika@gmail.com", // generated ethereal user
					pass: "gibbiX12345" // generated ethereal password
				}
			});

			let info = await transporter.sendMail({
				from: 'Technische Fachschule Bern 🏫',
				to: req.body.applicants_email,
				subject: "Schnupperlehre ✔",
				html: ``

				
			});

			await knex('applicants').update({
				applicants_notified: 1
			}).where({
				applicants_id: req.body.applicants_id
			})

			console.log("Message sent: %s", info.messageId);
		}

		main().catch(console.error);
		res.sendStatus(200)
	} catch (err) {
		res.sendStatus(500)
		console.log(err);
	}
})
// !SECTION 

// Exports the express router
module.exports = router