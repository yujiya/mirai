package Scan;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class StartScanServlet 响应前端点击扫描触发事件
 */
public class StartScanServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Default constructor.
	 */
	public StartScanServlet() {
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(
				request.getContextPath());
		String ip = (String) request.getParameter("ip"); // 获取IP对象
		String mask = (String) request.getParameter("mask");// 获取mask对象
		String type = (String) request.getParameter("Type");
		String txt = null;
		System.out.println("获取到ip和掩码" + ip + mask + type);
		ConstantPool.Type = type;
		if (type.equals("1")) {
			txt = request.getParameter("txt");// 获取密码文件内容
			System.out.println("密码本内容：" + txt);
			ConstantPool.initPasswordsFormUser(txt);
		}
		System.out.println("调试********************" + ip + mask);
		try {
			Dao.truncate();
			new Scan().scan(ip, mask);// 触发事件

		} catch (SQLException e) {
			e.printStackTrace();
		}
		response.getWriter().print("success");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
