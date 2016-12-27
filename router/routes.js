var multer  = require('multer')
var fs = require("fs");

var Index = require('../app/controller/index');
var User = require('../app/controller/user');
var Artical = require('../app/controller/artical');
var Admin = require('../app/controller/admin');
var Comment = require('../app/controller/comment.js');

var dynamicPath = function (req) {
    if (req.query.action == 'uploadimage') {//如果是上传图片
        if (req.session.isMe) {//如果是博主自己
            return '/uploadimage'
        } else {//其余的当作访客
            return '/visitorimage'
        }
    }
}
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = 'public/upload';

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, Date.now()+"."+file.mimetype.split("/")[1]);  
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })


module.exports = function(app){

	app.use(function(req, res, next) {
		app.locals.user = req.session.user
		next()
	})

	// 前端文章页面图片上传
	app.post('/upload', upload.single('uploadImg'), Artical.upload);
	// 后台广告图片上传
	app.post('/uploadAd', upload.single('uploadImg'), Admin.upload);
	//首页
	app.get('/', Index.index);

	//用户
	app.get('/signin', User.signinpage);   //用户登录页面获取
	app.post('/signin', User.signin);     //用户登录数据
	app.get('/register', User.register);   //用户注册页面获取
	app.post('/signup', User.signup);
	app.post('/logout', User.logout);
	app.get('/account', User.isSignin, User.account);

	//页面
	app.get('/scenery', Artical.scenery);
	app.get('/game', Artical.game);
	app.get('/artical', Artical.artical);
	app.get('/search', Artical.search);
	app.get('/writeArtical', User.isSignin, Artical.writeArtical);
	app.post('/newArtical', User.isSignin, Artical.newArtical);

	app.post('/getArticalPage', Artical.page);
	app.post('/getSearchData', Artical.searchData);

	//添加评论
	app.post('/comment', Comment.save);
	app.post('/zan', Comment.zan);
	app.post('/share', Comment.share);

	app.post('/getComments', Comment.get);

	app.post('/star', Artical.star);

	/*后台首页*/
	app.get('/admin', User.isSignin, User.hasAuthorities, Admin.admin);
	app.post('/disableArtical', User.isSignin, User.hasAuthorities, Admin.disableArtical);
	app.post('/disableUser', User.isSignin, User.hasAuthorities, Admin.disableUser);
	app.post('/adSave', User.isSignin, User.hasAuthorities, Admin.adSave);
	app.post('/adminLogout', User.isSignin, User.hasAuthorities, User.logout);

	app.post('/adminDeleteImg', User.isSignin, User.hasAuthorities, Admin.deleteImg);

	app.get("*", function(req, res){
		res.render("404", {"title": "No Found"});
	});

};
