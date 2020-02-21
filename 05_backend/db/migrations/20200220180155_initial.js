// ANCHOR this will be executed, if latest migration is initialized.
exports.up = async function (knex) {

	// ANCHOR Creates table 'dates'
	await knex.schema.createTable('dates', table => {
		table.integer('dates_id').primary()
		table.string('dates_start').notNullable()
		table.string('dates_end').notNullable()
		table.string('dates_time').defaultTo(20)
		table.boolean('dates_relevant').notNullable().defaultTo(1)
	})

	// ANCHOR Raw SQL Code because knex can't execute all of the settings like "increment"
	await knex.raw("ALTER TABLE `tasterDay`.`dates` CHANGE COLUMN `dates_id` `dates_id` INT(11) NOT NULL AUTO_INCREMENT;")

	// ANCHOR Creates table 'applicants'
	await knex.schema.createTable('applicants', table => {
		table.integer('applicants_id').primary()
		table.string('applicants_firstname').notNullable()
		table.string('applicants_lastname').notNullable()
		table.integer('applicants_age').notNullable()
		table.string('applicants_email').notNullable()
		table.text('applicants_info').notNullable()
		table.integer('applicants_dates_id').notNullable()
		table.foreign('applicants_dates_id').references('dates_id').inTable('dates')
		table.boolean('applicants_present').notNullable().defaultTo(0)
		table.boolean('applicants_notified').notNullable().defaultTo(0)
		table.timestamps(false, true)
	})

	// ANCHOR Raw SQL Code because knex can't execute all of the settings like "increment"
	await knex.raw("ALTER TABLE `tasterDay`.`applicants` CHANGE COLUMN `applicants_id` `applicants_id` INT(11) NOT NULL AUTO_INCREMENT;")

	// Creats table 'users'
	await knex.schema.createTable('users', table => {
		table.integer('users_id').primary()
		table.string('users_username').notNullable().unique()
		table.string('users_password').notNullable()
		table.string('users_firstname').notNullable()
		table.string('users_lastname').notNullable()
	})

	// ANCHOR Raw SQL Code because knex can't execute all of the settings like "increment"
	await knex.raw("ALTER TABLE `tasterDay`.`users` CHANGE COLUMN `users_id` `users_id` INT(11) NOT NULL AUTO_INCREMENT;")
};

// ANCHOR this will be executed, if migrations are rolled back.
exports.down = async function (knex) {
	await knex.schema.dropTable('users')
	await knex.schema.dropTable('applicants')
	await knex.schema.dropTable('dates')
};