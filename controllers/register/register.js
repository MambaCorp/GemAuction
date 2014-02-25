var User = require('../../models/user.js');
var passport = require('passport');

routes = function(app, passport){
	app.get('/signup', function(req, res){
		res.render(__dirname + '/views/signup.jade');
	});

	app.post('/signup', 
		passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup'
		})
	);
};

module.exports = routes;