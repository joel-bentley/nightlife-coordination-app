var Venue = require('../models/Venue.js');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

exports.getVenues = function(req, res) {

	yelp.search({ category_filter: 'bars', location: 'Ann Arbor, MI' })
		.then(function (data) {
			var venues = data.businesses.map(function(item) {
        return {
          name: item.name,
          url:item.url,
          image_url:item.image_url,
          snippet_text: item.snippet_text,
          attending: []
        };
      });

    	return res.json(venues);
		})
		.catch(function (err) {
		  console.error(err);
		});

  // Venue.find(function (err, venues) {
  //   if (err) return console.error(err);
	//
  //   res.json(venues);
  // });
};
