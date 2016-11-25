var Artical = require("../models/artical.js");
var Ad = require("../models/ad.js");

exports.index = function(req, res){   //首页
	Artical.fetch({"column":"美食","disable": 1},function(err, arr){
		if(err){
			res.send(err);
			return;
		}
		Ad.fetch({"column":"美食"},function(err, ad){
			if(err){
				//res.send(err);
				return;
			}
			res.render('index',{'title':'首页','arr': arr?arr:[],"ad":ad?ad:[]});
		});
	});
}
