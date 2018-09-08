package Scan;

//180.209.64.38/30

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.SocketException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import javax.swing.text.AbstractDocument.Content;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.mysql.jdbc.Connection;
import com.sun.org.apache.bcel.internal.generic.NEW;



/*扫描类   
 * 扫描后获取结果写入数据库*/

//扫描可以采用线程池实现
public class Scan {
	private static Logger logger=LogManager.getLogger(Scan.class);
	private static final int PORT = 23;// 扫描23端口
	private BufferedWriter buf_w;// 文件写入流
	private static final int POOL_SIZE = 10;// 设置线程池大小为10
	private ExecutorService pool;
	private ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<String>();// 并发队列
	private List<String> pwdpool;// 密码集合
	private java.sql.Connection Con;// 数据库连接
	private Statement statement;
	
	public Scan() throws IOException {
		if (ConstantPool.firstScan == 1)
			ConstantPool.firstScan = 0;// 第一次运行后设置firstScan标记为0
		if (ConstantPool.Type.equals("1"))
			pwdpool = ConstantPool.getPasswordsFormUser();// 在哪儿初始化自定义常量池？
		else
			pwdpool = ConstantPool.Passwords;// 获取密码池
		System.out.println("type" + ConstantPool.Type);
		pool = Executors.newFixedThreadPool(POOL_SIZE);// 创建线程池 设置大小为10
		buf_w = new BufferedWriter(new FileWriter(new File("E:\\scan.txt")));// 写入流
		Con = Dao.getConnection();// 获取数据库连接
	}

	// 根据IP和掩码获取需要扫描的IP集合 对集合中的每一个IP进行扫描后向文件中写入扫描结果 浏览端实时读取文件中的信息
	public void scan(String IP, String mask) throws IOException, SQLException {

		ConstantPool.cnt++;
		int cnttemp = ConstantPool.cnt;
		List<String> ipList = new ArrayList<String>();// 将IP段解析成IP列表
		ipList = IpUtils.parseIpMaskRange(IP, mask);// 获取需要被扫的IP列表
		// truncate();// 清空扫描结果表格
		for (String ip : ipList)
			pool.execute(new GetData(ip, queue, pwdpool)); // 每次创建一个新的线程
		
		new Thread(new WriteIntoFile(buf_w, queue, Con, cnttemp)).start();// 监听数据线程
		pool.shutdown();
	}

	private void truncate() throws SQLException {
		// 删除表中的数据
		String sqltruncate = "truncate table  scaninfo;";
		statement = Con.createStatement();
		statement.executeUpdate(sqltruncate);// 清空表中的数据
		System.out.println("清空数据成功！");
	}

	class GetData implements Runnable // 获取结果数据 写入队列中
	{
		private ConcurrentLinkedQueue<String> queue;
		private String ip;
		private List<String> pwdpool;

		public GetData(String ip, ConcurrentLinkedQueue<String> queue,
				List<String> pwd) {
			this.ip = ip;
			this.queue = queue;
			this.pwdpool = pwd;
		}

