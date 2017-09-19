const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Keys = require('./config/keys');
const app = express();

passport.use(new GoogleStrategy({
	clientID: Keys.DevKeys.GoogleKeys.clientID,
	clientSecret: Keys.DevKeys.GoogleKeys.clientSecret,
	callbackURL:'/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
	console.log('accessToken, accessToken', 'refreshToken', refreshToken, 'profile', profile);
}));

app.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
