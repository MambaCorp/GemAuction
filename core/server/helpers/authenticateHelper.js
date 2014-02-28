authenticateHelper = function(){};

authenticateHelper.isLoggedIn = function(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		console.log('request authenticated');
		return next();

	console.log('request unauthenticated');
	// if they aren't redirect them to the login page
	res.redirect('/login');
};

module.exports = authenticateHelper;
