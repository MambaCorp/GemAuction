var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var gemSchema = new Schema({
	name: { type: String, index: { unique: false } },
	size: Number,
	color: String,
	clarity: String,
	cut: String,
	price: Number 
});

module.exports = mongoose.model('Gem', gemSchema);