'use strict';
//搜索页面搜索
(function(){
	$(".bigSearch input").val(window.location.search.split("=")[1]);
	$(".bigSearch .btn").click(function(){
		if( $("bigSearch input").val() == ""){
			return;
		};
		if( checkword( $(".bigSearch input").val() ) ){
			window.location.href = "/search?_search="+encodeURI( $(".bigSearch input").val() )
		}else{
			var floatWindow = new PopUpBox();
		    var content = "<p style='text-align:center'>请输入中文</p>";
			floatWindow.init({
				iNow:0,          // 确保一个对象只创建一次
				tBar:false,  
				time:1500,  
				content:content,     // 内容
				workBar:false
			});
		}
		return false;
	});
	$(".bigSearch input").change(function(){
		$(".bigSearch .btn").click();
	});

	var iPage = 1;
	var flag = true;

	function searchData(obj){
		if(obj.artical && obj.artical.length>0){
			for(var i=0,len=obj.artical.length;i<len;i++){
				var oA = $('<a href="artical?_id='+obj.artical[i]._id+'" class="item clear"></a>');
				oA.html('<div class="img left">\
						<img src="'+obj.artical[i].imgLink+'" alt="照片">\
					</div>\
					<div class="info left">\
						<p class="title">'+obj.artical[i].title+'</p>\
						<p class="author"><span>'+String(obj.artical[i].author).replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")+'</span><span>发表于'+new Date(parseInt(obj.artical[i].createTime,10)).toLocaleDateString()+'</span><span>更新于'+new Date(parseInt(obj.artical[i].updateTime,10)).toLocaleDateString()+'</span></p>\
						<p class="text">'+obj.artical[i].describe+'</p>\
						<div class="statistics clear">\
							<p class="left">'+obj.artical[i].viewNum+'览</p>\
							<p class="left">'+obj.artical[i].commentsNum+'评</p>\
							<p class="left">'+obj.artical[i].forwardNum+'转</p>\
						</div>\
					</div>');
				oA.appendTo( $(".itemH") );
			}
			flag = true;
		}else{
			$(".loadEndInfo").show();
		}
	};

	$(window).scroll(function(){
		var len = $(".itemH").children().length;
		if ( getTop( $(".itemH").children().eq(len-2)[0])  < ($(window).height() + $(window).scrollTop()) ) {
			if ( flag ) {
				flag = false;
				iPage++;
				fnAjax("/getSearchData", {"search": $(".bigSearch input").val(),"pageNow": iPage,"pageNum": 10}, searchData)
			}
		}
	}); 

	function getTop(obj) {
		var iTop = 0;
		while(obj) {
			iTop += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return iTop;
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
})();
