var path = require('path');

// GET /
exports.index = function(req, res) {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
};

// GET /logout
exports.getLogout = function(req, res) {
	req.logout();
	//res.redirect('/');
	console.log('logged out!!!!! false=', req.isAuthenticated());
	res.sendStatus(200);
};
