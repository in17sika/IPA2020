var jwt = require('../node_modules/jsonwebtoken')

function checkAuth(req, res, next) {
	var header = req.headers.authorization;
	
	if (typeof header !== 'undefined') {
		var token = req.headers.authorization.split(' ')[1];
		
		try {
			req.decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
		} catch (error) {
			res.status(403)
		}

		next();
		
	} else {
		res.sendStatus(403).send('no Bearer token')
	}
}

module.exports = checkAuth