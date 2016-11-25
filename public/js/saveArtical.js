'use strict';
//首页
(function(){
	$(".column .selectedList").click(function(){
		$(".column ul").toggle();
		$(document).click(function(){
			$(".column ul").hide();
		});
		return false;
	});
	$(".column li").click(function(){
		$(".column .selectedList").html( $(this).html() );
		$(".column ul").hide();
	});

	$(".uploadBtn input").change(function(e){
		if( judgePhotoExt( $(this).val() ) ){
			$(".uploadBtn form").submit();
		}
	});

	$(".describe textarea").keyup(function(){
		var str = $(this).val();
		if($(this).val().length>140){
			$(this).val( str.substring(0,140) )
		}
		$(".wordLimit").html($(this).val().length+"/140");
	});

	$(".subBtn input").click(function(){
		if( $(".position .selectedList").html() == "" || $(".title input").val() == "" || $(".imgLink img").length<=0 || $(".describe textarea").val() == "" || $(".describe textarea").val().length > 140){
			var floatWindow = new PopUpBox();
			var content = "";
			if( $(".position .selectedList").html() == "" ){
				content = "<p style='text-align:center'>请选择所属栏目</p>";
			}else if( $(".title input").val() == "" ){
				content = "<p style='text-align:center'>请输入文字标题</p>";
			}else if( $(".imgLink img").length<=0 ){
				content = "<p style='text-align:center'>请上传外链图片</p>";
			}else if( $(".describe textarea").val() == "" ){
				content = "<p style='text-align:center'>请输入描述文字</p>";
			}else if( $(".describe textarea").val().length > 140 ){
				content = "<p style='text-align:center'>描述文字不能多于140个字</p>";
			}
			floatWindow.init({
				iNow:0,          // 确保一个对象只创建一次
				tBar:false,  
				time:1500,  
				content:content,     // 内容
				workBar:false
			});
			return;
		};
		$.ajax({
			type: "POST",
			url: "/newArtical",
			data: {"column": $(".position .selectedList").html(),
					"title": $(".title input").val(),
					"source": $(".source input").val(),
					"sourceLink": $(".sourceLink input").val(),
					"imgLink": $(".imgLink img").attr("src"),
					"address": $(".address input").val(),
					"describe": $(".describe textarea").val(),
					"articalContent": UE.getEditor('editor').getContent()
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
	});
})();
