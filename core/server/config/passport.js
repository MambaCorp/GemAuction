var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');
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
		Account.findOne({ email: username }, function(err, account){
			if(err) {				
				return done(err);
			}
				
			if(!account){				
				return done(null, false, { message: 'that user does not exist' });
			}
				
			if(!account.validPassword(password)) {				
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
			Account.findOne({ email: username }, function(err, account){
				if(err) return done(err);

				if(account) {
					return done(null, false, { message: 'that email already exists' });
				}else{
					var newAccount = new Account();
					newAccount.email = username;
					newAccount.password = newAccount.generateHash(password);

					newAccount.save(function(err, createdAccount){
						if(err) throw err;

						if(createdAccount) {
							var newUser = new User();
							newUser.firstName = req.body.user.firstName;
							newUser.lastName = req.body.user.lastName;
							newUser.email = username;
							newUser.account = createdAccount.id;
							
							newUser.save(function(err){
								if(err) throw err;

								return done(null, newUser);
							});
						}
					});				
				}
			});
		});
	}));
};

