var User = require('../../models/user/user.js')
var path = require('path');

/*
 * GET users listing.
 */
routes = function(app){
	app.get('/user/list', function(req, res){
		User.find(function(err, users){
			if(!err){
				res.render(path.join(__dirname, '/views/userList.jade'), { users: users });				
			}else{
				console.log(err);
			}
		});
	});

	app.post('/register/new', function(req, res){
		var user = new User(req.body.user);


		function userSaveFailed(){
			req.flash('error', 'Account create failed!');
			res.render('/register', { user: new User() });
		}

		user.save(function(err){
			if(err) userSaveFailed();
			return console.log('user create: ' + user.email);
		});

		return res.redirect("/register");

	});

	app.get('/register', function(req, res){
		res.render(path.join(__dirname, '/views/register.jade'), { user: new User() });
	});
};

module.exports = routes;