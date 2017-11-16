var path = require('path');

// GET /
exports.index = function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
};
