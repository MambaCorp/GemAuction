var User = require('../../models/user.js');
var passport = require('passport');
var path = require('path');

routes = function(app, passport){
	app.get('/signup', function(req, res){
		res.render(path.join(__dirname, '/views/signup.jade'));
	});

	app.post('/signup', 
		passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup'
		})
	);
};

module.exports = routes;