var User = require("../models/user.js");
var Artical = require("../models/artical.js");
var Comment = require('../models/comment.js');

exports.signin = function(req, res){      //登录
	var username = req.body.username,password = req.body.password;
	User.findOne({username: username}, function(err, user){
		if(err){
			res.send({"code": 0, "message": "登录失败"});
			return;
		}
		if(!user){
			res.send({"code": 2, "message": "用户名未注册"});
			return;
		}
		if(user.role == 0){
			res.send({"code":9,"message":"用户被禁用"});
			return;
		}
		user.comparePassword(password, function(err, isMatch){
			if(err){
				res.send({"code": 0, "message": "登录失败"});
				return;
			}
			if( isMatch ){
				req.session.user = user;
				User.update({username:username},{$set: {updateTime: Date.now()}}, function(err){
					if(err){
						console.log(err)
					}
					res.send({"code": 1, "message": "登录成功"});
				});
			}else{
				res.send({"code": 3, "message": "密码不正确"});
			}
		});
	});
}

exports.signinpage = function(req, res){      //登录页面
    res.render('signin',{title:'用户登录'});
}

exports.register = function(req, res){      //用户注册
    res.render('register',{title:'用户注册'});
}

exports.signup = function(req, res){      //注册
	User.find({username: req.body.username}, function(err, user){
		if(err){
			res.send({"code": 0, "message": "注册失败"});
			return;
		}
		if(user.length>0){
			res.send({"code": 2, "message": "用户名已被注册"});
			return;
		}
		var userImg = ["hearts","spades","diamonds","clubs"];
		var _user = new User({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			img: userImg[Math.floor(Math.random()*4)]
		});
		_user.save(function(err, user){
			if(err){
				res.send({"code": 0, "message": "注册失败"});
				return;
			}
			req.session.user = user;
			res.send({"code": 1, "message": "注册成功"});
		});
	});
}

exports.logout = function(req, res){     //退出
	delete req.session.user
	//delete app.locals.user
	res.send({"code":1,"message":"退出成功"});
}

exports.account = function(req, res){     //我的账户
	Artical.fetch({"author":req.session.user.username},function(err, articals){
		if(err){
			console.log(err)
		}else{
			Comment.find({from: req.session.user.username})
			.sort({'createTime':-1})
			.exec(function(err, comments){
				if(err){
					console.log(err)
				}else{
					res.render('account',{'title':'我的账户','articals': articals?articals:[],"comments":comments?comments:[]
					});
				}
			})
		}
	});
}

exports.isSignin = function(req, res, next){
	var user = req.session.user;
	if(!user){
		res.redirect('/signin')
		return;
	}
	if(user.role == 0){
		res.send({"code":9,"message":"用户被禁用"});
		return;
	}
	next();
}

exports.hasAuthorities = function(req, res, next){
	var user = req.session.user;
	if( user.role < 10 || !user.role ){
		res.redirect('/')
		return;
	}
	next();
}

