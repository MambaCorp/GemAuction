
/**
 * Module dependencies.
 */

var express 		= require('express');
var http 			= require('http');
var path 			= require('path');
var mongoose 		= require('mongoose');
var passport 		= require('passport');
var RedisStore			= require('connect-redis')(express);
var LocalStrategy	= require('passport-local').Strategy;

var User = require(path.join(__dirname, '/server/models/user.js'));

var app = express();

// Database

mongoose.connect('mongodb://localhost/gem');

require('./server/config/passport')(passport);

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

	app.use(express.session({
		store: new RedisStore({
			host: 'localhost',
			port: 6379
		}),
		cookie: { maxAge: 3600000, httpOnly: true },
		secret: 'herpderp'
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'server/public')));

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'server/views'));
});





// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//route definitions
require(path.join(__dirname, '/server/controllers/index'))(app, passport);
require(path.join(__dirname, '/server/controllers/user/login'))(app, passport);
require(path.join(__dirname, '/server/controllers/user/routes'))(app, passport);
require(path.join(__dirname, '/server/controllers/user/register'))(app, passport);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

console.log(__dirname);
