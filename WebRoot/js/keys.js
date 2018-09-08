function initFileLoaded(filedata){
	var pin=[];
	var table;
	var currentface=1;
	var Arg={};
	var doc={};
	Arg.savefile=function (){
		if(!$(doc.dropbox).find("#editarea")[0]){
			showmessage("没有文件");
			return ;
		}
//		$.ajax({
//		    type: "POST",
//		    url: Urls.uploadfile,
//		    data: filedata,
//		    success: function (data) {
//		        showmessage("上传成功");
//		        return false;
//		    },
//		    error: function (e){
//		    	showmessage("无法上传",e.status,1);
//		    	console.log(e);
//		    }
//		});
		TempStore.ttype = 1;
		Urls.uploadfile += "&txt="+encodeURI(filedata);
		showmessage ("配置成功！");
	}
	Arg.change_see_view=function (){
		if(currentface){
			doc.editarea.style.display="block";
			doc.edittable.style.display="none";
		}else{
			doc.editarea.style.display="none";
			doc.edittable.style.display="table";
		}
		currentface^=1;
	}
	Arg.resetfile=function (){
		doc.dropbox.innerHTML='<h2 class="placeholder"">将.txt等文件拖拽到此处以查看</h2>';
		doc.resultlist.innerHTML='<tr><td>...</td><td>...</td><td>...</td></tr>';
	}
	Arg.saveEdit=function (){
		filedata=doc.editarea.innerHTML;
		alert(filedata);
		Arg.resetfile();//qingkong 
		analy();
		lastdata="<textarea id='editarea' spellcheck='false' style='width:100%;height:400px;'> "+filedata+"</textarea>";
	}
	function analy(){
		table=rew(filedata);
		createtable(table,doc.dropbox,pin).id="edittable";
		Arg.search = initSearch(pin);
		doc.dropbox.innerHTML+="<textarea id='editarea' spellcheck='false' style='width:100%;height:400px;display:none;'> "+filedata+"</textarea>";
	}
	Arg.initdoc = function($wplace){
		doc = {
			dropbox : $wplace.find(".dropbox")[0],
			resultlist : $wplace.find("#resultlist")[0],
		};
		Arg.resetfile();//qingkong 
		analy();
		doc.editarea = $wplace.find("#editarea")[0],
		doc.edittable = $wplace.find("#edittable")[0],
		$wplace.find("#savekeys")[0].onclick=Arg.savefile;
		$wplace.find("#resettxt")[0].onclick=Arg.resetfile;
		$wplace.find("#changesee")[0].onclick=Arg.change_see_view;
		Arg.search.initdoc($wplace);
	}
	return Arg;
};

function initKeyBook(aim_doc,$wplace){
	$.ajax({
		type:"get",
		url:Urls.getkeysfile,
		dataType:'text',
		async:true,
		success:function (data){
			var table=rew(data);
			var pin=[];
			createtable(table,aim_doc,pin);
			initSearch(pin).initdoc($wplace);
		}
	});
}
//var keybookstart=function(par){
//	var mmm=document.getElementById("mmm")
//	switch(par){
//		case 0:
//		document.getElementById("butlist").style.display="none";
//		initkeybook(mmm);
//		break;
//		case 1:
//		document.title="密码配置"
//		document.getElementById("butlist").style.display="block";
//		initdrag("dropbox",mmm);
//		break;
//	}
//}

