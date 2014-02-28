var User = require('../../models/user.js');

routes = function(app, passport){

	app.get('/login', function(req, res) {
		res.render(__dirname + "/views/login", { user: new User() });
	});

	app.post('/login', passport.authenticate('local-login',
		{
			successRedirect: '/',
		  	failureRedirect: '/user/list'
		}));


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});
}

module.exports = routes;
