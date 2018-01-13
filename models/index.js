const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports.User = require('./user');
