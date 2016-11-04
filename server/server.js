// Module dependencies.
var express = require('express');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var dotenv = require('dotenv');
var path = require('path');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

// Load environment variables from .env file.
dotenv.load();

// Models
var User = require('./models/User');

// Controllers (route handlers).
var userController = require('./controllers/user');
var routeController = require('./controllers/route');
var clickController = require('./controllers/click');

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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});


app.use(express.static(path.join(__dirname, '../client/build')));

// Primary app routes.
app.get(['/', '/profile', '/login', '/error'], userController.ensureAuthenticated, routeController.index);

// OAuth authentication routes.
app.post('/auth/github', userController.authGithub);
app.get('/auth/github/callback', userController.authGithubCallback);

// API routes.
app.get('/api/clicks', userController.ensureAuthenticated, clickController.getClicks);
app.post('/api/clicks', userController.ensureAuthenticated, clickController.addClick);
app.delete('/api/clicks', userController.ensureAuthenticated, clickController.resetClicks);

app.get('/api/profile', userController.ensureAuthenticated, function(req, res) {
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
