var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-login', 
	new LocalStrategy({
		usernameField: 'user[email]',
		passwordField: 'user[password]',
		passReqToCallback: true	
	},
	function(req, username, password, done){
		User.findOne({ email: username }, function(err, user){
			console.log("testing12345");
			if(err) {
				console.log("error");
				return done(err);
			}
				
			if(!user){
				console.log('invalid user');
				return done(null, false, { message: 'that user does not exist' });
			}
				
			if(!user.validPassword(password)) {
				console.log('invalid password');
				return done(null, false, { message: 'password was incorrect' });
			}

			return done(null, user);
		});
	}));

	passport.use('local-signup',
	new LocalStrategy({
		usernameField: 'user[email]',
		passwordField: 'user[password]',
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function() {
			User.findOne({ email: username }, function(err, user){
				if(err) return done(err);

				if(user) {
					return done(null, false, { message: 'that email already exists' });
				}else{
					var newUser = new User();
					newUser.email = username;
					newUser.password = newUser.generateHash(password);
					newUser.firstName = req.body.user.firstName;
					newUser.lastName = req.body.user.lastName;

					newUser.save(function(err){
						if(err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};

