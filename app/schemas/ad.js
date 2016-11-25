'use strict';
var mongoose = require('mongoose');

var adSchema = new mongoose.Schema({
	column: String,   //栏目
	url: String,
	linkUrl: String,
	createTime: {
		type:Date,
		default:Date.now()
	},
	updateTime: {
		type:Date,
		default:Date.now()
	}
});

adSchema.pre('save', function(next){
	this.updateTime = Date.now();
	next();

});


adSchema.statics = {
	fetch: function(obj,cb){
		return this
		.find(obj)
		.sort({'createTime':-1})
		.skip(0)
		.limit(100)
		.exec(cb)
	},
	findById: function(id, cb){
		return this
		.findOne({_id: id})
		.exec(cb)
	}
}

module.exports = adSchema
