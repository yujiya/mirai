package Scan;

import java.util.List;
import java.util.Map;

import java.util.regex.*;
import com.sun.org.apache.xml.internal.resolver.helpers.PublicId;

public class Banner {
	public static String getBanner(String url) {
		String result = null;// 返回的结果
		try {
			java.net.URL connURL = new java.net.URL("http://" + url);// 访问IP所在的网页
			// 例如：http://10.20.160.6
			java.net.HttpURLConnection httpConn = (java.net.HttpURLConnection) connURL
					.openConnection();// 建立连接
			httpConn.setConnectTimeout(3000);// 设置超时时间为5s
			httpConn.connect();// 连接
			Map<String, List<String>> headers = httpConn.getHeaderFields();// //获取响应头字段
			// 以键对值的形式获取
			result = headers.get("Server").toString();// 获取其中的server字段
			// 不清楚headers可以打印headers
			System.out.println("获取到的banner为" + result);
		} catch (Exception e) {
			System.out.println("获取banner超时");
			result = "no banner";// 异常处理 否则返回字符串为空
		}
		return result;
	}

	// 和banner池中的每一个元素进行比对 成功匹配则返回true
	public static boolean judge(String bannerinfo) {
		for (String banner : ConstantPool.Banners)
			if (bannerinfo.equals(banner))// 如果和banner池中任何一个相同则返回true表示是摄像头banner
				return true;
		return false;
	}
	
	public static boolean judge_router(String bannerinfo){
		Boolean isMatch_Router=Pattern.matches(ConstantPool.Router_Banner,bannerinfo);
		return isMatch_Router;
	}

	public static void main(String[] args) {
		//System.out.print(judge_router(new Banner().getBanner("218.254.197.52:8080")));
		//System.out.print(judge_router(new Banner().getBanner("183.82.115.245:8080 ")));
		System.out.print(judge_router(new Banner().getBanner("59.25.102.192:8080")));
	}

}
