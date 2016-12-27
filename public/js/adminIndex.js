'use strict';
//首页
(function(){
	getArticals({
		"elm": "articalListS",
		"column": "美食",
		"pageNow": 1,
		"paging": "pagingS"
	});
	getArticals({
		"elm": "articalListJ",
		"column": "美景",
		"pageNow": 1,
		"paging": "pagingJ"
	});
	getArticals({
		"elm": "articalListYX",
		"column": "游戏",
		"pageNow": 1,
		"paging": "pagingYX"
	});

	function getArticals(opt){
		fnAjax("/getArticalPage", {"column": opt.column,"pageNow": opt.pageNow,"pageNum": 10,"disable":"all"}, articalData);
		function articalData(obj){
			$("."+opt.elm+" tbody").html("");
			$("#"+opt.paging+"").html("");
			if(obj.artical && obj.artical.length>0){
				for(var i=0,len=obj.artical.length;i<len;i++){
					var oTr = $("<tr code='"+obj.artical[i]._id+"'></tr>");
					oTr.html("<td>"+((parseInt(obj.pageNow)-1)*10+i)+"</td>\
		                <td>"+obj.artical[i].author+"</td>\
		                <td>"+obj.artical[i].title+"</td>\
		                <td>"+new Date(parseInt(obj.artical[i].createTime,10)).toLocaleDateString()+"</td>\
	                <td><a href='javascript:'>编辑</a><a href='javascript:'>"+(obj.artical[i].disable==1?"禁用":"启用")+"</a></td>");
					oTr.appendTo( $("."+opt.elm+" tbody") );
				}
				if(obj.totalPage>1){
					page({
	                    id: opt.paging,
	                    nowNum: obj.pageNow,
	                    allNum: obj.totalPage,
	                    callBack: function(now,all){
	                    	getArticals({
								"elm": opt.elm,
								"column": opt.column,
								"pageNow": now,
								"paging": opt.paging
							});
	                    }
	                });
				}
			}
		};
	};
	function fnAjax(url, obj, cb){    //ajax获取数据
		$.ajax({    
			url:url,
			type:'post', 
			data:obj,
			success:function(str){
				cb && cb(str);
			}
		});
	};

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

    $(".articalEdit table").click(function(e){
    	if( $(e.target).html() == "禁用" || $(e.target).html() == "启用" ){
    		$.ajax({
				type: "POST",
				url: "/disableArtical",
				data: {
					"id": $(e.target).parent().parent().attr("code")
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
						if($(e.target).html() == "禁用"){
							$(e.target).html("启用")
						}else{
							$(e.target).html("禁用")
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

	//图片删除
	$("table").click(function(e){
		if($(e.target).hasClass("deleteImg")){
			$.ajax({
			type: "POST",
			url: "/adminDeleteImg",
			data: {"id": $(e.target).parent().parent().attr("code")},
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
				if(str.code == 0){
					$(e.target).parent().parent().remove();
				}
			}
		});
		}
	});
})();
