/**
 * export configured knex instance
 */
module.exports = require('knex')({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'technicalUser',
		password: 'gibbiX123456',
		database: 'tasterDay'
	}
})