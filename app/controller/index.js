var Artical = require("../models/artical.js");
var Ad = require("../models/ad.js");

exports.index = function(req, res){   //首页
	Artical.fetch({"column":"美食","disable": 1}, {"now": 1, "num": 10}, function(err, arr){
		if(err){
			res.send(err);
		}
		Ad.fetch({"column":"美食"},function(err, ad){
			if(err){
				//res.send(err);
			}
			res.render('index',{'title':'首页', "arr": arr?arr:[],"ad":ad?ad:[]});
		});
	});
}
