var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	account: { type: Schema.ObjectId, ref: 'Account' },
	email: { type: String, index: { unique: true } },
	firstName: String,
	lastName: String
});

module.exports = mongoose.model('User', userSchema);;