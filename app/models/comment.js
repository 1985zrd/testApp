'use strict';
var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment.js');

var comment = mongoose.model('comments', commentSchema);

module.exports = comment;
