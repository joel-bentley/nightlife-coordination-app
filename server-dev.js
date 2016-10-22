// Module dependencies.
var express = require('express');
var bodyParser = require('body-parser');

// Create Express server.
var app = express();

// Express configuration.
app.set('port', process.env.API_PORT || 3001);

// Parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Values to serve to API routes

var isAuthenticated = false;

var clicks = 0;

var profile = {
        id: '123456789',
        displayName: 'Testing!!!',
        username: 'test',
        publicRepos: 42,
        avatar: 'http://localhost:3000/img/github_32px.png'
    };


// API routes.

app.get('/api/clicks', function(req, res) {
	res.json({
		clicks: clicks
	});
});

app.post('/api/clicks', function(req, res) {
	clicks++;
	res.sendStatus(200);
});

app.delete('/api/clicks', function(req, res) {
	clicks = 0;
	res.sendStatus(200);
});

app.get('/api/profile', function(req, res) {
	res.json(profile);
});


app.get('/auth/github', function(req, res) {
  isAuthenticated = true;
	res.sendStatus(200);
});

app.get('/logout', function(req, res) {
  isAuthenticated = false;
	res.sendStatus(200);
});


// Start Express server.
app.listen(app.get('port'), function() {
	console.log('API dev server listening on port %d.', app.get('port'));
});
