var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	email: String,
	firstName: String,
	lastName: String
});

module.exports = User;