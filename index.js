const express = require('express');
const Keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

mongoose.connect(Keys.DevKeys.MongoDB.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [Keys.DevKeys.CookieKeys.sessionKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
