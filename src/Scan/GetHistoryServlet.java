package Scan;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

public class GetHistoryServlet extends HttpServlet {

	public GetHistoryServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	/*	response.getWriter().append("Served at: ").append(
				request.getContextPath());*/
		String starttime = request.getParameter("starttime");
		String endtime = request.getParameter("endtime");
		System.out.println(starttime + "*********" + endtime);
		String[] s = starttime.split("/");
		starttime = s[0] + "-" + s[1] + "-" + s[2];
		String[] e = endtime.split("/");
		endtime = e[0] + "-" + e[1] + "-" + e[2];
		System.out.println("起始时间" + starttime + "终止时间" + endtime);
		String ip = request.getParameter("ip");
		String port = request.getParameter("port");
		response.setContentType("text/html;charset=UTF-8");
		JSONArray jsonArray = JSONArray.fromObject(Dao.getHistoryResult(
				starttime, endtime, ip, port));
		System.out.println(jsonArray.toString());
		response.getWriter().println(jsonArray.toString());
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	public void init() throws ServletException {
		// Put your code here
	}

}
