var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venue = new Schema({
  venueId: String, // venue.id from Yelp API
  usersAttending: Array, // [{ userId, date }]
});

module.exports = mongoose.model('Venue', Venue);
