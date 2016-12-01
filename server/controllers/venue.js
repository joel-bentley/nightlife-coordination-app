var Venue = require('../models/Venue.js');


exports.getVenues = function(req, res) {

  Venue.find(function (err, venues) {
    if (err) return console.error(err);

    res.json(venues);
  });
};