		// 80 23都扫
		public void run() {
			try {
				String content23 = "";
				String[] addressarrray = new String[3];
				String resaddress = new address().address_detail(ip);// 获取IP的实际地址
				if ("Error:1".equals(resaddress)) {
					addressarrray[0] = "内网或者国外IP";
					addressarrray[1] = "0.0";
					addressarrray[2] = "0.0";
				} else
					addressarrray = resaddress.split(",");
				SimpleDateFormat df = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");// 设置日期格式
				String time = df.format(new Date());// 获取当前的系统时间

				/* 扫80端口 */
				String bannerinfo = Banner.getBanner(ip);// 根据ip地址信息获取banner
				Boolean bannerflag = Banner.judge(bannerinfo);// 判断是否是banner
				String content80 = "";
				if (bannerflag)
					content80 = ip + ",80,1,null,null," + time + ","
							+ addressarrray[0] + "," + addressarrray[1] + ","
							+ addressarrray[2] + "," + bannerinfo + "," +ConstantPool.Loophole.LOOP_CAMERA_WEAKPASS +"";
				else
					content80 = ip + ",80,0,null,null," + time + ","
							+ addressarrray[0] + "," + addressarrray[1] + ","
							+ addressarrray[2] + "," + bannerinfo + "," +ConstantPool.Loophole.LOOP_NONE +"";
				queue.add(content80);

				/* 扫23端口 */
				System.out.println("正在检测" + ip + "……");
				boolean isConnectable = TelnetOperator.isHostConnectable(ip,
						PORT);// 判断23端口是否开启
				if (isConnectable) {// 23端口开启的情况下进行爆破
					System.out.println("『成功』" + ip + ":23端口已开启！");
					for (String userNamePasswd : pwdpool) {// 用常量池中的密码去尝试
						String time23 = df.format(new Date());
						String username = userNamePasswd.split(",")[0];// 解析密码池中数据获取用户名
						String passwd = userNamePasswd.split(",")[1];
						TelnetOperator telnet = new TelnetOperator("VT100",
								"^]"); // Windows,用VT220,否则会乱码 第一个参数为协议类型
						// 第二个为结束字符
						boolean result = telnet.login(ip, PORT, username,
								passwd); // 调用telnet传入参数验证
						if (result) {// 如果超过爆破
							System.out.println("『成功』" + ip + ":爆破成功！");
							System.out.println("用户名：" + username + "密码："
									+ passwd);
							content23 = ip + ",23,1," + username + "," + passwd
									+ "," + time23 + "," + addressarrray[0]
									+ "," + addressarrray[1] + ","
									+ addressarrray[2] + "," + bannerinfo
									+ "," +ConstantPool.Loophole.LOOP_CAMERA_WEAKPASS +"";
						} else {
								System.out.println("『失败』" + ip + ":爆破失败！");
								content23 = ip + ",23,0," + username + "," + passwd
										+ "," + time23 + "," + addressarrray[0]
										+ "," + addressarrray[1] + ","
										+ addressarrray[2] + "," + bannerinfo
										+ "," +ConstantPool.Loophole.LOOP_CAMERA_WEAKPASS + "";
						}
						queue.add(content23);
					}
				} else { // 23端口没有打开
					content23 = ip + ",23,0,null,null," + time + ","
							+ addressarrray[0] + "," + addressarrray[1] + ","
							+ addressarrray[2] + "," + bannerinfo + "," +ConstantPool.Loophole.LOOP_NONE +"";
					queue.add(content23);
				}
				
				//扫描路由器ip，8080端口
				String content8080="";
				logger.info("正在检测" + ip + "……");
				String Banner_Router=Banner.getBanner(ip+":8080");
				Boolean isRouter=Banner.judge_router(Banner_Router);
				String timerouter = df.format(new Date());// 获取当前的系统时间
				if(isRouter==true){
					logger.info("是d_link路由器"+ip+":8080端口已开启！");
					ShellRouter shellrouter=new ShellRouter();
					//String result=shellrouter.shellrou(ip);//调用python函数
					String router=shellrouter.getMessage_router();
					logger.info("router信息: "+router);
					String usernameRouter = router.split(",")[0];
					String passwdRouter = router.split(",")[1];
					if(usernameRouter=="none"){
						logger.info("『失败』" + ip + ":爆破失败！");
						logger.info("用户名：" + usernameRouter + "密码："+ passwdRouter);
						content8080=ip + ",8080,0," + usernameRouter + "," + passwdRouter
								+ "," + timerouter + "," + addressarrray[0]
								+ "," + addressarrray[1] + ","
								+ addressarrray[2] + "," + "DIR-850L"
								+ "," +ConstantPool.Loophole.LOOP_ROUTER_WEAKPASS +"";
						queue.add(content8080);
						
					}else{
						logger.info("『成功』" + ip + ":爆破成功！");
						logger.info("用户名：" + usernameRouter + "密码："+ passwdRouter);
						content8080=ip + ",8080,1," + usernameRouter + "," + passwdRouter
								+ "," + timerouter + "," + addressarrray[0]
								+ "," + addressarrray[1] + ","
								+ addressarrray[2] + "," + "DIR-850L"
								+ "," +ConstantPool.Loophole.LOOP_ROUTER_WEAKPASS +"";
						queue.add(content8080);
						
					}
				}else{
					logger.info("不是d_link路由器");
					content8080 = ip + ",8080,0,null,null," + timerouter + ","
							+ addressarrray[0] + "," + addressarrray[1] + ","
							+ addressarrray[2] + "," + Banner_Router + "," + ConstantPool.Loophole.LOOP_NONE +"";
					queue.add(content8080);
				}
				
				
				System.out.println("********" + queue.toString());
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}

		}
	}

