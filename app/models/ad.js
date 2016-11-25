'use strict';
var mongoose = require('mongoose');
var adSchema = require('../schemas/ad.js');

var ad = mongoose.model('ad', adSchema);

module.exports = ad;
