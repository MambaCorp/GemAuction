var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginTokenModel = new Schema({
	email: { type: String, index:true },
	series: { type: String, index: true },
	token: { type: String, index: true }
});

LoginTokenModel.method('randomToken', function() {
	return Math.round((new Date().valueOf() * Math.random())) + '';
});

LoginTokenModel.pre('save', function(next){
	this.token = this.randomToken();

	if(this.isNew){
		this.series = this.randomToken();
	}

	next();
});

LoginTokenModel.virtual('id')
	.get(function(){
		return this._id.toHexString();
	});

LoginTokenModel.virtual('cookieValue')
	.get(function() {
		return JSON.stringify({ email: this.email, token: this.token, series: this.series });
	});


var LoginToken = mongoose.model('LoginToken', LoginTokenModel);

module.exports = LoginToken;