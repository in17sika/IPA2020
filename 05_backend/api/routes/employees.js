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
		var data = await knex('users').select('users_id', 'users_username', 'users_firstname', 'users_lastname').where({
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
		var successMessage = {
			on: true,
			msg: 'Dein Passwort wurde erfolgreich geändert.',
			closeDialog: true
		}
		res.status(200).send(successMessage)
	} catch (err) {
		var errorMessage = {
			on: true,
			msg: 'Dein Passwort konnte leider nicht geändert werden. Versuche es später nochmal.',
			closeDialog: true
		}
		res.status(500).send(errorMessage)
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
		console.log(req.body);
		
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
				dates_start: dates_start,
				dates_end: dates_end,
				dates_time: dates_time,
				dates_relevant: dates_relevant
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

		// ANCHOR async..await is not allowed in global scope, must use a wrapper
		async function main() {
			// ANCHOR create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				auth: {
					user: "in17sika@gmail.com",
					pass: "Euro98!3121998"
				}
			});

			// ANCHOR send mail with defined transport object
			let info = await transporter.sendMail({
				from: 'Technische Fachschule Bern 🏫',
				to: req.body.applicants_email,
				subject: "Schnupperlehre ✔",
				html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

				<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
				<head>
				<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
				<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
				<meta content="width=device-width" name="viewport"/>
				<!--[if !mso]><!-->
				<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
				<!--<![endif]-->
				<title></title>
				<!--[if !mso]><!-->
				<!--<![endif]-->
				<style type="text/css">
						body {
							margin: 0;
							padding: 0;
						}
				
						table,
						td,
						tr {
							vertical-align: top;
							border-collapse: collapse;
						}
				
						* {
							line-height: inherit;
						}
				
						a[x-apple-data-detectors=true] {
							color: inherit !important;
							text-decoration: none !important;
						}
					</style>
				<style id="media-query" type="text/css">
						@media (max-width: 660px) {
				
							.block-grid,
							.col {
								min-width: 320px !important;
								max-width: 100% !important;
								display: block !important;
							}
				
							.block-grid {
								width: 100% !important;
							}
				
							.col {
								width: 100% !important;
							}
				
							.col>div {
								margin: 0 auto;
							}
				
							img.fullwidth,
							img.fullwidthOnMobile {
								max-width: 100% !important;
							}
				
							.no-stack .col {
								min-width: 0 !important;
								display: table-cell !important;
							}
				
							.no-stack.two-up .col {
								width: 50% !important;
							}
				
							.no-stack .col.num4 {
								width: 33% !important;
							}
				
							.no-stack .col.num8 {
								width: 66% !important;
							}
				
							.no-stack .col.num4 {
								width: 33% !important;
							}
				
							.no-stack .col.num3 {
								width: 25% !important;
							}
				
							.no-stack .col.num6 {
								width: 50% !important;
							}
				
							.no-stack .col.num9 {
								width: 75% !important;
							}
				
							.video-block {
								max-width: none !important;
							}
				
							.mobile_hide {
								min-height: 0px;
								max-height: 0px;
								max-width: 0px;
								display: none;
								overflow: hidden;
								font-size: 0px;
							}
				
							.desktop_hide {
								display: block !important;
								max-height: none !important;
							}
						}
					</style>
				</head>
				<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f3f2f3;">
				<!--[if IE]><div class="ie-browser"><![endif]-->
				<table bgcolor="#f3f2f3" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3f2f3; width: 100%;" valign="top" width="100%">
				<tbody>
				<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top;" valign="top">
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f3f2f3"><![endif]-->
				<div style="background-color:transparent;">
				<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
				<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
				<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:transparent;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
				<div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
				<div style="width:100% !important;">
				<!--[if (!mso)&(!IE)]><!-->
				<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
				<!--<![endif]-->
				<div class="mobile_hide">
				<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
				<tbody>
				<tr style="vertical-align: top;" valign="top">
				<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
				<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 30px solid #F3F2F3; width: 100%;" valign="top" width="100%">
				<tbody>
				<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
				</tr>
				</tbody>
				</table>
				</td>
				</tr>
				</tbody>
				</table>
				</div>
				<!--[if (!mso)&(!IE)]><!-->
				</div>
				<!--<![endif]-->
				</div>
				</div>
				<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
				</div>
				</div>
				</div>
				<div style="background-color:transparent;">
				<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
				<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
				<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#ffffff;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:30px;"><![endif]-->
				<div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
				<div style="width:100% !important;">
				<!--[if (!mso)&(!IE)]><!-->
				<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
				<!--<![endif]-->
				<div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
				<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="I'm an image" border="0" class="center autowidth" src="https://www.tfbern.ch/TF/media/gfx/logo.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 209px; display: block;" title="I'm an image" width="209"/>
				<!--[if mso]></td></tr></table><![endif]-->
				</div>
				<!--[if (!mso)&(!IE)]><!-->
				</div>
				<!--<![endif]-->
				</div>
				</div>
				<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
				</div>
				</div>
				</div>
				<div style="background-color:transparent;">
				<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
				<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
				<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#ffffff;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:60px; padding-bottom:60px;"><![endif]-->
				<div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
				<div style="width:100% !important;">
				<!--[if (!mso)&(!IE)]><!-->
				<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:60px; padding-bottom:60px; padding-right: 0px; padding-left: 0px;">
				<!--<![endif]-->
				<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 28px; font-family: Arial, sans-serif"><![endif]-->
				<div style="color:#ffffff;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:20px;padding-right:0px;padding-bottom:28px;padding-left:0px;">
				<div style="line-height: 1.2; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #ffffff; mso-line-height-alt: 14px;">
				<p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 17px; margin: 0;"><span style="color: #2a272b;"><span style="font-size: 42px;"><strong>Danke für deine Anmeldung!</strong></span></span></p>
				</div>
				</div>
				<!--[if mso]></td></tr></table><![endif]-->
				<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
				<div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
				<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
				<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"><strong><span style="font-size: 16px;">${req.body.dates_start} ${req.body.dates_time}</span></strong></p>
				</div>
				</div>
				<!--[if mso]></td></tr></table><![endif]-->
				<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
				<div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
				<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
				<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"><strong><span style="font-size: 16px;">Lorrainestrasse 3a, 3013 Bern</span></strong></p>
				</div>
				</div>
				<!--[if mso]></td></tr></table><![endif]-->
				<!--[if (!mso)&(!IE)]><!-->
				</div>
				<!--<![endif]-->
				</div>
				</div>
				<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
				</div>
				</div>
				</div>
				<div style="background-color:transparent;">
				<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
				<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
				<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:transparent;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
				<div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
				<div style="width:100% !important;">
				<!--[if (!mso)&(!IE)]><!-->
				<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
				<!--<![endif]-->
				<div class="mobile_hide">
				<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
				<tbody>
				<tr style="vertical-align: top;" valign="top">
				<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 10px; padding-bottom: 15px; padding-left: 10px;" valign="top">
				<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
				<tbody>
				<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
				</tr>
				</tbody>
				</table>
				</td>
				</tr>
				</tbody>
				</table>
				</div>
				<div class="mobile_hide">
				<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
				<tbody>
				<tr style="vertical-align: top;" valign="top">
				<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 10px; padding-bottom: 15px; padding-left: 10px;" valign="top">
				<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
				<tbody>
				<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
				</tr>
				</tbody>
				</table>
				</td>
				</tr>
				</tbody>
				</table>
				</div>
				<!--[if (!mso)&(!IE)]><!-->
				</div>
				<!--<![endif]-->
				</div>
				</div>
				<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
				</div>
				</div>
				</div>
				<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				</td>
				</tr>
				</tbody>
				</table>
				<!--[if (IE)]></div><![endif]-->
				</body>
				</html>`
			});

			await knex('applicants').update({
				applicants_notified: 1
			}).where({
				applicants_id: req.body.applicants_id
			})

			console.log("Message sent: %s", info.messageId);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		}

		main().catch(console.error);

		var successMessage = {
			on: true,
			msg: 'Bestätigungsmail wurde gesendet.'
		}
		res.status(200).send(successMessage)
		console.log(err);

	} catch (err) {
		var errorMessage = {
			on: true,
			msg: 'Bestätigungsmail konnte nicht gesendet werden. Versuche es später nochmal.'
		}
		res.status(500).send(errorMessage)
		console.log(err);
	}
})
// !SECTION 

// Exports the express router
module.exports = router