'use strict';
//首页
(function(){
	if(getCookie('name')){
		$(".signIn input[name='username']").val( getCookie('name') );
		$(".rememberUser").addClass("active");
	};
	$("#signUp").click(function(){
		$(".signFrame").show();
		$(".signFrame .signUp").show();
		$(".signFrame .signIn").hide();
		$(".signFrame .recoverPassword").hide();
		$(".signFrame .title").html("用户注册");
	});
	$("#signIn").click(function(){
		$(".signFrame").show();
		$(".signFrame .signUp").hide();
		$(".signFrame .signIn").show();
		$(".signFrame .recoverPassword").hide();
		$(".signFrame .title").html("用户登录");
	});
	$(".signFrame .close").click(function(){
		$(".signFrame").hide();
	});
	$(".signFrame .recoverPasswordLink").click(function(){
		$(".signFrame .signUp").hide();
		$(".signFrame .signIn").hide();
		$(".signFrame .recoverPassword").show();
		$(".signFrame .title").html("找回密码");
	});
	$(".signFrame .signUpLink").click(function(){
		$("#signUp").click();
	});
	$(".signFrame .signInLink").click(function(){
		$("#signIn").click()
	});
	$(".rememberUser").click(function(){
		$(this).toggleClass("active");
	});

	$(".signIn .btn span").click(function(){
		if( checkMobile( $(".signIn input[name='username']").val() ) && testNum($(".signIn input[name='password']").val()) ){
			$.ajax({
				type: "POST",
				url: "/signin",
				data: {
					"username": $(".signIn input[name='username']").val(),
					"password": $(".signIn input[name='password']").val()
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
							setCookie('name', $(".signIn input[name='username']").val(),{"maxAge":86400*7});
						}else{
							removeCookie("name")
						}
						window.location.reload();
					}
				}
			});
		};
		if( !checkMobile( $(".signIn input[name='username']").val()) || !testNum($(".signIn input[name='password']").val()) ){
			var floatWindow = new PopUpBox();
			var content = "";
			if( !checkMobile( $(".signIn input[name='username']").val()) ){
				content = "请输入手机号";
			}
			if( !testNum($(".signIn input[name='password']").val()) ){
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
	$(".signUp .btn span").click(function(){
		if( checkMobile($(".signUp input[name='username']").val()) && testNum($(".signUp input[name='password']").val()) && isEmail($(".signUp input[name='email']").val()) && $(".signUp input[name='passwordSure']").val() == $(".signUp input[name='password']").val() ){
			$.ajax({
				type: "POST",
				url: "/signup",
				data: {
					"username": $(".signUp input[name='username']").val(),
					"password": $(".signUp input[name='password']").val(),
					"email": $(".signUp input[name='email']").val()
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
						window.location.reload();
					}
				}
			});
		}
		if( !checkMobile($(".signUp input[name='username']").val()) || !testNum($(".signUp input[name='password']").val()) || !isEmail($(".signUp input[name='email']").val()) || $(".signUp input[name='passwordSure']").val() != $(".signUp input[name='password']").val() ){
			var floatWindow = new PopUpBox();
			var content = "";
			if( !checkMobile( $(".signUp input[name='username']").val()) ){
				content = "请输入手机号";
			}
			if( !testNum($(".signUp input[name='password']").val()) ){
				content = "请输入6-16位数字与字母组合密码";
			}
			if( !isEmail($(".signUp input[name='email']").val()) ){
				content = "请输入正确邮箱";
			}
			if( $(".signUp input[name='passwordSure']").val() != $(".signUp input[name='password']").val() ){
				content = "2次输入密码不一致";
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
