
/*
 * GET users listing.
 */
routes = function(app){
	app.get('/list', function(req, res){
		res.send("this is the list action for user");
	});
};

module.exports = routes;