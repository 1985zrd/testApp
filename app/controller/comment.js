var Comment = require("../models/comment.js");
var Artical = require("../models/artical.js");

exports.save = function(req, res){      //登录
	Artical.update({_id:req.body.artical},{$inc: {commentsNum: 1}}, function(err){
		if(err){
			console.log(err)
		}
	});
	if(!req.session.user){
		res.send({"code":0,"message":"用户未登录"});
		return;
	}
	var _comment = new Comment({
		artical: req.body.artical,
		content: req.body.content,
		from: req.session.user.username,
		img: req.session.user.img,
		title: req.body.title
	});
	_comment.save(function(err, comment){
		if(err){
			res.send({"code": 0, "message": err});
			return;
		}
		res.send({"code": 1, "message": "成功"});
	});
}
exports.zan = function(req, res){      //登录
	Comment.update({_id:req.body._id},{$inc: {nice: 1}}, function(err){
		if(err){
			console.log(err)
		}
		res.send({"code": 1, "message": "成功"});
	});
}

exports.share = function(req, res){      //登录
	Artical.update({_id:req.body._id},{$inc: {forwardNum: 1}}, function(err){
		if(err){
			console.log(err)
		}
		res.send({"code": 1, "message": "成功"});
	});
}
