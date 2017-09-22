const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Keys = require('../config/keys');

const User = mongoose.model('users')

passport.serializeUser((User, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	});
});

passport.use(new GoogleStrategy({
	clientID: Keys.DevKeys.GoogleKeys.clientID,
	clientSecret: Keys.DevKeys.GoogleKeys.clientSecret,
	callbackURL:'/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({ googleID: profile.id })
	.then((existingUser) => {
		if (existingUser) {
			done(null, existingUser);
		} else {
			new User({ googleID: profile.id }).save()
			.then(user => done(null, user));
		}
	});
}));
