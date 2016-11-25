'use strict';
//首页
(function(){
	$(".backtopBar .weixin").hover(function(){
		$(".backtopBar img").show();
	},function(){
		$(".backtopBar img").hide();
	});
	$(".backtopBar .backtop").click(function(){
		var timer = null;
		clearInterval(timer);
		timer = setInterval(function(){
			var height = $(document).scrollTop();
			if(height<=0){
				clearInterval(timer);
			}
			height-=100;
			$(document).scrollTop(height);
		},20);
	});
})();
