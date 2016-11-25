'use strict';
var mongoose = require('mongoose');
var userSchema = require('../schemas/user.js');

var user = mongoose.model('users', userSchema);

module.exports = user;
