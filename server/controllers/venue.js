var Yelp = require('yelp');

var Venue = require('../models/Venue.js');
var User = require('../models/User');

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

exports.getVenues = function(req, res) {
  var searchLocation = req.query.loc || '';

  if (req.isAuthenticated() && req.user) {
    User.findOneAndUpdate({
      '_id': req.user._id
    }, {
      $set: {
        searchLocation: searchLocation
      }
    }).exec(function(err, result) {
      if (err) return console.error(err);
    });
  }

	yelp.search({ category_filter: 'bars', location: searchLocation })
		.then(data => {
			return data.businesses.map( venue => {

        return {
          name: venue.name,
          id: venue.id,
          url: venue.url,
          image_url: venue.image_url,
          address: venue.location.display_address,
          snippet_text: venue.snippet_text,
        };
      });
    })
    .then( venues => {
      var userId;

      if (req.isAuthenticated() && req.user) {
        userId = req.user._id.toString();
      }

      return Promise.all( venues.map( venue => {

        return new Promise(function(resolve, reject) {

          Venue.find({ venueId: venue.id })
            .exec(function(err, result) {
              if (err) return console.error(err);

      		    if (result.length > 0) {
                venue.numberAttending = result.usersAttending.length;

                if (userId) {
                  venue.isAttending = result.usersAttending
                    .map( rsvp => (rsvp.userId))
                    .includes(userId);
                }
              } else {
                venue.numberAttending = 0;
                venue.isAttending = false;
              }
              resolve(venue);
      	    });
        });
      }));

		})
    .then( venues => {
      res.json(venues);
    })
		.catch( err => {
		  console.error(err);
		});

};

exports.postRsvp = function(req, res) {

};

exports.deleteRsvps = function(req, res) {

};
