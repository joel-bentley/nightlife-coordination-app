var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');

var User = require('../models/User');

function generateToken(user) {
  var payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment()
      .add(7, 'days')
      .unix(),
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * POST /auth/google
 * Sign in with Github
 */
exports.authGithub = function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userUrl = 'https://api.github.com/user';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code',
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(
    err,
    response,
    token
  ) {
    var accessToken = token.access_token;
    var headers = {
      Authorization: 'Bearer ' + accessToken,
      'User-Agent': 'NightlifeApp',
    };

    // Step 2. Retrieve user's profile information.
    request.get({ url: userUrl, headers: headers, json: true }, function(
      err,
      response,
      profile
    ) {
      if (profile.error) {
        return res.status(500).send({ message: profile.error.message });
      }

      // Step 3. Create a new user account or return an existing one.
      User.findOne({ 'github.userId': profile.id }, function(err, user) {
        if (user) {
          return res.send({ token: generateToken(user), user: user });
        }

        var newUser = new User();

        newUser.github.userId = profile.id;
        newUser.github.username = profile.login;
        newUser.github.displayName = profile.name;
        newUser.github.avatar = profile.avatar_url;
        newUser.searchLocation = '';

        newUser.save(function(err) {
          res.send({ token: generateToken(newUser), user: newUser });
        });
      });
    });
  });
};

exports.authGithubCallback = function(req, res) {
  res.send('Loading...');
};

// Authentication test middleware
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

exports.getProfile = function(req, res) {
  var profile = {};

  if (req.isAuthenticated() && req.user) {
    profile.github = req.user.github;

    User.findOne({ _id: req.user._id }).exec(function(err, result) {
      if (err) return console.error(err);

      profile.searchLocation = result.searchLocation || '';

      res.json(profile);
    });
  } else {
    profile = {
      github: {
        userId: '',
        username: '',
        displayName: '',
        avatar: '',
      },
      searchLocation: '',
    };

    res.json(profile);
  }
};
