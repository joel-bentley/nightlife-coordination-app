var User = require('../models/User.js');

exports.getClicks = function(req, res) {
	User.findOne({
		'github.id': req.user.github.id
	}, {
		'_id': false
	}).exec(function(err, result) {
		if (err) {
			throw err;
		}

		res.json(result.nbrClicks);
	});
};

exports.addClick = function(req, res) {
	User.findOneAndUpdate({
		'github.id': req.user.github.id
	}, {
		$inc: {
			'nbrClicks.clicks': 1
		}
	}).exec(function(err, result) {
		if (err) {
			throw err;
		}

		res.sendStatus(200);
	});
};

exports.resetClicks = function(req, res) {
	User.findOneAndUpdate({
		'github.id': req.user.github.id
	}, {
		'nbrClicks.clicks': 0
	}).exec(function(err, result) {
		if (err) {
			throw err;
		}

		res.sendStatus(200);
	});
};
