
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// Database 

mongoose.connect('mongodb://localhost/gem');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
	console.log("Connected Successfully to Database!")
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
	layout: false
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//route definitions
require(__dirname + '/controllers/index')(app)
require(__dirname + '/controllers/authentication/routes')(app)
require(__dirname + '/controllers/inventory/routes')(app)
require(__dirname + '/controllers/user/routes')(app)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
