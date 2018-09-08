'use strict';
//Echarts
function initEnterFace($container,doc_model){
	doc_model || ( doc_model={innerHTML:""} );
	function setContent(innerHTMLstr){
		that.$doc.find(".content").html( innerHTMLstr );
	}
	function start_move(e){
		window.addEventListener("mousemove",move_enterface,false);
		window.addEventListener("mouseup",end_move,false);
		that.mouse={x:e.clientX,y:e.clientY};
//		set_active(that);
	}
	function end_move(e){
		var top=that.doc.offsetTop;
		var left=that.doc.offsetLeft
		that.doc.style.left=(that.doc.offsetLeft+that.position.x)+"px";
		that.doc.style.top=(that.doc.offsetTop+that.position.y)+"px";
		if(that.position.y+top<0){
			that.doc.style.top=0;
		}
		if(that.position.x+left+that.doc.offsetWidth-30<0){
			that.doc.style.left=0;
		}
		if(that.position.x+left+30>window.innerWidth){
			that.doc.style.left=window.innerWidth-that.doc.offsetWidth + "px";
		}
		if(that.position.y+top>window.innerHeight){
			that.doc.style.top=window.innerHeight-that.doc.offsetHeight + "px";
		}
		that.position.x=0;that.position.y=0;
		that.doc.style.transform="";
		window.removeEventListener("mousemove",move_enterface,false);
	}
	function move_enterface(e){
		e.preventDefault();
		that.position.x += e.clientX-that.mouse.x;
		that.position.y += e.clientY-that.mouse.y;
		that.doc.style.transform="translate("+ that.position.x +"px, "+ that.position.y +"px )";
//		if(is_show){
//			that.style.left=left+"px";
//		}
		that.mouse.x=e.clientX;
		that.mouse.y=e.clientY;
	}
	function create_enterface(){
		that.doc=document.createElement('div');
		that.doc.className="enterface";
		that.$doc = $(that.doc);
		that.$doc.hide();
		that.$doc.html(doc_model.innerHTML);
		$container.append(that.doc);
		that.$doc.on("mousedown",".windowtop",start_move);
		that.$doc.on("click",".closebutton",close_enterface);
		Arg.$content=that.$doc.find(".content");
		Arg.$topmessage=that.$doc.find(".topmessage");
	}
	function show_enterface(){
		that.doc.style.left=window.innerWidth/10 +"px";
		that.doc.style.top=window.innerHeight/20 +"px";
		that.position.x=0;that.position.y=0;
		
		that.$doc.show();
		$container.show();
		$("#background").fadeIn(500);
	}
	function close_enterface(){
		that.$doc.hide();
		$container.hide();
		$("#background").fadeOut(500);
	}
	var Arg={
		show:show_enterface,
		close:close_enterface,
		setContent:setContent,
	}
	var that={
		doc:null,
		mouse:{
			x:0,
			y:0,
		},
		position:{
			x:0,y:0
		}
	};
	create_enterface();
	return Arg;
}


//jenkins

//按钮样式,文字, toggle 标签

//Vue.js



