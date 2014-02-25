var User = require('../../models/user/user.js');

routes = function(app){
	
	app.get('/sessions/new', function(req, res){
		res.render(path.join(__dirname, '/views/login'), { user: new User() })
	});

	app.get('/login', function(req, res) {
		res.render(__dirname + "/views/login", { title: "Login", stylesheet: "style" })
	});

	app.get('/test', function(req, res){
		res.send('this is a test page');
	});
}

module.exports = routes;