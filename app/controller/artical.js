var Artical = require("../models/artical.js");
var Comment = require('../models/comment.js');

exports.scenery = function(req, res){   //美景
	Artical.fetch({"column":"美景","disable": 1},function(err, arr){
		if(err){
			//res.send(err);
		}
		Ad.fetch({"column":"美景"},function(err, ad){
			if(err){
				//res.send(err);
			}
			res.render('scenery',{'title':'美景','arr': arr?arr:[],"ad":ad?ad:[]});
		});
	});
}

exports.game = function(req, res){   //游戏
	Artical.fetch({"column":"游戏","disable": 1},function(err, arr){
		if(err){
			res.send(err);
		}
		Ad.fetch({"column":"游戏"},function(err, ad){
			if(err){
				//res.send(err);
			}
			res.render('game',{'title':'游戏','arr': arr?arr:[],"ad":ad?ad:[]});
		});
	});
}

exports.artical = function(req, res){   //文章
	Artical.findById(req.query._id,function(err, obj){
		var starNum = 0;
		var num = 0;
		for(var i=0,len=obj.star.length;i<len;i++){
			num+=parseInt(obj.star[i]);
		}
		starNum = Math.round(num/obj.star.length);
		

		Comment.find({artical: req.query._id})
		.sort({'createTime':-1})
		.exec(function(err, comments){
			if(err){
				res.send(err);
			}else{
				Artical.update({_id:req.query._id},{$inc: {viewNum: 1}}, function(err){
					if(err){
						console.log(err)
					}
				});
				res.render('artical',{'title':'文章','obj': obj?obj:{},"arr":comments,"starNum":starNum
				});
			}
		})
	});
}

exports.search = function(req, res){    //搜索
	Artical.fetch({"title": {$regex: req.query._search, $options:'i'},"disable": 1},function(err, arr){
		if(err){
			res.send(err);
		}else{
			res.render('search',{'title':'搜索','arr': arr?arr:[]});
		}
	});
}
	
exports.writeArtical = function(req, res){     //文章编写
	res.render('writeArtical',{'title':'编写文章'});
}

exports.newArtical = function(req, res){      //保存新文章
	if(!req.session.user){
		res.send({"code":0,"message":"用户未登录"});
		return;
	}
	var _artical = new Artical({
		column: req.body.column,
		title: req.body.title,
		author: req.session.user.username,
		source: req.body.source,
		sourceLink: req.body.sourceLink,
		imgLink: req.body.imgLink,
		address: req.body.address,
		describe: req.body.describe,
		articalContent: req.body.articalContent
	});
	_artical.save(function(err, obj){
		if(err){
			res.json({"code": 0, "message": err});
			return;
		}
		res.json({"code": 1, "message": "成功"});
	});
}

exports.upload = function(req, res){  //图片上传
	var file = req.file;
    //res.send("<script>top.window.test("+req.file.path+")</script>");
    res.render("proxy",{"callLink":req.file.path})
}

exports.star = function(req, res){  //图片上传
	Artical.update({_id:req.body._id},{$push: {star: req.body.num}}, function(err){
		if(err){
			console.log(err)
			res.send({"code": 0, "message": "评论失败"});
			return;
		}
		res.send({"code": 1, "message": "评论成功"});
	});
}
