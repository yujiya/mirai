function initDraw(par,message,$container){ //start draw at where;
	var pie_option = {
		title : {
			text: '从ip:'+message.startip+'开始的扫描结果',
			subtext: '实时更新中',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['失败','成功']
		},
		series : [
			{
				name: 'ip扫描结果',
				type: 'pie',
				radius : '55%',
				center: ['50%', '60%'],
				data:[
					{value:0, name:'失败',itemStyle:{normal:{color:"#f36c5d"}}},
					{value:0, name:'成功',itemStyle:{normal:{color:"#01ff74"}}}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	}
	var map_option = {
	title: {
        text: 'World IP Point Map',
        subtext: 'from Mirais Searching',
        left: 'center',
        top: 'top'
    },
//  xAxis: {
//  	show: false,
//      type: 'value',
//      min: 'dataMin',
//      max: 'dataMax',
//      splitLine: {
//          show: false,
//      }
//  },
//  yAxis: {
//  	show:false,
//      type: 'value',
//      min: 'dataMin',
//      max: 'dataMax',
//      splitLine: {
//          show: false,
//      }
//  },
//  dataZoom: [
//      {
//          type: 'slider',
//          show: false,
//          xAxisIndex: [0],
//          start: 1,
//          end: 35
//      },
//      {
//          type: 'slider',
//          show: false,
//          yAxisIndex: [0],
//          left: '93%',
//          start: 1,
//          end: 35
//      },
//      {
//          type: 'inside',
//          xAxisIndex: [0],
//          start: 1,
//          end: 35
//      },
//      {
//          type: 'inside',
//          yAxisIndex: [0],
//          start: 1,
//          end: 35
//      }
//  ],
    tooltip: {},
    visualMap: {
        min: 0,
        max: 15,
        left: 'left',
        top: 'bottom',
        text: ['High','Low'],
        seriesIndex: [1],
        inRange: {
            color: ['#e0ffff', '#006edd']
        },
        calculable : true
    },
    geo: {
        map: 'world',
        roam: true,
        label: {
            normal: {
                show: false,
                textStyle: {
                    color: 'rgba(0,0,0,0.4)'  //hover 时textStyle不统一!!!
                }
            },
        },
        itemStyle: {
            normal:{
                borderColor: 'rgba(0, 0, 0, 0.2)'
//              color:'#d0e004'
            },
            emphasis:{
                areaColor: null,
                color:'#dfe8ed',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        regions:[{
        	name:"China",
        	itemStyle:{
        		normal:{
        			opacity:0,
        			shadowColor: 'rgba(0, 0, 0, 0.5)',
					shadowBlur: 12,
        		},
        		emphasis:{
        			shadowColor: 'rgba(0, 0, 0, 0.5)',
					shadowBlur: 12,
        		}
        	}
        }]
    },
    
    series : [
       {
           type: 'scatter',
           coordinateSystem: 'geo',
           data: [],
           symbolSize: 10,
           symbol:'circle',
           animation:true,
        },
        {
            name: 'ip数',
            type: 'map',
            geoIndex: 0,
            // tooltip: {show: false},
            data:[],
            itemStyle:{
            	normal:{
            		color:'#d0e004'
            	}
            }
        }
    ],
    textStyle: {
       fontSize:12
   }
};
	var world_option = {
    title: {
        text: 'World Population (2010)',
        subtext: 'from United Nations, Total population, both sexes combined, as of 1 July (thousands)',
        sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
        left: 'center',
        top: 'top'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                    + '.' + value[1];
            return params.seriesName + '<br/>' + params.name + ' : ' + value;
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    visualMap: {
        min: 0,
        max: 1000000,
        text:['High','Low'],
        realtime: false,
        calculable: true,
        inRange: {
            color: ['lightskyblue','yellow', 'orangered']
        }
    },
    series: [
        {
            name: 'World Population (2010)',
            type: 'map',
            mapType: 'world',
            roam: true,
            itemStyle:{
                emphasis:{label:{show:true}}
            },
            data:[
                {name: 'Afghanistan', value: 28397.812},
                {name: 'Angola', value: 19549.124},
                {name: 'Albania', value: 3150.143},
                {name: 'United Arab Emirates', value: 8441.537},
                {name: 'Argentina', value: 40374.224},
                {name: 'Armenia', value: 2963.496},
                {name: 'French Southern and Antarctic Lands', value: 268.065},
                {name: 'Australia', value: 22404.488},
                {name: 'Austria', value: 8401.924},
                {name: 'Azerbaijan', value: 9094.718},
                {name: 'Burundi', value: 9232.753},
                {name: 'Belgium', value: 10941.288},
                {name: 'Benin', value: 9509.798},
                {name: 'Burkina Faso', value: 15540.284},
                {name: 'Bangladesh', value: 151125.475},
                {name: 'Bulgaria', value: 7389.175},
                {name: 'The Bahamas', value: 66402.316},
                {name: 'Bosnia and Herzegovina', value: 3845.929},
                {name: 'Belarus', value: 9491.07},
                {name: 'Belize', value: 308.595},
                {name: 'Bermuda', value: 64.951},
                {name: 'Bolivia', value: 716.939},
                {name: 'Brazil', value: 195210.154},
                {name: 'Brunei', value: 27.223},
                {name: 'Bhutan', value: 716.939},
                {name: 'Botswana', value: 1969.341},
                {name: 'Central African Republic', value: 4349.921},
                {name: 'Canada', value: 34126.24},
                {name: 'Switzerland', value: 7830.534},
                {name: 'Chile', value: 17150.76},
                {name: 'China', value: 1359821.465},
                {name: 'Ivory Coast', value: 60508.978},
                {name: 'Cameroon', value: 20624.343},
                {name: 'Democratic Republic of the Congo', value: 62191.161},
                {name: 'Republic of the Congo', value: 3573.024},
                {name: 'Colombia', value: 46444.798},
                {name: 'Costa Rica', value: 4669.685},
                {name: 'Cuba', value: 11281.768},
                {name: 'Northern Cyprus', value: 1.468},
                {name: 'Cyprus', value: 1103.685},
                {name: 'Czech Republic', value: 10553.701},
                {name: 'Germany', value: 83017.404},
                {name: 'Djibouti', value: 834.036},
                {name: 'Denmark', value: 5550.959},
                {name: 'Dominican Republic', value: 10016.797},
                {name: 'Algeria', value: 37062.82},
                {name: 'Ecuador', value: 15001.072},
                {name: 'Egypt', value: 78075.705},
                {name: 'Eritrea', value: 5741.159},
                {name: 'Spain', value: 46182.038},
                {name: 'Estonia', value: 1298.533},
                {name: 'Ethiopia', value: 87095.281},
                {name: 'Finland', value: 5367.693},
                {name: 'Fiji', value: 860.559},
                {name: 'Falkland Islands', value: 49.581},
                {name: 'France', value: 63230.866},
                {name: 'Gabon', value: 1556.222},
                {name: 'United Kingdom', value: 62066.35},
                {name: 'Georgia', value: 4388.674},
                {name: 'Ghana', value: 24262.901},
                {name: 'Guinea', value: 10876.033},
                {name: 'Gambia', value: 1680.64},
                {name: 'Guinea Bissau', value: 10876.033},
                {name: 'Equatorial Guinea', value: 696.167},
                {name: 'Greece', value: 11109.999},
                {name: 'Greenland', value: 56.546},
                {name: 'Guatemala', value: 14341.576},
                {name: 'French Guiana', value: 231.169},
                {name: 'Guyana', value: 786.126},
                {name: 'Honduras', value: 7621.204},
                {name: 'Croatia', value: 4338.027},
                {name: 'Haiti', value: 9896.4},
                {name: 'Hungary', value: 10014.633},
                {name: 'Indonesia', value: 240676.485},
                {name: 'India', value: 1205624.648},
                {name: 'Ireland', value: 4467.561},
                {name: 'Iran', value: 240676.485},
                {name: 'Iraq', value: 30962.38},
                {name: 'Iceland', value: 318.042},
                {name: 'Israel', value: 7420.368},
                {name: 'Italy', value: 60508.978},
                {name: 'Jamaica', value: 2741.485},
                {name: 'Jordan', value: 6454.554},
                {name: 'Japan', value: 127352.833},
                {name: 'Kazakhstan', value: 15921.127},
                {name: 'Kenya', value: 40909.194},
                {name: 'Kyrgyzstan', value: 5334.223},
                {name: 'Cambodia', value: 14364.931},
                {name: 'South Korea', value: 51452.352},
                {name: 'Kosovo', value: 97.743},
                {name: 'Kuwait', value: 2991.58},
                {name: 'Laos', value: 6395.713},
                {name: 'Lebanon', value: 4341.092},
                {name: 'Liberia', value: 3957.99},
                {name: 'Libya', value: 6040.612},
                {name: 'Sri Lanka', value: 20758.779},
                {name: 'Lesotho', value: 2008.921},
                {name: 'Lithuania', value: 3068.457},
                {name: 'Luxembourg', value: 507.885},
                {name: 'Latvia', value: 2090.519},
                {name: 'Morocco', value: 31642.36},
                {name: 'Moldova', value: 103.619},
                {name: 'Madagascar', value: 21079.532},
                {name: 'Mexico', value: 117886.404},
                {name: 'Macedonia', value: 507.885},
                {name: 'Mali', value: 13985.961},
                {name: 'Myanmar', value: 51931.231},
                {name: 'Montenegro', value: 620.078},
                {name: 'Mongolia', value: 2712.738},
                {name: 'Mozambique', value: 23967.265},
                {name: 'Mauritania', value: 3609.42},
                {name: 'Malawi', value: 15013.694},
                {name: 'Malaysia', value: 28275.835},
                {name: 'Namibia', value: 2178.967},
                {name: 'New Caledonia', value: 246.379},
                {name: 'Niger', value: 15893.746},
                {name: 'Nigeria', value: 159707.78},
                {name: 'Nicaragua', value: 5822.209},
                {name: 'Netherlands', value: 16615.243},
                {name: 'Norway', value: 4891.251},
                {name: 'Nepal', value: 26846.016},
                {name: 'New Zealand', value: 4368.136},
                {name: 'Oman', value: 2802.768},
                {name: 'Pakistan', value: 173149.306},
                {name: 'Panama', value: 3678.128},
                {name: 'Peru', value: 29262.83},
                {name: 'Philippines', value: 93444.322},
                {name: 'Papua New Guinea', value: 6858.945},
                {name: 'Poland', value: 38198.754},
                {name: 'Puerto Rico', value: 3709.671},
                {name: 'North Korea', value: 1.468},
                {name: 'Portugal', value: 10589.792},
                {name: 'Paraguay', value: 6459.721},
                {name: 'Qatar', value: 1749.713},
                {name: 'Romania', value: 21861.476},
                {name: 'Russia', value: 21861.476},
                {name: 'Rwanda', value: 10836.732},
                {name: 'Western Sahara', value: 514.648},
                {name: 'Saudi Arabia', value: 27258.387},
                {name: 'Sudan', value: 35652.002},
                {name: 'South Sudan', value: 9940.929},
                {name: 'Senegal', value: 12950.564},
                {name: 'Solomon Islands', value: 526.447},
                {name: 'Sierra Leone', value: 5751.976},
                {name: 'El Salvador', value: 6218.195},
                {name: 'Somaliland', value: 9636.173},
                {name: 'Somalia', value: 9636.173},
                {name: 'Republic of Serbia', value: 3573.024},
                {name: 'Suriname', value: 524.96},
                {name: 'Slovakia', value: 5433.437},
                {name: 'Slovenia', value: 2054.232},
                {name: 'Sweden', value: 9382.297},
                {name: 'Swaziland', value: 1193.148},
                {name: 'Syria', value: 7830.534},
                {name: 'Chad', value: 11720.781},
                {name: 'Togo', value: 6306.014},
                {name: 'Thailand', value: 66402.316},
                {name: 'Tajikistan', value: 7627.326},
                {name: 'Turkmenistan', value: 5041.995},
                {name: 'East Timor', value: 10016.797},
                {name: 'Trinidad and Tobago', value: 1328.095},
                {name: 'Tunisia', value: 10631.83},
                {name: 'Turkey', value: 72137.546},
                {name: 'United Republic of Tanzania', value: 44973.33},
                {name: 'Uganda', value: 33987.213},
                {name: 'Ukraine', value: 46050.22},
                {name: 'Uruguay', value: 3371.982},
                {name: 'United States of America', value: 312247.116},
                {name: 'Uzbekistan', value: 27769.27},
                {name: 'Venezuela', value: 236.299},
                {name: 'Vietnam', value: 89047.397},
                {name: 'Vanuatu', value: 236.299},
                {name: 'West Bank', value: 13.565},
                {name: 'Yemen', value: 22763.008},
                {name: 'South Africa', value: 51452.352},
                {name: 'Zambia', value: 13216.985},
                {name: 'Zimbabwe', value: 13076.978}
            ]
        }
    ]
};
	var prindex={
		'北京' : 0,
         '天津' : 1,
         '上海' : 2,
         '重庆' : 3,
         '河北' : 4,
         '河南' : 5,
         '云南' : 6,
         '辽宁' : 7,
         '黑龙江' : 8,
         '湖南' : 9,
         '安徽' : 10,
         '山东' : 11,
         '新疆' : 12,
         '江苏' : 13,
         '浙江' : 14,
         '江西' : 15,
         '湖北' : 16,
         '广西' : 17,
         '甘肃' : 18,
         '山西' : 19,
         '内蒙古' : 20,
         '陕西' : 21,
         '吉林' : 22,
         '福建' : 23,
         '贵州' : 24,
         '广东' : 25,
         '青海' : 26,
         '西藏' : 27,
         '四川' : 28,
         '宁夏' : 29,
         '海南' : 30,
         '台湾' : 31,
         '香港' : 32,
         '澳门' : 33
	}
	var ki=0; //initDraw 处理的第几个ipsarr;
	var cityflag=0;
	var tflag=[0,0];
	var ipdata=[[],[],[]];
	var tscolor=["#c1fba3","#50c72b","#ffe1ca","#ff5a43"];
	var provinceMap={}
	var cityMap={};
	var is_reading=true;
	var Arg={ //用以返回的参数列表 (引用)
		setSelect:setSelect,
		ipsarr:[],
		wakeup:wakeupdraw,
		times:0,
	}
	function createCharts(par){
		var modeldoc=document.getElementById("painting");
		var doc=document.createElement("div");
		doc.setAttribute("id","painting"+par);
		doc.innerHTML=modeldoc.innerHTML;
		return doc;
	}
	var is_select=false;
	var selectpar=2;
	function wakeupdraw(){
//		getippoint();
		console.log(Arg.ipsarr);
//		return;
		function departaddress(onep){
			var str = onep.ipaddress;
			var arr="";
			var i=0;
			while(str[i]){
				if(str[i]=="省"){
					onep.province=arr;
					arr="";
					i++;
				}
				if(str[i]=="市"){
					onep.cityname=arr;
					arr="";
					i++;
				}
				if(str[i]!=" "){
					arr += str[i];
				}
				i++;
			}
		}
		function addipdata(sfpar){
			departaddress(Arg.ipsarr[ki]);
			var cityname=Arg.ipsarr[ki].cityname;
			var province=Arg.ipsarr[ki].province;
			var ipx=Arg.ipsarr[ki].longitude;
			var ipy=Arg.ipsarr[ki].latitude;
			var ipwhere=ipx+','+ipy;
			if(provinceMap[province]===undefined){
				provinceMap[province]=[0,0];
				provinceMap[province][sfpar]++;
			}else{
				provinceMap[province][sfpar]++;
			}
			
			if(cityMap[ipwhere]===undefined){//cityMap init
				cityMap[ipwhere]={};
				cityMap[ipwhere].tcolor=[];
				cityMap[ipwhere].tflag=[];
				
				cityMap[ipwhere].flag=cityflag++;
				
				var startcolor="#ffff91";
				cityMap[ipwhere].color=new colordeeper(startcolor,"#ffd700");
				ipdata[2].push({
					name:cityname,
					value:[ipx,ipy],
					itemStyle:{
						normal:{
							color:startcolor,
							opacity:1,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 2,
						},
						emphasis:{
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 12,
						}
					}
				});
			}
			else{
				ipdata[2][cityMap[ipwhere].flag].itemStyle.normal.color=cityMap[ipwhere].color.deeper();
			}
			if(cityMap[ipwhere].tflag[sfpar]===undefined){ //对部分进行初始化;
				cityMap[ipwhere].tflag[sfpar]=tflag[sfpar]++;
				cityMap[ipwhere].tcolor[sfpar]=new colordeeper(tscolor[2*sfpar],tscolor[2*sfpar+1]);
				ipdata[sfpar].push({
					name:cityname,
					value:[ipx,ipy],
					itemStyle:{
						normal:{
							color:tscolor[2*sfpar],
							opacity:1,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 2,
						},
						emphasis:{
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 12,
						}
					}
				});
			}
			else{
				ipdata[sfpar][cityMap[ipwhere].tflag[sfpar]].itemStyle.normal.color=cityMap[ipwhere].tcolor[sfpar].deeper();
			}
			
		}
		function setMapOption(slpar){
			map_option.series[1].data=[];
			map_option.series[0].data=[];
			if(is_select){
				myMap.setOption(map_option);
				is_select=false;
			}//使其有重现之感;
			for (var pr in provinceMap){
				var prvalue=provinceMap[pr][slpar];
				if(slpar>=2){	
					prvalue=provinceMap[pr][0]+provinceMap[pr][1];
				}
				map_option.series[1].data.push({
					name:pr,
					value:prvalue
				});
			}
			map_option.series[0].data=ipdata[slpar];
		}
		while(ki<Arg.ipsarr.length){
			is_reading=true;
			if(+Arg.ipsarr[ki].result){
				addipdata(1);
				pie_option.series[0].data[1].value+=1;
			}else{
				addipdata(0);
				pie_option.series[0].data[0].value+=1;
			}
			ki++;
		}
		if(is_reading){
			setMapOption(selectpar);
			myPie.setOption(pie_option);
			myMap.setOption(map_option);
		}
		is_reading=false;
	}
	function setSelect(slpar){
		selectpar=slpar;
		is_reading=true;
		is_select=true;
		Arg.wakeup();
	}

	var $Paint;
	if($container){
		$Paint=createCharts(par)
		$container.append($Paint);
		$Paint=$($Paint);
	}
	$Paint=$("#painting"+par);
	var myPie = echarts.init($Paint.find('.scan_pie')[0]);
	var myMap = echarts.init($Paint.find('.scan_map')[0]);
	//直接dom对象绑定事件 一面有jquery缓存;
	$Paint.find(".spanbt-a")[0].onclick=function (e){
		Arg.setSelect(2);
	};
	$Paint.find(".spanbt-s")[0].onclick=function (e){
		Arg.setSelect(1);
	};
	$Paint.find(".spanbt-f")[0].onclick=function (e){
		Arg.setSelect(0);
	};
	pie_option.series[0].data[0].value=0;
	pie_option.series[0].data[1].value=0;
	wakeupdraw();
	var showname=false;
	var mousewheeltimes=0;
//	if(!par) return Arg;
	$Paint.find('canvas')[1].addEventListener('mousewheel',function (e){
		if(e.deltaY<0){
			mousewheeltimes++;
		}else{
			mousewheeltimes--;
		}
		if( mousewheeltimes > 18){
			if(!showname){
				map_option.geo.label.normal.show = showname = true;
				myMap.setOption(map_option);
			}
		}else{
			if(showname){
				map_option.geo.label.normal.show = showname = false;
				myMap.setOption(map_option);
			}
		}
		console.log(mousewheeltimes);
	});
	return Arg;
}