'use strict';
//页面头部搜索
(function(){
	$("#logout").click(function(){
		$.ajax({
			type: "POST",
			url: "/logout",
			data: {},
			success: function(str){
				var floatWindow = new PopUpBox();
				var content = str.message;
				floatWindow.init({
					iNow:0,          // 确保一个对象只创建一次
					tBar:false,  
					time:1500,  
					content:content,     // 内容
					workBar:false
				});
				if(str.code == 1){
					window.location.href = "/";
				}
			}
		});
	});
})();
