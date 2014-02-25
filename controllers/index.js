var authenticateHelper = require('../libs/authenticateHelper.js')

/*
 * GET home page.
 */
routes = function(app, passport){
	app.get('/', authenticateHelper.isLoggedIn, function(req,res){
		res.render('index', { title: 'Express' });
	});
};

module.exports = routes;