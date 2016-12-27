'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var CommentSchema = new Schema({
	artical: {type: ObjectId, ref: 'Artical'},
	from: String,
	content: String,
	title: String,
	img: {
		type: String,
		default: "hearts"
	},
	nice: {
		type: Number,
		default: 0
	},
	createTime: {
		type:Date,
		default:Date.now()
	},
	updateTime: {
		type:Date,
		default:Date.now()
	}
});

CommentSchema.pre('save', function(next){
	this.updateTime = Date.now();

	next();
});


CommentSchema.statics = {
	fetch: function(obj, page, cb){
		return this
		.find(obj)
		.sort({'createTime':-1})
		.skip((parseInt(page.now)-1)*parseInt(page.num))
		.limit(parseInt(page.num))
		.exec(cb)
	},
	findById: function(id, cb){
		return this
		.findOne({_id: id})
		.exec(cb)
	}
}

module.exports = CommentSchema
