'use strict';
(function(){
	$(".entryBar textarea").keyup(function(){
		var str = $(this).val();
		if($(this).val().length>140){
			$(this).val( str.substring(0,140) )
		}
		$(".sendNum").html($(this).val().length+"/140");
	});
	$(".sendComment").click(function(){
		if( $(".entryBar textarea").val().length>140 ){
			var floatWindow = new PopUpBox();
			var content = "评论字数不能大于140";
			floatWindow.init({
				iNow:1,          // 确保一个对象只创建一次
				tBar:false,  
				time:1500,  
				content:content,     // 内容
				workBar:false
			});
			return;
		}
		$.ajax({
			type: "POST",
			url: "/comment",
			data: {"artical": $("input[name='articalId']").val(),
					"content": $(".entryBar textarea").val(),
					"title": $(".title").html()
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
	})
})()
