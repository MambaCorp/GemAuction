var User = require('../../models/user.js')
var path = require('path');

/*
 * GET users listing.
 */
routes = function(app, passport){
	app.get('/user/list', function(req, res){
		User.find(function(err, users){
			if(!err){
				res.render(path.join(__dirname, '/views/userList.jade'), { users: users });				
			}else{
				console.log(err);
			}
		});
	});
};

module.exports = routes;