	class WriteIntoFile implements Runnable { // 从队列中不断获取数据并写入到文件中 写到数据库中
		private BufferedWriter out;
		private ConcurrentLinkedQueue<String> queue;
		private java.sql.Connection Con;
		private PreparedStatement pstmt;
		private String[] temp;
		private int cnt;

		public WriteIntoFile() {
		}

		public WriteIntoFile(BufferedWriter out,
				ConcurrentLinkedQueue<String> queue, java.sql.Connection Con,
				int cnt) {
			this.out = out;
			this.queue = queue;
			this.Con = Con;
			this.cnt = cnt;
		}

		@Override
		public void run() {
			synchronized (queue) {
				while (cnt == ConstantPool.cnt) {
					if (!queue.isEmpty()) {
						try {
							String content = queue.poll();// 获取写入的内容
							out.write(content);
							out.flush();
							temp = content.split(",");
							System.out.println("数组为" + content);
							// 写入扫描结果数据库//prepareStatement
							// 使用参考：
							// http://blog.csdn.net/zsm653983/article/details/7296609
							String sqlscan = "insert into scaninfo (ip,port,result,username,pwd,time,ipaddress,longitude,latitude,banner,loophole) values (?,?,?,?,?,?,?,?,?,?,?)";// 添加数据库
							// System.out.println("插入字符串为："+sqlscan);
							try {
								pstmt = Con.prepareStatement(sqlscan);
								pstmt.setString(1, temp[0]);
								pstmt.setString(2, temp[1]);
								pstmt.setString(3, temp[2]);
								pstmt.setString(4, temp[3]);
								pstmt.setString(5, temp[4]);
								pstmt.setString(6, temp[5]);
								pstmt.setString(7, temp[6]);
								pstmt.setString(8, temp[7]);
								pstmt.setString(9, temp[8]);
								pstmt.setString(10, temp[9]);
								pstmt.setString(11, temp[10]);
								pstmt.executeUpdate();
							} catch (Exception e) {
								try {
									Con.rollback();
								} catch (SQLException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}
								e.printStackTrace();
							}
							System.out.println("写入扫描数据库成功!");
							// 写入历史信息数据库
							String sqlhistory = "insert into historyinfo (ip,port,result,username,pwd,time,ipaddress,longitude,latitude,banner,loophole) values (?,?,?,?,?,?,?,?,?,?,?);";
							try {
								pstmt = Con.prepareStatement(sqlhistory);
								pstmt.setString(1, temp[0]);
								pstmt.setString(2, temp[1]);
								pstmt.setString(3, temp[2]);
								pstmt.setString(4, temp[3]);
								pstmt.setString(5, temp[4]);
								pstmt.setString(6, temp[5]);
								pstmt.setString(7, temp[6]);
								pstmt.setString(8, temp[7]);
								pstmt.setString(9, temp[8]);
								pstmt.setString(10, temp[9]);
								pstmt.setString(11, temp[10]);
								pstmt.executeUpdate();
							} catch (Exception e) {
								try {
									Con.rollback();// 出现异常则回滚
								} catch (SQLException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}
								e.printStackTrace();
							}
							System.out.println("写入历史数据库成功!");
							System.out.println("***************写入"
									+ queue.toString());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					try {
						Thread.sleep(100);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	public static void main(String[] args) throws IOException, IOException,
			SQLException {
		//new Scan().scan("10.167.64.129", "30");
		//System.out.println("*********扫描结束******");
	}
}
