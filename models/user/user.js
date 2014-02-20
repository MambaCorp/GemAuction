var mongoose = require('mongoose');
var userSchema = require('./schema/user/user');



var User = mongoose.model('User', userSchema);