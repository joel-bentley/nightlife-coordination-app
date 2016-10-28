var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// Sign in with GitHub.
passport.use(new GitHubStrategy({
		clientID: process.env.GITHUB_KEY,
		clientSecret: process.env.GITHUB_SECRET,
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	function(token, refreshToken, profile, done) {
		process.nextTick(function() {
			User.findOne({
				'github.id': profile.id
			}, function(err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				}
				else {
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.github.avatar = profile._json.avatar_url;

					newUser.save(function(err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));

// Login Required middleware.
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	//res.redirect('/login');
	res.sendStatus(200);
};
