routes = function(app){
	app.get('/login', function(req, res) {
		res.render(__dirname + "/views/login", { title: "Login", stylesheet: "style" })
	});
}

module.exports = routes;