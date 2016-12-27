'use strict';
(function(){
	var starNum = parseInt($("input[name='star']").val());
	for(var i=0;i<starNum;i++){
		$(".star span").eq(i).addClass("on");
	}
	$(".share a").click(function(){
		$.ajax({
			type: "POST",
			url: "/share",
			data: {
				"_id": $("input[name='articalId']").val()
			},
			success: function(str){}
		});
	});

	var flag = true;
	$(".star span").click(function(){
		if(!flag){
			return;
		}
		$(".star span").removeClass("on");
		var index = $(this).index()+1;
		for(var i=0;i<index;i++){
			$(".star span").eq(i).addClass("on")
		}
		$.ajax({
			type: "POST",
			url: "/star",
			data: {
				"_id": $("input[name='articalId']").val(),
				"num": index
			},
			success: function(str){
				var floatWindow = new PopUpBox();
				var content = str.message;
				floatWindow.init({
					iNow:3,          // 确保一个对象只创建一次
					tBar:false,  
					time:1500,  
					content:content,     // 内容
					workBar:false
				});
			}
		});
		flag = false;
	});

	fnAjax("/getComments", {"_id": $("input[name='articalId']").val(),"pageNow": 1,"pageNum": 10}, commentData)

	function commentData(obj){
		$(".commentList").html("");
		$("#paging").html("");
		if(obj.comments && obj.comments.length>0){
			for(var i=0,len=obj.comments.length;i<len;i++){
				var oDiv = $("<div class='item'></div>");
				oDiv.html("<p class='info'>"+obj.comments[i].content+"</p>\
					<div class='border clear'>\
						<p class='userInfo left "+obj.comments[i].img+"'>"+String(obj.comments[i].from).replace(/(\d{3})\d{4}(\d{4})/,"$1****$2") +"<span>于"+new Date(parseInt(obj.comments[i].createTime,10)).toLocaleDateString()+" 发表</span></p>\
						<div class='right zan' code='"+obj.comments[i]._id+"'>"+obj.comments[i].nice+"</div>\
					</div>");
				oDiv.appendTo( $(".commentList") );
			}
			if(obj.totalPage>1){
				page({
                    id: 'paging',
                    nowNum: obj.pageNow,
                    allNum: obj.totalPage,
                    callBack: function(now,all){
                    	fnAjax("/getComments", {"_id": $("input[name='articalId']").val(),"pageNow": now,"pageNum": 10}, commentData)
                    }
                });
			}
		}
	};

	var off = true;
	$(".commentList").click(function(e){
		if( $(e.target).hasClass("zan") ){
			if(!off){
				return;
			}
			off = false;
			$.ajax({
				type: "POST",
				url: "/zan",
				data: {
					"_id": $(e.target).attr("code")
				},
				success: function(str){
					var floatWindow = new PopUpBox();
					var content = "";
					if(str.code == 1){
						$(e.target).addClass("active");
						var num = parseInt( $(e.target).html() )+1;
						$(e.target).html(num);
						content = "<p style='text-align:center'>成功</p>";
					}else{
						content = "<p style='text-align:center'>失败</p>";
					}
					floatWindow.init({
						iNow:0,          // 确保一个对象只创建一次
						tBar:false,  
						time:1500,  
						content:content,     // 内容
						workBar:false
					});
				}
			});
		}
	});
	
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
})()
