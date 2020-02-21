// SECTION Packages
// ANCHOR Requires all the neccesary packages.
var express = require('../node_modules/express')
var router = express.Router()
var knex = require('../knex');
var bcrypt = require('../node_modules/bcrypt')
var jwt = require('../node_modules/jsonwebtoken')
// !SECTION 

// SECTION Dates
// ANCHOR Handles incoming GET-Requests for '/dates'.
router.get('/dates', async (req, res) => {
	try {
		var data = await knex('dates').where({dates_relevant: 1})
		res.status(200).send(data)
		console.log('Dates were requested and delivered.');
	} catch (err) {
		res.status(500)
		console.log(err);
	}
})
// !SECTION 

// SECTION Applicants
// ANCHOR Handles incoming POST-Requests for '/applicants'.
router.post('/applicants', async (req, res) => {
	var {
		applicants_firstname,
		applicants_lastname,
		applicants_age,
		applicants_email,
		applicants_info,
		applicants_dates_id
	} = req.body

	try {
		await knex('applicants').insert({
			applicants_firstname: applicants_firstname,
			applicants_lastname: applicants_lastname,
			applicants_age: applicants_age,
			applicants_email: applicants_email,
			applicants_info: applicants_info,
			applicants_dates_id: applicants_dates_id
		})
		var successMessage = {
			on: true,
			title: 'Danke für deine Anmeldung!',
			paragraphOne: 'Wir haben deine Anmeldung zum Schnuppern erhalten und senden dir in den nächsten Tagen eine Bestätigungsmail mit allen notwendigen Informationen.',
			paragraphTwo: 'Falls du trotzdem nicht kommen kannst oder willst, kannst du dich jederzeit telefonisch oder per E-Mail abmelden.',
			paragraphThree: 'Wir bedanken uns nochmals für dein Interesse und freuen uns dich bald kennenlernen!',
			color: 'info'
		}
		res.status(200).send(successMessage)
		console.log()
	} catch (err) {
		var errorMsg = {
			on: true,
			title: 'Ups...',
			paragraphOne: 'Die Anmeldung hat nicht funktioniert.',
			paragraphTwo: 'Versuche es später nochmal.',
			paragraphThree: '',
			color: 'error'
		}
		res.status(500).send(errorMsg)
	}
})
// !SECTION 

// SECTION Login
// ANCHOR Handles incoming POST-Requests for '/login'.
router.post('/login', async (req, res) => {
	var {
		users_username,
		users_password
	} = req.body
	
	var db_user = await knex('users').where({
		users_username: users_username
	})
	
	db_user = db_user[0]

	if (db_user == null) {
		return res.sendStatus(400)
	} else {
		try {
			if (await bcrypt.compare(users_password, db_user.users_password)) {
				var tokendata = {
					id: db_user.users_id,
					username: users_username
				}
				var token = jwt.sign(tokendata, process.env.JWT_TOKEN)
				var auth = 'Bearer ' + token
				
				res.status(200).send(auth)
				console.log('User ' + db_user.users_id + ` '${users_username}' has logged in.`);
			} else {
				res.sendStatus(403)
			}
		} catch (err) {
			res.sendStatus(500)
			console.log(err);
		}
	}
})
// !SECTION 

// Exports the express router.
module.exports = router