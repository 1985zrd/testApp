'use strict';
//页面头部搜索
(function(){
	$("header .search .btn").click(function(){
		if( $("header .search input").val() == ""){
			return;
		};
		if( checkword( $("header .search input").val() ) ){
			window.location.href = "/search?_search="+encodeURI( $("header .search input").val() )
		}else{
			var floatWindow = new PopUpBox();
		    var content = "<p style='text-align:center'>请输入中文</p>";
			floatWindow.init({
				iNow:0,          // 确保一个对象只创建一次
				tBar:false,  
				time:1500,  
				content:content,     // 内容
				workBar:false
			});
		}
		return false;
	});
})();
