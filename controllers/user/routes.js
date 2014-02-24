var UserModel = require('../../models/user/userModel.js')
var path = require('path');

/*
 * GET users listing.
 */
routes = function(app){
	app.get('/user/list', function(req, res){
		UserModel.find(function(err, users){
			if(!err){
				res.render(path.join(__dirname, '/views/userList.jade'), { users: users });				
			}else{
				console.log(err);
			}
		});
	});

	app.get('/user', function(req, res){
		res.render(path.join(__dirname, '/views/addUser.jade'), { title: "Add User" });
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