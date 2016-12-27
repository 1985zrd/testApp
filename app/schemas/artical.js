'use strict';
var mongoose = require('mongoose');

var artivalSchema = new mongoose.Schema({
	column: String,   //栏目
	title: String,    //标题
	author: String,    //作者
	source: String,    //来源
	sourceLink: String,    //来源地链接
	imgLink: String,    //宣传图片
	address: String,    //地址
	articalContent: String,    //文章内容
	describe: String,    //介绍
	disable:{           //是否可用
		type: Number,
		default: 1
	},
	star: {       //星级评论
		type: Array,
		default: []
	}, 
	viewNum: {     //浏览人数
		type: Number,
		default: 0
	}, 
	commentsNum: {    //评论人数
		type: Number,
		default: 0
	}, 
	forwardNum: {    //转发人数
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

artivalSchema.pre('save', function(next){
	this.updateTime = Date.now();
	next();
});

artivalSchema.statics = {
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

module.exports = artivalSchema
