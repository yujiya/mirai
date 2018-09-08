/**
 * 
 */
package Scan;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;

import net.sf.json.JSONArray;

public class UpdateMirai extends HttpServlet{
	
	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	String message = "";
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String url = (String)req.getParameter("url");
		String port = (String)req.getParameter("port");
		String username = (String)req.getParameter("username");
		String password = (String)req.getParameter("password");
		String result=shell(url, port, username, password);
		resp.getWriter().println(message);// 将数据以json 字符串的格式发送
	}
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doGet(req, resp);
	}
	
	 class StreamGobbler extends Thread {  
	    InputStream is;  
	    String type;
	    private String line=null;
	    
	    public StreamGobbler(InputStream is, String type) {  
	        this.is = is;  
	        this.type = type;  
	    }  
	    public void run() {  
	        try 
	        {  
	            InputStreamReader isr = new InputStreamReader(is);  
	            BufferedReader br = new BufferedReader(isr);  
	            message = "";
	            //String line = null;  
	            while ((line = br.readLine()) != null) {  
	                if (type.equals("Error")) {  
	                    System.out.println("Error   :" + line);
	                    message += line + "\r\n";
	                } else {  
	                    System.out.println("Debug:" + line);
	                    message += line + "\r\n";
	                }  
	            }  
	        } catch (IOException ioe) {  
	            ioe.printStackTrace();  
	        }  
	    }
	    public String Getline()
	    {
	    	return line;
	    }
	}  
	
	public String shell(String ip,String port,String username,String password)
	{
		Properties props = new Properties();
		try {
		InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("Url.properties");
		props.load(in);
		}catch (IOException e) {
		e.printStackTrace();
		}
			String[] cmds = {"/bin/sh", "-c","echo " + "'" + ip + ":" + port + " " +username +":"+password +"'" + "| "+ props.getProperty("miraiPath")};
			System.out.println(cmds);
			Process process;
	        try
	        {
	        	process = Runtime.getRuntime().exec(cmds);//执行一个系统命令
	            StreamGobbler errorGobbler = new StreamGobbler(process.getErrorStream(), "Error");
	            StreamGobbler outputGobbler = new StreamGobbler(process.getInputStream(), "Output");
	            errorGobbler.start();
	            outputGobbler.start();
	            try
	            {
	                process.waitFor();
	            }
	            catch (InterruptedException e)
	            {
	                e.printStackTrace();
	            }
	        }
	        catch (IOException e)
	        {
	            e.printStackTrace();
	        }
	        return null;
	}
	
	
}
