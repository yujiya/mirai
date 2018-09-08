var MyEvent={
	tellmyshelf:"store Event funcs!!",
}
var Urls={
	getkeysfile:"./test.txt",
	tellmyshelf:"Store some urls that will be use by others",
}
var TempStore={
	length:0,
	tellmyshelf:"Store some values that will be use by others",
}
var ClickFunc={
	Hello:function (message){
		alert(message||"Hello");
	}
}

var Mssage ={   ///all of the data use json , use json to all data;
	tellmyshelf:""
}

function changeCode(filedata){
	var doc=document.createElement('textarea');
	doc.innerHTML=filedata;
	return doc.innerHTML;
}

function showmessage(str,lstr,type){
	function hidefoot(){
		var that=document.getElementById("foot_message");
		if(that.style.visibility=="hidden")return ;
		that.style.opacity=0;
		timerid=setTimeout(closefoot,300);
	}
	function closefoot(){
		clearTimeout(timerid);//如何同步??
		var that=document.getElementById("foot_message");
		showmessage.is_showing=false;
		that.style.visibility="hidden";
		that.style.display="none";
		lostbar.style.width="100%";
		lostbar.style.opacity=1;
		that.style.transform="scale(0.95) translate(4px,8px)";
	}
	function showfoot(){
		showmessage.is_showing=true;
		foot_content.innerHTML=str;
//		this.style.display="block";
//		this.style.visibility="visible";
		this.style.opacity=1;
		lostbar.style.width="0%";
		lostbar.style.opacity=0;
		this.style.transform="scale(1) translate(0,0)";
		foot_message.hide(hidefoot,2000);
	}
	if(lstr){
		str+='<span style="font-size:12px">('+lstr+')</span>' 
	}
	var timerid;
	if(showmessage.is_showing)return;
	var foot_message=new Component(document.getElementById("foot_message"));
	if(!foot_message.doc){
		foot_message.doc=document.createElement('div');
		foot_message.doc.id="foot_message";
		foot_message.doc.innerHTML='<div class="micon"></div><div id="foot_content">一般你是看不到我的.. O.o</div><div class="closebutton"></div><div id="lostbar"></div>';
		document.getElementsByTagName("body")[0].appendChild(foot_message.doc);
	}
	type=type|0;
	switch(type){
		case 0: foot_message.doc.className="normal_message";break;
		case 1: foot_message.doc.className="error_message";break;
		case 2: foot_message.doc.className="success_message";break;
	}
	foot_message.doc.getElementsByClassName("closebutton")[0].onclick=hidefoot;
	var lostbar=document.getElementById("lostbar");
	foot_message.show(showfoot);
}
function myContains(doc,cl){
	if(cl){
		if(doc!=cl){
			return myContains(doc,cl.parentNode);
		}else{
			return true;
		}
	}
	else{
		return false;
	}
}
//function SpecialEventListener(doc,type,func,...arg){
//	var out;
//	var over;
//	var overevent;
//	var outevent;
//	function setevent(){
//		var event={leave:{},enter:{}}
//		if(out){
//			event.leave.sdoc=out
//			event.leave.related=over
//			event.leave.e=outevent;
//		}
//		if(over){
//			event.enter.sdoc=over
//			event.enter.related=out
//			event.enter.e=overevent;
//		}
//		var related;
//		if(event[type]){
//			related=event[type].related
//			var cons=myContains( doc, event[type].sdoc )
//		}
//		if(cons&&(!related || (related !== doc && !myContains( doc, related )))){
//			func(...arg);
//			console.log(cons,event[type])
//		}
//	}
//	window.addEventListener("mouseover",function (e){
//		over=e.target;
//		overevent=e;
//		setevent();
////					console.log("over",over);
//	},false)
//	window.addEventListener("mouseout",function (e){
//		out=e.target;
//		outevent=e;
////					console.log("out",out);
//	},false)
//}
function Component(doc){
	this.doc=doc;
	this.show = function (styleobj,time){
		time=time||100;//避免系统错误中断 导致意外终止动画.但还是无法完全避免;
		var doc=this.doc;
		doc.style.display="block";
		doc.style.visibility="hidden";
		switch(typeof styleobj){
			case  "object":
			setTimeout(function(){
				doc.style.visibility="visible";
				for(var x in styleobj){
					doc.style[x]=styleobj[x];
				}
			},time);
			break;
			case "function":
			setTimeout(function(){
				doc.style.visibility="visible";
				styleobj.call(doc);
			},time);
			break;
		}
	}
	this.hide=function(styleobj,time,notime){
		var doc=this.doc;
		switch(typeof styleobj){
			case  "object":
			setTimeout(function(){
				doc.style.display="none";
				doc.style.visibility="hidden";
				for(var x in styleobj){
					doc.style[x]=styleobj[x];
				}
			},time);
			break;
			case "function":
			setTimeout(function(){
				styleobj.call(doc);
				if(notime!==undefined){
					setTimeout(function (){
						doc.style.display="none";
						doc.style.visibility="hidden";
					})
				}
			},time);
			break;
		}
	}
}

