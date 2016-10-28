// Module dependencies.
var express = require('express');
var compression = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var dotenv = require('dotenv');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');

// Load environment variables from .env file.
dotenv.load();

// Controllers (route handlers).
var routeController = require('./controllers/route');
var clickController = require('./controllers/click');

// API keys and Passport configuration.
var passportConfig = require('./config/passport');

// Create Express server.
var app = express();

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('connected', function() {
	console.log('%s MongoDB connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', function() {
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	process.exit();
});
mongoose.Promise = global.Promise;

// Express configuration.
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(express.static(path.join(__dirname, '../client/build')));

// Primary app routes.
app.get(['/', '/profile', '/login', '/error'], passportConfig.isAuthenticated, routeController.index);

app.get('/logout', routeController.getLogout);

// OAuth authentication routes.
app.get('/auth/github', passport.authenticate('github'), function(req, res) {
	console.log('/auth/github');
});

app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res) {
    console.log('logged in!!!!!', req.isAuthenticated());
    res.redirect('/');
  });

// API routes.
app.get('/api/clicks', passportConfig.isAuthenticated, clickController.getClicks);
app.post('/api/clicks', passportConfig.isAuthenticated, clickController.addClick);
app.delete('/api/clicks', passportConfig.isAuthenticated, clickController.resetClicks);

app.get('/api/profile', passportConfig.isAuthenticated, function(req, res) {
	res.json(req.user.github);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

// Start Express server.
app.listen(app.get('port'), function() {
	console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});
