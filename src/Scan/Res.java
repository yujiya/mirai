package Scan;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/*返回结果类
 * 包括相关数据  
 * 已封装
 * */
public class Res {

	private String result; // 端口扫描结果
	private String ipport; // ip地址
	private String username; // 23端口测试用户名
	private String pwd; // 23端口测试用户密码
	private String time; // 扫描时间
	private String ipaddress;// ip地址解析实际地址
	private String banner; // banner信息
	private String longitude;// 经度
	private String latitude;// 纬度
	private String loophole;//漏洞类型

	public Res(String ipport, String result, String username, String pwd,
			String ipaddress, String banner, String longitude, String latitude,String loophole 
	) {
		this.ipport = ipport;
		this.result = result;
		this.username = username;
		this.pwd = pwd;
		this.ipaddress = ipaddress;
		this.banner = banner;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		this.time = df.format(new Date());
		this.longitude = longitude;
		this.latitude = latitude;
		this.loophole=loophole;
	}

	public String getipport() {
		return this.ipport;
	}

	public String getlongitude() {
		return longitude;
	}

	public void setlongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public void setipport(String ipport) {
		this.ipport = ipport;
	}

	public String gettime() {
		return this.time;
	}

	public void settime(String time) {
		this.time = time;
	}

	public String getresult() {
		return this.result;
	}

	public void setresult(String result) {
		this.result = result;
	}

	public String getusername() {
		return this.username;
	}

	public void setusername(String username) {
		this.username = username;
	}

	public String getpwd() {
		return this.pwd;
	}

	public void setpwd(String pwd) {
		this.pwd = pwd;
	}

	public String getipaddress() {
		return this.ipaddress;
	}

	public void setipaddress(String ipaddress) {
		this.ipaddress = ipaddress;
	}

	public String getbanner() {
		return this.banner;
	}

	public void setbanner(String banner) {
		this.banner = banner;
	}
	

	public String getLoophole() {
		return loophole;
	}

	public void setLoophole(String loophole) {
		this.loophole = loophole;
	}

	public static void main(String[] args) {
		// 需要get set方法
		Res res = new Res("1", "a", "a", "a", "a", "a", "", "","a");
		List<Res> resultlist = new ArrayList<Res>();
		resultlist.add(res);
		resultlist.add(res);
		resultlist.add(res);
		resultlist.add(res);
		JSONArray jsonArray = JSONArray.fromObject(resultlist);
		System.out.println(jsonArray.toString());

	}
}
