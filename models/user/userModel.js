var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	email: String,
	firstName: String,
	lastName: String
});

var UserModel = mongoose.model('User', User);

module.exports = UserModel;