//function initface(model){
//	var Arg={};
//	
//	return Arg;
//}
//(function ($){
//	if($===undefined){
//		throw new Error("need $ from jquery !! ");
//	}
//	function close_enterface(e){
//		that=$(e.target||e.srcElement).closest('.enterface')[0];
//		$(that).css({
//			"visibility":"hidden",
//			"display":"none",
//		});
//		if(!is_showed){
//			doc.style.background="rgba(0,0,0,0)";
//			setTimeout(function (){doc.style.visibility="hidden";},500);
//		}
//		else{
//			that.tobeshowall=false;
//		}
//		window.removeEventListener("mouseup",end_move,false);
//	}
//	function start_move(e){
//		that=$(e.target||e.srcElement).closest('.enterface')[0];
//		window.addEventListener("mousemove",move_enterface,false);
//		window.addEventListener("mouseup",end_move,false);
//		that.mouse={x:'',y:''};
//		that.mouse.x=e.clientX;
//		that.mouse.y=e.clientY;
//		set_active(that);
//	}
//	function end_move(e){
//		if(that.offsetTop<0){
//			that.style.top=0+"px";
//		}
//		if(that.offsetLeft+that.offsetWidth-30<0){
//			that.style.left=0+"px";
//		}
//		if(that.offsetLeft>window.screen.availWidth){
//			that.style.left=window.screen.availWidth-that.offsetWidth+"px";
//		}
//		if(that.offsetTop>window.screen.availHeight){
//			that.style.left=window.screen.availHeight-that.offsetHeight+"px";
//		}
//		window.removeEventListener("mousemove",move_enterface,false);
//	}
//	function move_enterface(e){
//		e.preventDefault();
//		var top=that.offsetTop;
//		var left=that.offsetLeft;
//		that.style.position="absolute";
//		$(that).css({
//			"left":left+(e.clientX-that.mouse.x)+"px",
//			"top":top+(e.clientY-that.mouse.y-martop)+"px"
//		});
////		if(is_show){
////			that.style.left=left+"px";
////		}
//		that.mouse.x=e.clientX;
//		that.mouse.y=e.clientY;
//	}
//	function add_enterface(e,par){
//		if(e){//有事件触发的
//			var $line=$(e.target||e.srcElement).closest('.item');
//			if(active_line!==$line&&active_line!==undefined){
//				active_line.css("background","#fff")
//			}
//			active_line=$line;
//			var ip=$line.find('.span-2').html();
//			var usr=$line.find('.span-3').html();
//			var pwd=$line.find('.span-4').html();
//		}
//		
//		if(!par){//打开新的窗口
//			var iframe_url="180.209.64.38:4999/telnet"; 
//			if(ip.slice(-3)==':80'){
//				iframe_url="http://"+ip.slice(0,-3)+":80";
//				$line.css({
//					"background":"#daf9f7"
//				})
//				window.open(iframe_url,"_blank",'width=1000px,height=400px,top=500px,left=0');
//				window.open("./keys.html","_blank","width=400px,heigt=400px,top=300px,left=100px")
//				return ;
//			}
//			else{
//				var str="http://"+iframe_url;
//				ip=""+ip;
//				str+="?ip="+encodeURI(ip.slice(0,-3))+"&usr="+encodeURI(usr)+"&pwd="+encodeURI(pwd);
//				window.open(str);
//	//			alert(str)
//				return ;
//			}
//		}
//		switch(par){
//			case 1://本地多iframe加载;
//				if(is_showed){
//					hide_all();
//				}
//				var sdoc=window //只加载一次;
//		//		var sdoc=(e.target||e.srcElement).parentElement;
//				if(sdoc.index===undefined){
//					sdoc.index=the_i;
//					var enterface=$(".enterface").eq(0).clone();
//					enterface.removeAttr('id');
//					var  iframe=document.createElement("iframe");
//					iframe.setAttribute(
//						"class","controlframe"
//					);
//					iframe.src=iframe_url;
//					enterface.find(".framewrap").eq(0).append($(iframe));
//					enterface=the_webshells[the_i++]=enterface.get(0);
//					doc.appendChild(enterface);
//				}else{
//					enterface=the_webshells[sdoc.index];
//				}
//				
//				$(enterface).find('.closebutton')[0].onclick=close_enterface;
//				$(enterface).find('.windowtop')[0].onmousedown=start_move;
//				return enterface;
//			case 2:
//			//显示某一div;
//				var sdoc=document.getElementsByClassName("active")[0];
//				var divhtml='<div class="center">'
//								+'<h4>ip失败与成功比</h4><hr />'
//								+'<div id="scan_pie" style="width:600px;height:400px ;margin: 50px 100px;"> </div>'
//								+'<h4>ip中国分布图</h4><hr />'
//								+'<div id="scan_map" style="width:100%;height: 550px; margin: 20px 0;"></div>'
//							+'</div>';
//				var message;
//				switch(sdoc.dataset.target[0]){
//					case 's':message='ip扫描结果的分析';break;
//					case 'h':message='ip历史记录的分析';break;
//				}
//				var  diviframe=document.createElement("div");
//				diviframe.setAttribute(
//					"class","controlframe"
//				);
//				function createEnterface(sdoc){
//					if(sdoc.index===undefined){
//						sdoc.index=the_i;
//						var enterface=$(".enterface").eq(0).clone();
//						enterface.removeAttr('id');
//						if(divhtml) diviframe.innerHTML=divhtml;
//		//					alert(message);
//						var top=enterface.find(".topmessage").eq(0);
//						var framewrap=enterface.find(".framewrap").eq(0).append($(diviframe));
//						enterface=the_webshells[the_i++]=enterface.get(0);
//						doc.appendChild(enterface);
//					}else{
//						enterface=the_webshells[sdoc.index];
//					}
//					$(enterface).find('.closebutton')[0].onclick=close_enterface;
//					$(enterface).find('.windowtop')[0].onmousedown=start_move;
//					return {
//						doc:enterface,
//						top:top,
//						framewrap:framewrap
//					};
//				}
//				var enter=createEnterface(sdoc);
//				return enter.doc;
//		}
//	}
//	function show_enterface(e,par){
//		var enterface=add_enterface(e,par);
//		if(!enterface){
//			return ;
//		}
//		set_active(enterface);
//		//Jquery 只是简单的应用;对于闭包函数回绑定多个; 
//		//
//		//由于iframe的事件的冒泡阻止--->只能点头;
////		str+='id:'+thedata[2].innerHTML+'&nbsp;&nbsp;usr:'+thedata[3].innerHTML+'&nbsp;&nbsp;pwd:'+thedata[4].innerHTML;
//		$(enterface).css({
//			"visibility":"visible",
//			"display":"block",
//			"position":"relative",
//			"top":0,
//			"left":0,
//			"margin-top":martop+"px"
//		});
////		document.getElementById("showinfo").innerHTML=str;
//		$(doc).css({
//			"visibility":"visible",
//			"opacity":'1',
//			"display":"flex",
//			"background":"rgba(0,0,0,0.5)"
//		});
//	}
//	function show_all(e){
//		$(doc).css({
//			"visibility":"visible",
//			"position":"relative",
//			"opacity":'1',
//			"display":"flex",
//			"background":"rgba(0,0,0,0.5)"
//		});
//		var topi=30;
//		var righti=30;
//		$(doc).find('.enterface').filter(function (){
//			if(this.id==="enterface_model")return false;
//			if(is_refresh) return true;
//			if(this.tobeshowall===false){
//				return false;
//			}
//			else return true;
//		}).css({
//			"display":"block",
//			"position":"relative",
//			"visibility":"visible",
//			"margin-top":martop+"px"
//		});
//		/*map(function (){
//			if(is_showed){
//				this.style.right="auto"
//				return this;
//			}
//			$(this).css({
//				"top":topi+"px",
//				"right":righti+"px",
//				"left":"auto"
//			});
//			topi+=45;
//			righti+=45;
//			return this;
//		})*/
//		$(doc).find("#enterface_model").css("display","none");
//		is_refresh=false;
//		is_showed=true;
//	}
//	function hide_all(){
//		doc.style.display="none"
//		doc.style.position="fixed";
//		$(doc).find('.enterface').css({
//			"display":"none",
//			"position":"absolute",
//			"visibility":"hidden"
//		});
//		is_showed=false;
//	}
//	function set_active(tdoc){
//		if(active_face===tdoc)return ;
//		if(active_face){
//			active_face.style.zIndex="3";
//		}
//		tdoc.style.zIndex="4";
//		active_face=tdoc;
//	}
//
//	var that;
//	var martop=0;//间隔;
//	var the_webshells=[];
//	var the_i=0;
//	var is_showed=false;
//	var is_refresh=false;
//	var active_face;
//	var doc=document.getElementsByClassName("enterbackground")[0];
//	var active_line;//当前活动行;
//})($);
//
//$('.scan-page').on('click','.controlbutton_yes',show_enterface);
//$('.scan-page').on('click','.controlbutton_add',add_enterface);
//$('#fenxi').on('click',function (){
//	show_enterface('',2);//弹窗的形式打开分析图表;
//	startScan[].Arg=startdraw();
////		alert(startdraw.times);
//});
//$('#control').on('click',show_all);
//$('#control').on('dblclick',function (){
//	is_refresh=true;
//	show_all();
//});