// ANCHOR Requires all the necessary dependencies.
var config = require('./knexfile')['development'];
var knex = require('./node_modules/knex')(config);

// ANCHOR Exports dependency.
module.exports = knex;