var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  github: {
    userId: String,
    displayName: String,
    username: String,
    avatar: String,
  },
  searchLocation: String,
});

module.exports = mongoose.model('User', User);
