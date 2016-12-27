'use strict';
//首页
(function(){

	var iPage = 1;
	var flag = true;

	function articalData(obj){
		if(obj.artical && obj.artical.length>0){
			for(var i=0,len=obj.artical.length;i<len;i++){
				var oA = $('<a href="artical?_id='+obj.artical[i]._id+'" class="item left"></a>');
				oA.html('<div class="img">\
						<img src="'+obj.artical[i].imgLink+'" alt="照片">\
					</div>\
					<div class="info">\
						<p class="title">'+obj.artical[i].title+'</p>\
						<p class="author"><span>'+String(obj.artical[i].author).replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")+'</span><span>发表于'+new Date(parseInt(obj.artical[i].createTime,10)).toLocaleDateString()+'</span><span>更新于'+new Date(parseInt(obj.artical[i].updateTime,10)).toLocaleDateString()+'</span></p>\
						<p class="text">'+obj.artical[i].describe+'</p>\
						<div class="statistics clear">\
							<p class="left">'+obj.artical[i].viewNum+'览</p>\
							<p class="left">'+obj.artical[i].commentsNum+'评</p>\
							<p class="left">'+obj.artical[i].forwardNum+'转</p>\
						</div>\
					</div>');
				oA.appendTo( $(".itemS") );
			}
			flag = true;
		}else{
			$(".loadEndInfo").show();
		}
	};

	$(window).scroll(function(){
		var len = $(".itemS").children().length;
		if ( getTop( $(".itemS").children().eq(len-2)[0])  < ($(window).height() + $(window).scrollTop()) ) {
			if ( flag ) {
				flag = false;
				iPage++;
				fnAjax("/getArticalPage", {"column": "游戏","pageNow": iPage,"pageNum": 10}, articalData)
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
