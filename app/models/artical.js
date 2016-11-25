'use strict';
var mongoose = require('mongoose');
var articalSchema = require('../schemas/artical.js');

var artical = mongoose.model('artical', articalSchema);

module.exports = artical;
