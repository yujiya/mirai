package Scan;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import net.sf.json.JSONObject;

/***
 * 该类是根据输入的IP解析得出IP的实际地址 解析的方法是使用淘宝API 国外IP无法解析
 */
public class address {

	// 改方法是根据url建立连接后读取返回内容 返回形式为json
	// 返回示例：
	/*
	 * { address: "CN|北京|北京|None|CHINANET|1|None", #地址 content: #详细内容 { address:
	 * "北京市", #简要地址 address_detail: #详细地址信息 { city: "北京市", #城市 city_code: 131,
	 * #百度城市代码 district: "", #区县 province: "北京市", #省份 street: "", #街道
	 * street_number: "" #门址 }, point: #当前城市中心点，注意当前坐标返回类型 { x: "116.39564504",
	 * y: "39.92998578" } }, status: 0 #返回状态码 }
	 */
	public static String getAddress(String url) {
		StringBuilder addressRes = new StringBuilder();
		try {
			URL urlObject = new URL(url);// 创建url对象

			java.net.URLConnection uc = urlObject.openConnection();// 创建连接实例
			BufferedReader in = new BufferedReader(new InputStreamReader(uc
					.getInputStream()));// 读取返回内容
			String inputLine = null;
			while ((inputLine = in.readLine()) != null) {
				addressRes.append(inputLine);// 添加至结果字符串
			}
			in.close();// 关闭读取流
		} catch (MalformedURLException e) {
			// e.printStackTrace();
			System.out.println("网络错误");
		} catch (IOException e) {
			// e.printStackTrace();
			System.out.println("网络错误");
			addressRes.append("internet error");// 异常处理
		}
		return addressRes.toString();// 返回对象
	}

	//http://api.map.baidu.com/location/ip?ip=192.168.60.38&ak=2ZFHECPCLnoeZnTeYG486NRubcjRddV9&coor=bd09ll
	public static String address_detail(String ip) {
		String res = "";// 创建字符串结果
		String url = "http://api.map.baidu.com/location/ip?ip=" + ip
				+ "&ak=O2uuYCSGq12iHzFWARK77hA77hOLWfHA&coor=bd09ll";// 调用百度地图API并在url中写入IP
		String json = getAddress(url);// 获取返回的json形式的结果字符串
		// System.out.println(json);
		if (json.equals("internet error"))
			return "internet error";

		JSONObject jsonObject = JSONObject.fromObject(json);// 将字符串转

		// 参考：http://blog.csdn.net/sivyer123/article/details/18255689
		// jsonObject 形式
		// {"code":0,"data":{"country":"日本","country_id":"JP","area":"","area_id":"","region":"","region_id":"","city":"","city_id":"","county":"","county_id":"","isp":"","isp_id":"","ip":"180.20.64.38"}}
		// System.out.println(jsonObject);
		// json 学习
		// http://www.cnblogs.com/jianrong-zheng/archive/2013/07/26/3217228.html

		String status = jsonObject.getString("status");
		if (!status.equals("0")) { // code 非0表示失败
			res = "Error:" + status;
			return res;
		}

		JSONObject Jsoncontent = jsonObject.getJSONObject("content");
		JSONObject Jsonpoint = Jsoncontent.getJSONObject("point");
		JSONObject Jsonaddress_detail = Jsoncontent
				.getJSONObject("address_detail");
		// String country = Jsonaddress_detail.getString("country");// 获取相应的国家信息
		String province = Jsonaddress_detail.getString("province");// 获取相应的区域信息
		String city = Jsonaddress_detail.getString("city");// 获取相应的城市信息
		String x = Jsonpoint.getString("x");// 获取经度
		String y = Jsonpoint.getString("y");// 获取纬度
		res = province + " " + city + "," + x + "," + y;
		return res;
	}

	public static void main(String args[]) {
		System.out.println(address_detail("10.10.24.216"));
		// System.out.println(addressToLatAndLng("南京市"));
	}
}
