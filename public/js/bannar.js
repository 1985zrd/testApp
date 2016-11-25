'use strict';
//bannar
(function(){
	var num = 0;
	$(".bannarBar .bannar li").removeClass("active").eq(num).addClass("active");
	$(".bannarBar .point a").removeClass("active").eq(num).addClass("active");
	$(".bannarBar .point a").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".bannarBar .bannar li").eq($(this).index()).addClass("active").siblings().removeClass("active");
		num = $(this).index();
	});
	var iTimer = null;
	hoverFn();
	
	$(".bannarBar").hover(function(){
		clearInterval(iTimer);
	},function(){
		hoverFn()
	});
	function hoverFn(){
		iTimer = setInterval(function(){
			move();
		},5000);
	};
	function move(){
		num++;
		if( num >= $(".bannarBar .bannar li").size() ){
			num = 0;
		}
		$(".bannarBar .bannar li").removeClass("active").eq(num).addClass("active");
		$(".bannarBar .point a").removeClass("active").eq(num).addClass("active");
	};
})();

