var express = require('./node_modules/express')
var app = express()
var checkAuth = require('./middleware/checkAuth')

// SECTION Router use
app.use(express.json())

// ANCHOR app (express) listens to port 3000 and logs the statement below.
var port = 3000
app.listen(port, () => console.log('Listening to port ' + port))

// ANCHOR Requires route for visitors and uses all the endpoints in required file.
var visitorsRoute = require('./routes/visitors')
app.use('/visitors', visitorsRoute)

// ANCHOR Requires route for employees, checks auth and then uses all endpoints in required file.
var employeeRoute = require('./routes/employees')
app.use('/employees', checkAuth, employeeRoute)

// ANCHOR Logs all reqs.
app.use(function (req, res, next) {
	console.log(`${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()} | ${req.method} request on ${req.originalUrl}`);
	next()
});
// !SECTION 