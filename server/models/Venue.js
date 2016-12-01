var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venue = new Schema({
  name: String,
  url: String,
  image_url: String,
  snippet: String,
  attending: Array
});

module.exports = mongoose.model('Venue', Venue);
