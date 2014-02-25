
/**
 * Module dependencies.
 */

var express 		= require('express');
var http 			= require('http');
var path 			= require('path');
var mongoose 		= require('mongoose');
var passport 		= require('passport');
var LocalStrategy	= require('passport-local').Strategy;

var User = require(path.join(__dirname, '/models/user.js'));

var app = express();

// Database 

mongoose.connect('mongodb://localhost/gem');

require('./config/passport')(passport);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
	console.log("Connected Successfully to Database!");
});


app.configure(function() {
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());

	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false
	});

	app.use(express.session({ secret: 'herpderp' }));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.urlencoded());
	app.use(express.methodOverride());	
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//route definitions
require(__dirname + '/controllers/index')(app, passport);
//require(__dirname + '/controllers/session/routes')(app)
require(__dirname + '/controllers/user/login')(app, passport);
require(path.join(__dirname) + '/controllers/user/routes')(app, passport);
require(path.join(__dirname) + '/controllers/user/login')(app, passport);
require(path.join(__dirname) + '/controllers/user/register')(app, passport);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