function createtable(table,doc,pin){
	var max=3;
	var tbdoc=document.createElement('table');
	tbdoc.border=0;doc.cellPadding=0;doc.cellSpacing=0;
	var str="<thead><tr><th>用户名</th><th>密码</th><th>品牌</th></tr></thead>"+
	"<tbody id='alllist'>";
	if(pin==undefined){
		max=2;
		pin=[];
		var str="<table border='0' cellpadding='0' cellspacing='0'>"+
	"<thead><tr><th>用户名</th><th>密码</th></tr></thead>"+
	"<tbody id='alllist'>";
	}
	//var 后直接+= 出错!!
	var tempstr=""
	var temppin=""
	for(var i=0;i<table.length;i++){
		str+="<tr>"
		var len=max < table[i].length ? table[i].length:max;
		for(var j=0;j<len;j++){
			var data=table[i][j]
			if(j>=2){
				if(data){
					temppin+=data.join('')
					tempstr+="<div>"+data.join('')+"</div>"
				}
				else{
					tempstr+=" "
					temppin+=" "
				} 
			}else{
				if(data)str+="<td>"+data.join('')+"</td>"
				else str+="<td>"+"</td>"
			}
		}
		if(j>=3){
			str+="<td>"+tempstr+"</td>"
			pin.push(temppin)
			tempstr=""
			temppin=""
		}
		str+="</tr>"
	}
	tbdoc.innerHTML=str;
	if(doc){doc.innerHTML="";doc.appendChild(tbdoc)};
	return tbdoc;
}
function rew(str,func,doc){ //注意多重闭包的变量意外跨域;
	function fork(c,checks){
		function haveone(checks,c){
			checks=checks||['\t',' ','/','\\',';',','];
			var len=checks.length;
			for(var k=0;k<len;k++){
				if(checks[k]==c){
					return true;
				}
			}
			return false;
		}
		if(haveone(checks,c)){
			return true;
		}else{
			return false;
		}
	}
	function getarr(str){
		var table=[];var tr=[];var td=[];
		var mode=1;
		var num=2;//类型数
		var state=0;
		for(var i=0;i<str.length;i++){
			var c=str[i];
			if(c=='\n'){
				tr.push(td);
				table.push(tr);
				tr=[];
				td=[];
			}
			else{
				var depart = fork(c);
				if(depart){
					if(state){
						state=0;
						tr.push(td);
						td=[];
					}
				}else{
					state=1;
					td.push(c);
				}
			}
		}
		return table;
	}
	var table=getarr(str);
	if(func){func(table,doc);}
	
	return table;
}
function createjson(table){
	var temp=[];
	for(var k=0;k<table.length;k++){
		temp[k]=table[k][0].join('')+','+table[k][1].join('');
	}
//		console.log(temp);
}
function initDrag(id,aim_doc){
	var Arg={
		fileloaded:function (){},
		load:{
			savefile:function (){},
			change_see_view:function (){},
			resetfile:function (){}
		}
	};
	function fileLoader(files) {  
	    for (var i = 0; i < files.length; i++) {  
	        var file = files[i];  
			var reader = new FileReader();  
			reader.onload = function(e) { 
				Arg.load = Arg.fileloaded(e.target.result);
				Arg.load.initdoc(Arg.$wplace);
			}
			reader.readAsText(file); 
	    }  
	}
	var dropbox=document.getElementById(id);
	id=id||"dropbox";
	if(!dropbox){
		aim_doc.innerHTML='<div name="image" class="dropbox" id="'+id+'" style="min-width:200px;min-height:100px;border:3px dashed silver;"><h2 class="placeholder"">将.txt等文件拖拽到此处以查看</h2></div>'
		dropbox=document.getElementById(id);
	}
	dropbox.addEventListener("dragenter", function(e){  
	    dropbox.style.borderColor = 'gray';  
	}, false);  
	dropbox.addEventListener("dragleave", function(e){  
	    dropbox.style.borderColor = 'silver';  
	}, false);  
	dropbox.addEventListener("dragenter", function(e){  
	    dropbox.style.borderColor = 'gray';  
	    dropbox.style.backgroundColor = 'white';  
	}, false);  
	dropbox.addEventListener("dragleave", function(e){  
	    dropbox.style.backgroundColor = 'transparent';  
	}, false);  
	dropbox.addEventListener("dragenter", function(e){  
	    e.stopPropagation();  
	    e.preventDefault();  
	}, false);  
	dropbox.addEventListener("dragover", function(e){  
	    e.stopPropagation();  
	    e.preventDefault();  
	}, false);  
	dropbox.addEventListener("drop", function(e){  
	    e.stopPropagation();  
	    e.preventDefault();  
	    fileLoader(e.dataTransfer.files);  
	}, false);  
	return Arg;
}
//	function  seeit(){ id的唯一使得 无需获取 dom
//		console.log(whatid);
//		whatid="nihaoya";
//		console.log(whatid);
//	}
//	rew(doc.innerHTML,doc,createtable);
//	initdrag();
//	initkeybook();
/* 
 * 全局容器对象:
 */
