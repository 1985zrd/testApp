'use strict';
//首页
(function(){
	if(getCookie('name')){
		$("input[name='username']").val( getCookie('name') );
		$(".rememberUser").addClass("active");
	};
	$(".rememberUser").click(function(){
		$(this).toggleClass("active");
	});

	$(document).keydown(function(e){
		if(e.keyCode==13){
			$(".loginBar input").click();
		}
	});
	$(".loginBar input").click(function(){
		if( checkMobile( $("input[name='username']").val() ) && testNum($("input[name='password']").val()) ){
			$.ajax({
				type: "POST",
				url: "/signin",
				data: {
					"username": $("input[name='username']").val(),
					"password": $("input[name='password']").val()
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
						if( $(".rememberUser").hasClass("active") ){
							setCookie('name', $("input[name='username']").val(),{"maxAge":86400*7});
						}else{
							removeCookie("name")
						}
						window.location.href = "/";
					}
				}
			});
		};
		if( !checkMobile( $("input[name='username']").val()) || !testNum($("input[name='password']").val()) ){
			var floatWindow = new PopUpBox();
			var content = "";
			if( !checkMobile( $("input[name='username']").val()) ){
				content = "请输入手机号";
			}
			if( !testNum($("input[name='password']").val()) ){
				content = "请输入6-16位数字与字母组合密码";
			}
			floatWindow.init({
				iNow:1,          // 确保一个对象只创建一次
				tBar:false,  
				time:1500,  
				content:content,     // 内容
				workBar:false
			});
		}
	});
})();
