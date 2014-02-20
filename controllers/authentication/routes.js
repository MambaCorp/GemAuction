routes = function(app){
	app.get('/login', function(req, res) {
		res.render(__dirname + "/views/login", { title: "Login", stylesheet: "style" })
	});

	app.get('/test', function(req, res){
		res.send('this is a test page');
	});
}

module.exports = routes;