var User = require('../../models/user.js');
var passport = require('passport');

routes = function(app, passport){

	app.get('/login', function(req, res) {
		res.render(__dirname + "/views/login", { user: new User() });
	});

	app.post('/login', passport.authenticate('local', { successRedirect: '/',
														  failureRedirect: '/user/list',
														  failureFlash: false }));

	/*app.get('/logout', function(req, res){
		if(req.session){
			LoginToken.remove({ email: req.currentUser.email }, function() {});
			res.clearCookie('loginToken');
			req.session.destory(function() {});
		}
		return res.redirect('/login');
	});

	app.get('/test', function(req, res){
		res.send('this is a test page');
	});
*/
}

module.exports = routes;