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

exports.get = function(req, res){      //获取评论
	var id = req.body._id, pageNow = req.body.pageNow, pageNum = req.body.pageNum;
	Comment.fetch({artical: id}, {"now": pageNow, "num": pageNum}, function(err, comments){
		if(err){
			res.send(err);
		}else{
			Comment.count({artical: id}, function(err, count){
				if(err){
					//res.send(err);
				}
				res.send({"comments": comments, "pageNow": pageNow, "totalPage": Math.ceil(parseInt(count)/parseInt(pageNum))});
			});
		}
	});
}
