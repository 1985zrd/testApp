'use strict';
//首页
(function(){
	$(document).keydown(function(e){
		if(e.keyCode==13){
			$(".loginBar input").click();
		}
	});
	$(".loginBar input").click(function(){
		if( checkMobile($("input[name='username']").val()) && testNum($("input[name='password']").val()) && isEmail($("input[name='email']").val()) && $("input[name='passwordSure']").val() == $("input[name='password']").val() ){
			$.ajax({
				type: "POST",
				url: "/signup",
				data: {
					"username": $("input[name='username']").val(),
					"password": $("input[name='password']").val(),
					"email": $("input[name='email']").val()
				},
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
		}
		if( !checkMobile($("input[name='username']").val()) || !testNum($("input[name='password']").val()) || !isEmail($("input[name='email']").val()) || $("input[name='passwordSure']").val() != $("input[name='password']").val() ){
			var floatWindow = new PopUpBox();
			var content = "";
			if( !checkMobile( $("input[name='username']").val()) ){
				content = "请输入手机号";
			}
			if( !testNum($("input[name='password']").val()) ){
				content = "请输入6-16位数字与字母组合密码";
			}
			if( !isEmail($("input[name='email']").val()) ){
				content = "请输入正确邮箱";
			}
			if( $("input[name='passwordSure']").val() != $("input[name='password']").val() ){
				content = "2次密码输入不一致";
			}
			floatWindow.init({
				iNow:2,          // 确保一个对象只创建一次
				tBar:false,  
				time:1500,  
				content:content,     // 内容
				workBar:false
			});
		}
	});
})();
