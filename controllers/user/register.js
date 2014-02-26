var User = require('../../models/user.js');
var passport = require('passport');
var path = require('path');

routes = function(app, passport){
	app.get('/register', function(req, res){
		res.render(path.join(__dirname, '/views/register.jade'));
	});

	app.post('/register', 
		passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup'
		})
	);
};

module.exports = routes;