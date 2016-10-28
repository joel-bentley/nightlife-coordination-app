var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
        publicRepos: Number,
        avatar: String
    },
    nbrClicks: {
        clicks: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model('User', User);
