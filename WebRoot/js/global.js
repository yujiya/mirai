$('._navbar-control').on('click', function(e){
	$(this).siblings().removeClass('active')
		.end().addClass('active');
	$('.' + this.dataset.target)
		.show(0,function(){
			$(this).siblings().removeClass('active').hide()
				.end().addClass('active');
		})
})
var message={
		startip:"180.32.23.23",
}
$("#enterface_container").hide();
var EnterFace=[{ipsarr:[
	{"banner":"[Apache/2.4.6 (CentOS) PHP/5.4.16]","ipaddress":"江苏省 南京市","ipport":"180.209.64.38:80","latitude":"32.05723550","longitude":"118.77807441","pwd":null,"result":"0","time":"2017-05-10 21:03:18","username":null}
]},{ipsarr:[
	{"banner":"[Apache/2.4.6 (CentOS) PHP/5.4.16]","ipaddress":"江苏省 南京市","ipport":"180.209.64.38:80","latitude":"32.05723550","longitude":"118.77807441","pwd":null,"result":"0","time":"2017-05-10 21:03:18","username":null}
]}];
function showone(par){
	if(EnterFace[par].Arg != undefined){
		EnterFace[par].Arg.show();
		if(EnterFace[par].ChartArg == undefined){
			EnterFace[par].ChartArg = initDraw(par,message,EnterFace[par].Arg.$container);
			EnterFace[par].ChartArg.ipsarr = EnterFace[par].ipsarr;
			EnterFace[par].ChartArg.wakeup();
		}
	}else{
		var Arg = initEnterFace( $("#enterface_container"),$("#models").find(".enterface")[0]);
		Arg.$content.addClass("Ycenter");
		if(par) Arg.$topmessage.html("历史记录的分析图表");else{Arg.$topmessage.html("扫描的实时分析图表");}
		Arg.show();
		var ChartArg = initDraw(par,message,Arg.$content);
		ChartArg.ipsarr=EnterFace[par].ipsarr;
		ChartArg.wakeup();
		EnterFace[par].Arg=Arg;
		EnterFace[par].ChartArg=ChartArg;
	}
}
function globalAddListener(){
	var keysViewer = initEnterFace($("#enterface_container"),$("#models").find(".enterface")[0]);
	keysViewer.setContent(document.getElementById("keysviewModel").innerHTML);
	keysViewer.$topmessage.html("口令配置");
	var drag = initDrag("dropbox",keysViewer.$content.find(".mmm")[0]);
	drag.fileloaded = initFileLoaded;
	drag.$wplace = keysViewer.$content;
	function whichpar(){
		switch($(".active")[0].dataset.target.slice(0,1)){
			case "s": return 0;
			case "h" : return 1;
			default: return 0;
		}
	}
	var active_line;
	$('div.tbody').on('click','.controlbutton_yes',function (e){
		var $line=$(e.target||e.srcElement).closest('.item');
		if(active_line!==$line&&active_line!==undefined){
			active_line.css("background","#fff")
		}
		active_line=$line;
		var ip=$line.find('.span-2').html();
		var usr=$line.find('.span-3').html();
		var pwd=$line.find('.span-4').html();
		var iframe_url="180.209.64.38:4999/telnet"; 
		if(ip.slice(-3)==':80'){
			iframe_url="http://"+ip.slice(0,-3)+":80";
			$line.css({
				"background":"#daf9f7"
			})
			window.open(iframe_url,"_blank",'width=1000px,height=400px,top=500px,left=0');
			window.open("./keys.html","_blank","width=200px,heigt=400px,top=300px,left=100px")
			return ;
		}
		else{
			var str="http://"+iframe_url;
			ip=""+ip;
			str+="?ip="+encodeURI(ip.slice(0,-3))+"&usr="+encodeURI(usr)+"&pwd="+encodeURI(pwd);
			window.open(str);
//			alert(str)
			return ;
		}
	});
	$(".table-wrap ").on('click', '.controlbutton_see', function(e) {
		var $target=$(e.target).closest(".item");
		var spans = $target.find("[class ^= 'span']");
		var div=document.createElement('div');
		div.innerHTML=$('#item-info').html();
		var infos = $(div).find(".info-value");
		for (var i = 0 ; i<infos.length; i++){
			infos[i].innerHTML = spans[i].innerHTML;
		}
		startScan.itemInfo.$topmessage.html("item详细数据:");
		
		startScan.itemInfo.setContent("<h2>item详细数据</h2><div class='item-table'>"+div.innerHTML+"</div>");
		startScan.itemInfo.show();
	});
	$('#daoru').on('click',function () {
		keysViewer.show();
	});
	$("#fenxi").on("click",function (){
		var par = whichpar();
		showone(par);
	});
	$("select").select2({dropdownCssClass: 'dropdown-inverse'});//为select元素添加样式;
}
globalAddListener();
