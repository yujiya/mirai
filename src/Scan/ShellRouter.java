package Scan;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;



public class ShellRouter {
	private static  Logger logger=LogManager.getLogger(ShellRouter.class);
	private String message_router="ghfrkqns31";
	
	public String getMessage_router() {
		return message_router;
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
	            message_router = "";  
	            while ((line = br.readLine()) != null) {  
	                if (type.equals("Error")) {  
	                    System.out.println("Error   :" + line);
	                    message_router=line;
	                } else {  
	                    System.out.println("Debug:" + line);
	                    message_router=line;
	                }  
	            }  
	        } catch (IOException ioe) {  
	            ioe.printStackTrace();
	            logger.info("IOException异常ioe");
	        }  
	    }
	}
	
	public String shellrou(String ip)
	{
		Properties props = new Properties();
		try {
		InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("Url.properties");
		props.load(in);
		}catch (IOException e) {
		e.printStackTrace();
		}
			String[] cmds={"/bin/sh","-c","python3 /root/pythonPoc/pure_poc.py http://"+ip+":8080"};
			//String cmds="python3 /root/pythonPoc/pure_poc.py http://"+ip+":8080";
			logger.info("执行的命令："+cmds[2]);
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
	                logger.info("InterruptedException异常e");
	            }
	        }
	        catch (IOException e)
	        {
	            e.printStackTrace();
	            logger.info("IOException异常e");
	        }
	        return null;
	}
	
	
}
