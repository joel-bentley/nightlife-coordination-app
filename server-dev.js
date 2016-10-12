// Module dependencies.
var express = require('express');

// Create Express server.
var app = express();

// Express configuration.
app.set('port', process.env.API_PORT || 3001);



// Values to serve to API routes

var clicks = 0;

var profile = {
        id: '123456789',
        displayName: 'Testing!!!',
        username: 'test',
        publicRepos: 42
    };


// API routes.

app.get('/api/clicks', function(req, res) {
	res.json({
		clicks: clicks
	});
});

app.post('/api/clicks', function(req, res) {
	clicks++;
	res.send(200);
});

app.delete('/api/clicks', function(req, res) {
	clicks = 0;
	res.send(200);
});

app.get('/api/profile', function(req, res) {
	res.json(profile);
});

app.get('/logout', function(req, res) {
	res.send(200);
});



// Start Express server.
app.listen(app.get('port'), function() {
	console.log('API dev server listening on port %d.', app.get('port'));
});
