// ANCHOR Creats default user 'admin'.
var bcrypt = require('../../api/node_modules/bcrypt');
var users = async () => {
	return {
		users_id: 1,
		users_username: 'admin',
		users_password: await bcrypt.hash('admin', 10),
		users_firstname: 'admin',
		users_lastname: 'admin'
	}
}

exports.seed = async function (knex) {

	// ANCHOR In case tables aren't empty, tables will be deleted.
	await knex('users').del()
	await knex('applicants').del()
	await knex('dates').del()

	// ANCHOR Inserts created user 'admin'.
	await knex('users').insert(await users())

	// ANCHOR Inserts default dates in table 'dates'
	await knex('dates').insert([{
			dates_start: '01.01.2020',
			dates_end: '02.01.2020',
			dates_time: '13.00 Uhr',
			dates_relevant: 1
		},
		{
			dates_start: '08.01.2020',
			dates_end: '02.01.2020',
			dates_time: '13.00 Uhr',
			dates_relevant: 1
		},
		{
			dates_start: '15.01.2020',
			dates_end: '16.01.2020',
			dates_time: '13.00 Uhr',
			dates_relevant: 1
		},
		{
			dates_start: '22.01.2020',
			dates_end: '23.01.2020',
			dates_time: '13.00 Uhr',
			dates_relevant: 1
		},
		{
			dates_start: '29.01.2020',
			dates_end: '30.01.2020',
			dates_time: '13.00 Uhr',
			dates_relevant: 1
		},
		{
			dates_start: '01.02.2020',
			dates_end: '02.02.2020',
			dates_time: '13.00 Uhr',
			dates_relevant: 1
		}
	])

	// Inserts default applicants in table 'applicants'
	await knex('applicants').insert([{
			applicants_id: 1,
			applicants_firstname: 'Josiah',
			applicants_lastname: 'Schiess',
			applicants_age: 20,
			applicants_email: 'josiah.schiess@gmail.com',
			applicants_info: 'Allergisch auf Milch.',
			applicants_dates_id: 1,
			applicants_present: 1
		},
		{
			applicants_id: 2,
			applicants_firstname: 'Kabilan',
			applicants_lastname: 'Sivanamam',
			applicants_age: 21,
			applicants_email: 'kabilan.sivanamam@gmail.com',
			applicants_info: 'Allergisch auf Nüsse.',
			applicants_dates_id: 2,
			applicants_present: 0
		},
		{
			applicants_id: 3,
			applicants_firstname: 'James',
			applicants_lastname: 'Chibuzor',
			applicants_age: 20,
			applicants_email: 'james.chibuzor@gmail.com',
			applicants_info: 'Allergisch auf Geld.',
			applicants_dates_id: 3,
			applicants_present: 0
		},
	])

};