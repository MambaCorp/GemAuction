var User = require('../../models/user/user.js');
var LoginToken = require('../../models/session/loginToken.js');

routes = function(app){

	app.get('/login', function(req, res) {
		res.render(__dirname + "/views/login", { user: new User() });
	});

	app.post('/session', function(req, res){
		User.findOne({ email: req.body.user.email }, function(err, user){
			if (err) {
				console.log('cant find user with email: ' + req.body.user.email);
				res.redirect('/login')
			}			

			if(user && user.authenticate(req.body.user.password)){
				req.session.user_id = user.id;

				if(req.body.remember_me){
					var loginToken = new LoginToken({ email: user.email });
					loginToken.save(function() {
						res.cookie('loginToken', loginToken.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
						res.redirect('/');
					});
				}else{
					res.redirect('/')
				}
			}else{
				console.log('failed to authenticate for user: ' + user.id);
				res.redirect('/login');
			}
		});
	});

	app.get('/test', function(req, res){
		res.send('this is a test page');
	});
}

module.exports = routes;