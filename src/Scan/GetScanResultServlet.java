package Scan;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

/**
 * 该servlet扫描结果
 */
public class GetScanResultServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetScanResultServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	// 相应get请求
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8"); // 解决传输过程中的中文乱码问题
		List<Res> list = Dao.getScanResult();
		JSONArray jsonArray = JSONArray.fromObject(list);// 转成json
		// 数据库存放顺序和获取顺序不一致，需要
		System.out.println("获取结果！！！！！！！！！！！");
		System.out.println("!!!!!!!!!!!" + jsonArray.toString());
		response.getWriter().println(jsonArray.toString());// 将数据以json 字符串的格式发送

		// System.out.println("**********************json*********"+JSONArray.fromObject(resultlist).toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
