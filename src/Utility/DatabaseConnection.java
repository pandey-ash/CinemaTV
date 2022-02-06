package Utility;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection
{
	public static Connection getConnection()
	{
		try
		{
			Class.forName("com.mysql.jdbc.Driver");
			Connection con=DriverManager.getConnection("jdbc:mysql://192.168.57.231:3306/cinematv","root","root");
			return con;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
	
	public static void closeConnection(Connection con)
	{
		try
		{
			con.close();
		}catch(Exception e)
		{
			
		}
	}
}