//search 模块;
function initSearch(pinvalue){
	function startSearch(){
		if(!Arg.pin) return;
		try{
			search(doc.whatpin.value,Arg.pin);
		}catch(e){
			showmessage(e.message);
			return;
		}
	}
	function setValues (pin){
		Arg.pin=pin;
	}
	function search (str,pin){
		var reg=new  RegExp(str);
		var hasone=0;
		var trs= doc.trows;
		var tbo = doc.tbody;
		var str="";
		for(var i=0;i<pin.length;i++){
			if(pin[i].match(reg)){
				hasone++;
				str+="<tr>"+trs[i].innerHTML+"</tr>";
			}
		}
		if(!hasone){
			tbo.innerHTML="<tr><th colspan='3'>匹配0条结果</th></tr><tr><td>...</td><td>...</td><td>...</td></tr>"
		}
		else{
			tbo.innerHTML="<tr><th colspan='3'>匹配"+hasone+"条结果</th></tr>"+str;
		}
	}
	function initdoc($wplace){
		doc={
			trows: $wplace.find("#alllist > tr").get(),
			tbody: $wplace.find("#resultlist")[0],
			whatpin : $wplace.find("#whatpin")[0]
		};
		doc.whatpin.addEventListener("keydown",function (e){
			if(e.keyCode=='13'){
				Arg.startSearch();
			}
		});
		$wplace.find("#searchbt")[0].onclick=function (){
			Arg.startSearch(); //传递的是函数而没有上下文;
		}
	}
	var doc={};
	var Arg = {
		startSearch,
		setValues,
		search,
		initdoc,
	}
	Arg.setValues(pinvalue);
	return Arg;
}
ClickFunc.savefile=function (){
	showmessage("There is no file..");
}
/*组建类*/
function colordeeper(colorstart,colorend,range){
	this.colorstart=colorstart;
	this.colorend=colorend||'#ffffff';
	this.curcolor=colorstart;
	this.range=range||5;
	this.level=0;
	this.deeper = function(){
		function slicecolor(str){
			return {
				r:parseInt(str.slice(1,3),16),
				g:parseInt(str.slice(3,5),16),
				b:parseInt(str.slice(5,7),16)
			}
		}
		function getcolor(obj){
			obj.r=Math.floor(obj.r).toString(16);
			if(obj.r.length<2){
				obj.r='0'+obj.r;
			}
			obj.g=Math.floor(obj.g).toString(16);
			if(obj.g.length<2){
				obj.g='0'+obj.g;
			}
			obj.b=Math.floor(obj.b).toString(16);
			if(obj.b.length<2){
				obj.b='0'+obj.b;
			}
			return '#'+obj.r+obj.g+obj.b;
		}
		var start=slicecolor(this.colorstart);
		var end=slicecolor(this.colorend);
		var cha={
			r:end.r-start.r,
			g:end.g-start.g,
			b:end.b-start.b
		}
		this.level++;
		if(this.level>this.range){
			this.level=this.range;
			return this.colorstart;
		}
		var cur={//start at level == 1
			r:start.r+cha.r*this.level/this.range,
			g:start.g+cha.g*this.level/this.range,
			b:start.b+cha.b*this.level/this.range,
		}
		this.curcolor=getcolor(cur);
		return this.curcolor;
	};
	this.getcolor = function(){
		return this.curcolor;
	}
}

function settimes(par){
	if(startdraw[par]===undefined){
		startdraw[par]=Arg;
		return true;
	}else{
		if(startdraw[par].times>0)  return false;
		else{
			startdraw[par].times=1; return true;
		}
	}
}
/*以下为执行区*/
