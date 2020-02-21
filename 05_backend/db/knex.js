var config = require('./knexfile')['development'];
var knex = require('./node_modules/knex')(config);

module.exports = knex;