package Scan;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

//常量池 用于放账户信息和密码信息
public class ConstantPool {
	public static LinkedList<String> passwordsFormUser;// 用户通过xml文件提供的密码池
	public static String Type = "0";// 0表示用写死的账号密码，1表示用配置文件
	public static int firstScan = 1;// 设置第一次扫描标记
	public static int cnt = 0;
	
	//漏洞类型常量
	public interface Loophole{
		String LOOP_NONE="无漏洞";
		String LOOP_CAMERA_WEAKPASS="摄像头弱口令漏洞";
		String LOOP_ROUTER_WEAKPASS="路由器弱口令漏洞";
		String LOOP_PRINTER_WEAKPASS="打印机未授权访问漏洞";
	}
	
	
	public static final List<String> Passwords = Arrays.asList(
			"root,123456",
			"admin,admin",
			"root,vizxv",
			// "root,888888",
			// "root,xmhdipc",
			"root,default",
			// "root,juantech",
			// "root,54321",
			"root,ji.shi.men.2017", "root,password", "root,admin", "root,12345",
			"root,admin12345", "root,root");

	// banner池
	public static final List<String> Banners = Arrays.asList("[DNVRS-Webs]",
			"[App-webs/]", "[DVRDVS-Webs]", "[Hikvision-Webs]",
			"[GoAhead-Webs]", "[WindWeb/2.0]", "[Unisvr]");
	
	//路由器banner池
	public static final String Router_Banner=".*DIR-850L.*";
	
	// 初始化用户自定义密码池
	public static void initPasswordsFormUser(String content) {
		passwordsFormUser = new LinkedList<String>();
		String[] res = content.split("\n");
		for (String temp : res) {
			passwordsFormUser.add(temp);
			System.out.println("密码池初始化" + temp);
		}
	}

	// 获取用户自定义密码池
	public static LinkedList<String> getPasswordsFormUser() {
		return passwordsFormUser;
	}
	
}
