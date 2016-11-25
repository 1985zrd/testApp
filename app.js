var express = require('express');
var path = require('path');
var mongoose = require("mongoose");
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var port = process.env.PORT || 3000;
var app = express();

var dbUrl = 'mongodb://localhost/test';
mongoose.connect(dbUrl);

var ueditor = require('ueditor-nodejs');
app.use('/ueditor/ue', ueditor({//这里的/ueditor/ue是因为文件件重命名为了ueditor,如果没改名，那么应该是/ueditor版本号/ue
    configFile: '/ueditor/jsp/config.json',//如果下载的是jsp的，就填写/ueditor/jsp/config.json
    mode: 'local', //本地存储填写local bcs
    accessKey: 'Adxxxxxxx',//本地存储不填写，bcs填写 Adxxxxxxx
    secrectKey: 'oiUqt1VpH3fdxxxx',//本地存储不填写，bcs填写
    staticPath: path.join(__dirname, 'public'), //一般固定的写法，静态资源的目录，如果是bcs，可以不填
    dynamicPath: '/blogpicture' //动态目录，以/开头，bcs填写buckect名字，开头没有/.路径可以根据req动态变化，可以是一个函数，function(req) { return '/xx'} req.query.action是请求的行为，uploadimage表示上传图片，具体查看config.json.
}));

app.set('views', './app/views/pages/');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use( cookieParser() );

app.use(session({
	secret: 'testApp',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
  resave:true,
  saveUninitialized:true
}));

var env = process.env.NODE_ENV || 'development'   //'production'   生产环境
if ('development' === env) {
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}  

require('./router/routes.js')(app);

app.listen(port);



