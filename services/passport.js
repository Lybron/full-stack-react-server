const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Keys = require('../config/keys');

passport.use(new GoogleStrategy({
	clientID: Keys.DevKeys.GoogleKeys.clientID,
	clientSecret: Keys.DevKeys.GoogleKeys.clientSecret,
	callbackURL:'/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
	console.log('accessToken:, accessToken:', 'refreshToken:', refreshToken, 'profile', profile);
}));
