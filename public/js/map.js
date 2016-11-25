'use strict';
//百度地图
(function(){
	var keyword = $("input[name='address']").val();

	var map = new BMap.Map("allmap");
    //map.centerAndZoom("北京", 12);
    map.enableScrollWheelZoom(true);    //启用滚轮放大缩小，默认禁用

    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件

    var localSearch = new BMap.LocalSearch(map);
    localSearch.enableAutoViewport(); //允许自动调节窗体大小
	function searchByStationName() {
	    map.clearOverlays();//清空原来的标注
	    
	    localSearch.setSearchCompleteCallback(function (searchResult) {
	        var poi = searchResult.getPoi(0);
	        map.centerAndZoom(poi.point, 13);
	        var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
	        map.addOverlay(marker);
	        var content = keyword + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
	        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
	        marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
	        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	    });
	}
    localSearch.search(keyword);
    searchByStationName();
})();
