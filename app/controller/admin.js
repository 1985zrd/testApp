var Artical = require("../models/artical.js");
var User = require("../models/user.js");
var Ad = require("../models/ad.js");
var fs = require("fs");

exports.admin = function(req, res){      //登录页面
	var json = {"food":[],"scenery":[],"game":[],"users":[],"imgS":[],"imgJ":[],"imgYX":[]};
	Artical.fetch({},function(err, articals){
		if(err){
			console.log(err)
		}
		articals.forEach(function(item, index){
			if(item.column == "美食"){
				json.food.push(item);
			}
			if(item.column == "美景"){
				json.scenery.push(item);
			}
			if(item.column == "游戏"){
				json.game.push(item);
			}
		});
		User.fetch({},function(err, users){
			if(err){
				console.log(err)
			}
			users.forEach(function(item, index){
				json.users.push(item);
			})
			Ad.fetch({},function(err, ads){
				ads.forEach(function(item, index){
					if(item.column == "美食"){
						json.imgS.push(item);
					}
					if(item.column == "美景"){
						json.imgJ.push(item);
					}
					if(item.column == "游戏"){
						json.imgYX.push(item);
					}
				});
				res.render('admin',{'title':'后台登录','articals': json});
			});
		});
	});
}

exports.disableArtical = function(req, res){      //登录页面
	var id = req.body.id;
	Artical.findById(id, function(err, artical){
		if(artical.disable == 0){
			Artical.update({"_id":id},{$set:{disable: 1}}, function(err){
				if(err){
					console.log(err)
				}
				res.send({"code":1,"message":"启用成功"});
			})
		}else{
			Artical.update({"_id":id},{$set:{disable: 0}}, function(err){
				if(err){
					console.log(err)
				}
				res.send({"code":1,"message":"禁用成功"});
			})
		}
	});
}
exports.disableUser = function(req, res){      //登录页面
	var id = req.body.id;
	User.findById(id, function(err, user){
		if(user.role == 0){
			User.update({"_id":id},{$set:{role: 1}}, function(err){
				if(err){
					console.log(err)
				}
				res.send({"code":1,"message":"启用成功"});
			})
		}else{
			User.update({"_id":id},{$set:{role: 0}}, function(err){
				if(err){
					console.log(err)
				}
				res.send({"code":1,"message":"禁用成功"});
			})
		}
	});
}

exports.upload = function(req, res){      //登录页面
	var file = req.file;
	var destUrl = "public/adImg/";
	var readStream = fs.createReadStream(file.path);
	var writeStream = fs.createWriteStream(destUrl+file.filename);
	readStream.pipe(writeStream);
	readStream.on('end', function () {
		console.log('copy end');
		fs.unlink(file.path, function(err){
			console.log(err)
		});
		res.render("proxy",{"callLink":"adImg/"+file.filename})
	});
	readStream.on('error', function () {
		console.log('copy error');
	});
}

exports.adSave = function(req, res){      //登录页面
	var id = req.body.id;
	var column = req.body.column;
	var url = req.body.url;
	var linkUrl = req.body.linkUrl;
	if(!id || id == "" || id == null){
		var _ad = new Ad({
			"column": column,
			"url": url,
			"linkUrl": linkUrl
		});
		_ad.save(function(err, obj){
			if(err){
				console.log(err)
			}
			res.send({"code": 1, "message": "成功"});
		});
	}else{
		Ad.update({"_id":id},{$set: {"linkUrl": linkUrl}}, function(err){
			if(err){
				console.log(err)
			}
			res.send({"code": 1, "message": "更新成功"});
		});
	}
}
