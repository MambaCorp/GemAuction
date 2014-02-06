routes = function(app){
	app.get('/inventory', function(req, res){
		res.render(__dirname + '/views/inventory', { title: "Inventory", stylesheet: "inventory" })
	});
}

module.exports = routes;