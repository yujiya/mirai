package Scan;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketException;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.commons.net.telnet.TelnetClient;

/**
 * Telnet操作器,基于commons-net-2.2.jar telnet操作类 在TelnetClient基础上进行开发
 */
public class TelnetOperator {
	
	private static final String printer=".*Password is not set.*";
	private String prompt = ">"; // 结束标识字符串,Windows中是>,Linux中是#
	private char promptChar = '>'; // 结束标识字符
	private TelnetClient telnet;
	private InputStream in; // 输入流,接收返回信息
	private PrintStream out; // 向服务器写入 命令
	
	
	public static Boolean isPrinter(String ip){
		TelnetClient telnetClient = new TelnetClient("vt200");  //指明Telnet终端类型，否则会返回来的数据中文会乱码
		telnetClient.setDefaultTimeout(1000); //socket延迟时间：3000ms
		try {
			telnetClient.connect(ip,23);//建立一个连接,默认端口是23
			InputStream inputStream = telnetClient.getInputStream(); //读取命令的流
			byte[] b = new byte[1024];
			int size=0;
			int size_all=40;
			StringBuffer sBuffer=new StringBuffer();
			
			while(size<size_all){
				size+=inputStream.read(b,size,size_all-size);
			}
			sBuffer.append(new String(b,0,size));
			
			String printer23=sBuffer.toString().replaceAll("\\r"," ").replaceAll("\\n"," ");
			System.out.println(printer23);
			Boolean is_Match=Pattern.matches(printer,printer23);
			telnetClient.disconnect();
			System.out.println(is_Match);
			return is_Match;
		} catch (SocketException e) {
			//e.printStackTrace();
			System.out.println("none_socket");
			return false;
		} catch (IOException e) {
			//e.printStackTrace();
			System.out.println("none_IO");
			return false;
		}
	}
	
	/**
	 * @param termtype
	 *            协议类型：VT100、VT52、VT220、VTNT、ANSI
	 * @param prompt
	 *            结果结束标识
	 */
	public TelnetOperator(String termtype, String prompt) {
		telnet = new TelnetClient(termtype);
		setPrompt(prompt);
	}

	public TelnetOperator(String termtype) {
		telnet = new TelnetClient(termtype);
	}

	public TelnetOperator() {
		telnet = new TelnetClient();
	}

	/**
	 * 登录到目标主机
	 */
	public boolean login(String ip, int port, String username, String password) {
//		if (ip.equals("180.209.64.38") && password.equals("ji.shi.men.2017"))
//			return true;
		try {
			telnet.setDefaultTimeout(2000);
			telnet.connect(ip, port);
			in = telnet.getInputStream();
			out = new PrintStream(telnet.getOutputStream());
			readUntil("login:");// 读到login后
			write(username);// 写入用户名
			readUntil("Password:");// 读到密码后
			write(password);// 写入密码
			String rs = readAll();// 读取返回数据
			System.out.println("获得返回数据" + rs);
			// 此处健壮性待改进
			if (rs != null
					&& (rs.contains("Last failed login") || rs
							.contains("BusyBox"))) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			System.out.println("telnet登录超时……");
			return false;
		}
	}

	/**
	 * 读取分析结果
	 * 
	 * @param pattern
	 *            匹配到该字符串时返回结果
	 * @return
	 */
	public String readUntil(String pattern) {
		StringBuffer sb = new StringBuffer();
		try {
			char lastChar = (char) -1;
			boolean flag = pattern != null && pattern.length() > 0;
			if (flag)
				lastChar = pattern.charAt(pattern.length() - 1);
			char ch;
			int code = -1;
			while ((code = in.read()) != -1) {
				ch = (char) code;
				sb.append(ch);
				System.out.print(ch);

				// 匹配到结束标识时返回结果
				if (flag) {
					if (ch == lastChar && sb.toString().endsWith(pattern)) {
						return sb.toString();
					}
				} else {
					// 如果没指定结束标识,匹配到默认结束标识字符时返回结果
					if (ch == promptChar)
						return sb.toString();
				}
				// 登录失败时返回结果
				if (sb.toString().contains("Login incorrect")) {
					return sb.toString();
				}
			}
		} catch (Exception e) {
			// e.printStackTrace();
		}
		return sb.toString();
	}

	public String readAll() {
		StringBuffer sb = new StringBuffer();
		try {
			char lastChar = (char) -1;
			char ch;
			int code = -1;
			while ((code = in.read()) != -1) {
				ch = (char) code;
				sb.append(ch);
				//System.out.print(ch);
			}
		} catch (Exception e) {
			// e.printStackTrace();
		}
		return sb.toString();
	}

	/**
	 * 发送命令
	 * 
	 * @param value
	 */
	public void write(String value) {
		try {
			out.println(value);
			out.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发送命令,返回执行结果
	 * 
	 * @param command
	 * @return
	 */
	public String sendCommand(String command) {
		try {
			write(command);
			return readUntil(prompt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 关闭连接
	 */
	public void distinct() {
		try {
			if (telnet != null && !telnet.isConnected())
				telnet.disconnect();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void setPrompt(String prompt) {
		if (prompt != null) {
			this.prompt = prompt;
			this.promptChar = prompt.charAt(prompt.length() - 1);
		}
	}

	// 判断端口是否打开 实现原理通过socket建立连接
	public static boolean isHostConnectable(String host, int port) {
		Socket socket = new Socket();
		try {
			socket.connect(new InetSocketAddress(host, port), 3000); // InetSocketAddress
			// http://blog.csdn.net/u011068702/article/details/52336238
			// 设置超时时间为2s
		} catch (Exception e) {
			// e.printStackTrace();
			System.out.println("23端口未打开！");// 超时则跳转catch中处理
			return false;
		} finally {
			try {
				socket.close();
			} catch (IOException e) {
				// e.printStackTrace();
			}
		}
		System.out.println("23端口已打开！");
		return true;
	}

	// 此方法未使用到
	public static List<String> IPSection2IPList(String ipSection) {
		String ip = ipSection.split("/")[0];
		int section = Integer.parseInt(ipSection.split("/")[1]);

		return null;
	}

	public static void main(String[] args) throws SocketException, IOException {
		TelnetOperator telnet = new TelnetOperator("VT100", "#"); // Windows,用VT220,否则会乱码
		boolean result = telnet.login("180.209.64.38", 23, "root",
				"ji.shi.men.2017");
		System.out.println("扫描结果" + result);
		String rs = telnet.sendCommand("ipconfig");
		try {
			rs = new String(rs.getBytes("ISO-8859-1"), "UTF-8"); // 转一下编码
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		System.out.println(rs);
	}
	// 代码参考：http://blog.csdn.net/jakey766/article/details/12782969
}
