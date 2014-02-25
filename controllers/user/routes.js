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

	app.post('/user/add', function(req, res){
		var user;
		console.log("POST: ");
		console.log(req.body);
		user = new UserModel({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		});

		user.save(function (err){
			if(!err){
				return console.log("user created: " + user.email);
			}else{
				return console.log(err);
			}
		});

		return res.redirect("/");
	});
};

module.exports = routes;