'use strict';
//首页
(function(){
	$(".articalH3").click(function(){
		$(this).siblings().toggle();
		$(".controlBar h3").removeClass("active");
		$(this).addClass("active");
	});
	$(".articalEdit li").click(function(){
		$(".contentBar").children().hide().eq($(this).index()).show();
		$(this).addClass("active").siblings().removeClass("active");
	});
	$(".imgH3").click(function(){
		$(".controlBar h3").removeClass("active");
		$(this).addClass("active");
		$(".articalEdit").hide().children().removeClass("active");
		$(".contentBar").children().hide().eq(3).show();
	});
	$(".userH3").click(function(){
		$(".controlBar h3").removeClass("active");
		$(this).addClass("active");
		$(".articalEdit").hide().children().removeClass("active");
		$(".contentBar").children().hide().eq(4).show();
	});

	$(".imgLoadControl li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".imgLoadOne").hide().eq($(this).index()).show();
	})

	!function(){
        laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
        laydate({elem: '#dataStar'});//绑定元素
    }();
    !function(){
        laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
        laydate({elem: '#dataEnd'});//绑定元素
    }();

    $("input[name='uploadImg']").change(function(e){
		if( judgePhotoExt( $(this).val() ) ){
			$(".uploadBtn form").submit();
		}
	});

    $(".articalEdit a").click(function(){
    	if($(this).html() == "禁用" || $(this).html() == "启用"){
    		var This = this;
    		$.ajax({
				type: "POST",
				url: "/disableArtical",
				data: {
					"id": $(this).parent().parent().attr("code")
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
						if($(This).html() == "禁用"){
							$(This).html("启用")
						}else{
							$(This).html("禁用")
						}
					}
				}
			});
    	}
    });

    $(".userList tbody a").click(function(){
    	if($(this).html() == "禁用" || $(this).html() == "启用"){
    		var This = this;
    		$.ajax({
				type: "POST",
				url: "/disableUser",
				data: {
					"id": $(this).parent().parent().attr("code")
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
						if($(This).html() == "禁用"){
							$(This).html("启用")
						}else{
							$(This).html("禁用")
						}
					}
				}
			});
    	}
    });

    $(".preview").click(function(){
    	if( $(".imgLoadControl li").eq(0).hasClass("active") ){
			loadupImg("imgS")
		}
		if( $(".imgLoadControl li").eq(1).hasClass("active") ){
			loadupImg("imgJ")
		}
		if( $(".imgLoadControl li").eq(2).hasClass("active") ){
			loadupImg("imgYX")
		}
    	function loadupImg(str){
    		$("."+str+" tbody tr").each(function(){
    			imgSave( this );
    		});
    	}
    	function imgSave(This){
    		var column = "";
    		if( $(".imgLoadControl li").eq(0).hasClass("active") ){
    			column = "美食";
    		}
    		if( $(".imgLoadControl li").eq(1).hasClass("active") ){
    			column = "美景";
    		}
    		if( $(".imgLoadControl li").eq(2).hasClass("active") ){
    			column = "游戏";
    		}
    		$.ajax({
				type: "POST",
				url: "/adSave",
				data: {
					"id": $(This).attr("code"),
					"column": column,
					"url": $(This).find("td").eq(1).html(),
					"linkUrl": $(This).find("input").val()
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
				}
			});
    	};
    });

	$(".signOut").click(function(){
		$.ajax({
			type: "POST",
			url: "/adminLogout",
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
