package Scan;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import Scan.ConstantPool.Loophole;
import net.sf.json.JSONArray;

public class Dao {
	// 数据库操作
	private static final String DRIVER_CLASS = "com.mysql.jdbc.Driver";
	private static final String DATABASE_URL = "jdbc:mysql://180.209.64.38:3307/mirai?useUnicode=true&characterEncoding=UTF-8";
	//private static final String DATABASE_URL = "jdbc:mysql://db01:3306/mirai?useUnicode=true&characterEncoding=UTF-8";
	private static final String USER_NAME = "root";
	private static final String PASSWORD = "jishimen2008";
	// 数据库连接对象
	public static Connection conn;
	// 数据库操作对象
	// private static PreparedStatement pstmt;
	// 加载驱动 静态代码块
	static {
		try {
			Class.forName(DRIVER_CLASS);
		} catch (Exception e) {
			System.out.println("加载驱动错误");
			System.out.println(e.getMessage());
		}
	}

	// 取得连接
	public static Connection getConnection() {
		try {
			conn = DriverManager.getConnection(DATABASE_URL, USER_NAME, PASSWORD);
		} catch (Exception e) {
			System.out.println("取得连接错误");
			System.out.println(e.getMessage());
		}
		return conn;
	}

	public static List<Res> getScanResult() {
		List<Res> resultlist = new ArrayList<Res>();// 扫描结果集合
		String port = null; // 端口号
		String result = null; // 端口扫描结果
		String ip = null; // ip地址
		String username = null; // 23端口测试用户名
		String pwd = null; // 23端口测试用户密码
		String time = null; // 扫描时间
		String ipaddress = null;// ip地址解析实际地址
		String banner = null; // banner信息
		String longitude = null;// 经度
		String latitude = null;// 纬度
		String loophole=null;//漏洞类型
		String sqlquery = "select  * from  scaninfo";
		Connection connection = Dao.getConnection();// 获取connection对象
		try {
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery(sqlquery);
			while (rs.next()) {// 遍历结果集合
				ip = rs.getString(1);
				port = rs.getString(2);
				result = rs.getString(3);
				username = rs.getString(4);
				pwd = rs.getString(5);
				time = rs.getString(6);
				ipaddress = rs.getString(7);
				latitude = rs.getString(8);
				longitude = rs.getString(9);
				banner = rs.getString(10);
				loophole=rs.getString(11);
				System.out.println(banner);
				Res temp = new Res(ip + ":" + port, result, username, pwd, ipaddress, banner, latitude, longitude, loophole);// 生成对象
				resultlist.add(temp);// 放入集合
			}
			rs.close();
			statement.close();
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return resultlist;
	}

	public static List<Res> getHistoryResult(String starttime, String endtime, String IP, String PORT) {
		List<Res> resultlist = new ArrayList<Res>();// 扫描结果集合
		String port = null; // 端口号
		String result = null; // 端口扫描结果
		String ip = null; // ip地址
		String username = null; // 23端口测试用户名
		String pwd = null; // 23端口测试用户密码
		String time = null; // 扫描时间
		String ipaddress = null;// ip地址解析实际地址
		String banner = null; // banner信息
		String longitude = null;// 经度
		String latitude = null;// 纬度
		String loophole=null;//漏洞类型
		String sqlquery = "select  * from  historyinfo where  time between '" + starttime + "' AND '" + endtime
				+ "' AND port='" + PORT + "' AND ip='" + IP + "'";
		Connection connection = Dao.getConnection();// 获取connection对象
		try {
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery(sqlquery);
			while (rs.next()) {// 遍历结果集合
				ip = rs.getString(2);
				port = rs.getString(3);
				result = rs.getString(4);
				username = rs.getString(5);
				pwd = rs.getString(6);
				time = rs.getString(7);
				// ipaddress = rs.getString(8);
				ipaddress = "";
				latitude = rs.getString(9);
				longitude = rs.getString(10);
				banner = rs.getString(11);
				loophole=rs.getString(12);
				System.out.println(banner);
				Res temp = new Res(ip + ":" + port, result, username, pwd, ipaddress, banner, latitude, longitude,loophole);// 生成对象
				resultlist.add(temp);// 放入集合
			}
			rs.close();
			statement.close();
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(resultlist.size());
		return resultlist;
	}

	public static void truncate() throws SQLException {
		// 删除表中的数据
		String sqltruncate = "truncate table  scaninfo;";
		Statement statement = Dao.getConnection().createStatement();
		statement.executeUpdate(sqltruncate);// 清空表中的数据
		System.out.println("清空数据成功！");
	}

	// 项目数据库设计操作思路：点击扫描按钮的时候扫描放入scaninfo和historyinfo中
	// scaninfo中保存每次扫描信息，historyinfo中放入历史扫描信息
	public static void main(String[] args) {
//		getHistoryResult("2017-4-5", "2017-5-10", "180.209.64.38", "23");
		JSONArray jsonArray = JSONArray.fromObject(Dao.getScanResult());// 转成json
		// 数据库存放顺序和获取顺序不一致，需要
		System.out.println("获取结果！！！！！！！！！！！");
		System.out.println("!!!!!!!!!!!" + jsonArray.toString());
	}
	
	

}
