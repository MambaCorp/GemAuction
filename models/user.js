var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	email: { type: String, index: { unique: true } },
	firstName: String,
	lastName: String,
	password: String
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);;