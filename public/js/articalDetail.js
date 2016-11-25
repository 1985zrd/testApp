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
	var off = true;
	$(".zan").click(function(){
		if(!off){
			return;
		}
		$(this).addClass("active");
		var num = parseInt( $(this).find("p").html() )+1;
		$(this).find("p").html(num);
		$.ajax({
			type: "POST",
			url: "/zan",
			data: {
				"_id": $(this).attr("code")
			},
			success: function(str){}
		});
		off = false;
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
})()
