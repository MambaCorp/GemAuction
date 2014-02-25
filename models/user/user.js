var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

function validatePresenceOf(value){
	return value && value.length;
}

var UserModel = new Schema({
	email: { type: String, validate: [ validatePresenceOf, 'an email is required' ], index: { unique: true } },
	firstName: String,
	lastName: String,
	hashed_password: String,
	salt: String
});

UserModel.virtual('id')
	.get(function(){
		return this._id.toHexString();
	});

UserModel.virtual('password')
	.set(function(password){
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() { return this._password });

UserModel.method('authenticate', function(plainText){
	return this.encryptPassword(plainText) === this.hashed_password;
});

UserModel.method('makeSalt', function(){
	return Math.round((new Date().valueOf() * Math.random())) + '';
});

UserModel.method('encryptPassword', function(password){
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
})

UserModel.pre('save', function(next){
	if(!validatePresenceOf(this.password)){
		next(new Error('invalid password'));
	}else{
		next();
	}
});

var User = mongoose.model('User', UserModel);

module.exports = User;