'use strict';
//搜索页面搜索
(function(){
	$(".bigSearch .btn").click(function(){
		if( $("bigSearch input").val() == ""){
			return;
		};
		if( checkword( $(".bigSearch input").val() ) ){
			window.location.href = "/search?_search="+encodeURI( $(".bigSearch input").val() )
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
