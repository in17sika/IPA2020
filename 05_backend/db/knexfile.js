// Update with your config settings.

module.exports = {

	development: {
	  client: 'mysql',
	  connection: {
		 host: 'localhost',
		 user: 'root',
		 database: 'tasterDay',
		 password: 'gibbiX123456'
	  },
	  pool: {
		 min: 2,
		 max: 10
	  },
	  migrations: {
		 tableName: 'knex_migrations'
	  }
	},
 
	staging: {
	  client: 'postgresql',
	  connection: {
		 database: 'my_db',
		 user:     'username',
		 password: 'password'
	  },
	  pool: {
		 min: 2,
		 max: 10
	  },
	  migrations: {
		 tableName: 'knex_migrations'
	  }
	},
 
	production: {
	  client: 'postgresql',
	  connection: {
		 database: 'my_db',
		 user:     'username',
		 password: 'password'
	  },
	  pool: {
		 min: 2,
		 max: 10
	  },
	  migrations: {
		 tableName: 'knex_migrations'
	  }
	}
 
 };
 