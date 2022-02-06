package CommonDoa;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;

import Bean.AddInputBean;
import Bean.LoginInputBean;
import Bean.OutputBean;
import Bean.UserChoiceBean;
import Utility.DatabaseConnection;

import com.mysql.jdbc.PreparedStatement;

public class CommonDoa
{
	Connection con = DatabaseConnection.getConnection();
	
	/////////////////////////////////////////////////////admin operation ////////////////////////////////////////////////////////////
	
	public String checkDuplicateEntry(AddInputBean inputbean) throws SQLException
	{
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select case when broadcast_date=? then case when from_time<=? and ?<to_time then show_name when ?<from_time then case when ?>from_time then show_name end end end from timing");
		if(inputbean.getId() != null)
		{
			String timing_id=inputbean.getTiming_id();
			st = (PreparedStatement) con.prepareStatement(" select show_name from timing where broadcast_date=? and ((from_time<=? and ?<to_time) and (from_time<? and ?<=to_time)) and pk_timing_id<>"+timing_id);
		}
		st.setString(1, inputbean.getBroadcast_date());
		st.setString(2, inputbean.getStart_time());
		st.setString(3, inputbean.getStart_time());
		st.setString(4, inputbean.getStart_time());
		st.setString(5, inputbean.getEnd_time());
		ResultSet rs = st.executeQuery();
		while(rs.next())
		{
			if(rs.wasNull())
			{System.out.println("in if");
				continue;
			}
			return rs.getString(1);
		}
		return "";
	}
	
	public String getCategoryId(AddInputBean inputbean) throws SQLException
	{
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select pk_category_id from category where super_category=? and name=?");
		st.setString(1, inputbean.getCategory());
		st.setString(2, inputbean.getSub_category());
		ResultSet rs = st.executeQuery();
		while(rs.next())
		{
			return rs.getString(1);
		}
		return null;
	}
	
	public String getForeignKey(AddInputBean inputbean) throws SQLException
	{
		PreparedStatement st = (PreparedStatement) con.prepareStatement("insert into timing(from_time, to_time, show_name, created_date, is_active, broadcast_date, created_by) values(?,?,?, curdate(), 'y',?, 'admin')");
		st.setString(1, inputbean.getStart_time());
		st.setString(2, inputbean.getEnd_time());
		st.setString(3, inputbean.getName());
		st.setString(4, inputbean.getBroadcast_date());
		st.execute();
		st = (PreparedStatement) con.prepareStatement("select pk_timing_id from timing where from_time=? and to_time=? and broadcast_date=?");
		st.setString(1, inputbean.getStart_time());
		st.setString(2, inputbean.getEnd_time());
		st.setString(3, inputbean.getBroadcast_date());
		ResultSet rs = st.executeQuery();
		while(rs.next())
		{
			return rs.getString(1);
		}
		return "";
	}
	
	public void performInsertOperation(AddInputBean inputbean) throws Exception
	{
		
		String duplicate = checkDuplicateEntry(inputbean);
		
		if(duplicate == null)
		{
			
			String timing_foreign_key = getForeignKey(inputbean);
			String category_id = getCategoryId(inputbean);
			
			PreparedStatement st = (PreparedStatement) con.prepareStatement("insert into "+inputbean.getCategory()+"(name, is_imp, broadcast_date, fk_category_id, fk_timing_id, created_date, is_active, created_by) values(?, ?, ?, ?,?,curdate(), 'y', 'admin')");
			st.setString(1, inputbean.getName());
			st.setString(2, inputbean.getIs_imp());
			st.setString(3, inputbean.getBroadcast_date());
			st.setString(4, category_id);
			st.setString(5, timing_foreign_key);
			
			st.execute();
			
			return;
		}
		throw new Exception("Sorry"+duplicate+" Alredy schedule for give date and time");
	}
	
	public void performEditOperation(AddInputBean inputbean) throws Exception
	{
		
		String duplicate = checkDuplicateEntry(inputbean);
		
		if("".equals(duplicate))
		{
			
			String timing_foreign_key = getForeignKey(inputbean);
			String category_id = getCategoryId(inputbean);
			
			PreparedStatement st = (PreparedStatement) con.prepareStatement("update ");
			st.setString(1, inputbean.getName());
			st.setString(2, inputbean.getIs_imp());
			st.setString(3, inputbean.getBroadcast_date());
			st.setString(4, category_id);
			st.setString(5, timing_foreign_key);
			
			st.execute();
			
			return;
		}
		throw new Exception("Sorry"+duplicate+" Alredy schedule for give date and time");
	}
	
	public void deleteoperation(HttpServletRequest request) throws SQLException
	{
		PreparedStatement st = null;
		if("movies".equals(request.getParameter("category")))
		{
			st = (PreparedStatement) con.prepareStatement("update movies set is_active='n' where pk_movie_id="+request.getParameter("id"));
		}
		else if("shows".equals(request.getParameter("category")))
		{
			
			st = (PreparedStatement) con.prepareStatement("update shows set is_active='n' where pk_show_id="+request.getParameter("id"));
		}
		else if("sports".equals(request.getParameter("category")))
		{
			st = (PreparedStatement) con.prepareStatement("update sports set is_active='n' where pk_sport_id="+request.getParameter("id"));
		}
		st.executeUpdate();
		st = (PreparedStatement) con.prepareStatement("update timing set is_active='n' where pk_timing_id="+request.getParameter("timing_id"));
		st.executeUpdate();
	}
	
	
	public LinkedHashMap postSubcategory(String category, String sub_category) throws SQLException
	{
		String category_id="";
		int i=0;
		LinkedHashMap imgList = new LinkedHashMap();
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select pk_category_id from category where super_category=? and name=?");
		st.setString(1, category);
		st.setString(2, sub_category);
		ResultSet rs = st.executeQuery();
		System.out.print("after set helooooooooooooooooooooooooooooooooooooooo");
		while (rs.next())
		{
			category_id = rs.getString(1);
			break;
		}
		PreparedStatement st1 = (PreparedStatement) con.prepareStatement(" select m.name, m.broadcast_date, t.from_time, t.to_time from " +category.toLowerCase()+ " m inner join timing t on m.fk_timing_id=t. pk_timing_id where m.is_active='y' and m.fk_category_id="+category_id);
		System.out.print("img return helooooooooooooooooooooooooooooooooooooooo");
		ResultSet rs1 = st1.executeQuery();
		while (rs1.next())
		{
			imgList.put(String.valueOf(i), rs1.getString(1)+"@!"+rs1.getString(2)+"@!"+rs1.getString(3)+"@!"+rs1.getString(4));
			System.out.print("in whileeeeeeeee"+rs1.getString(1)+"@!"+rs1.getString(2)+"@!"+rs1.getString(3)+"@!"+rs1.getString(4));
			++i;
		}
		return imgList;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	/////////////////////////////////////////////////////admin operation ////////////////////////////////////////////////////////////
	
	public OutputBean validateLogin(LoginInputBean inputbean) throws SQLException
	{
		LinkedHashMap login = new LinkedHashMap();
		OutputBean ob = new OutputBean();
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select is_admin from user where email=? && passwd=?");
		st.setString(1, inputbean.getEmail());
		st.setString(2, inputbean.getPasswd());
		ResultSet rs = st.executeQuery();
		while (rs.next())
		{
			login.put("true", rs.getString(1));
			DatabaseConnection.closeConnection(con);
		    ob.setLogin(login);
		    return ob;
		}
		DatabaseConnection.closeConnection(con);
		login.put("false", "no");
	    ob.setLogin(login);
		return ob;
	}
	
	public LinkedHashMap<String, String> getCategory(String category) throws SQLException
	{
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select super_category, name from category where super_category=?;");
		st.setString(1, category);
		ResultSet rs = st.executeQuery();
		while (rs.next())
		{
			map.put(rs.getString(2), rs.getString(1));
		}
		DatabaseConnection.closeConnection(con);
		return map;
	}
	
	
	public ArrayList<String> getImpShowDetails() throws SQLException
	{
		ArrayList<String> impShow = new ArrayList<String>();
		PreparedStatement st1;
		ResultSet rs;
		st1 = (PreparedStatement) con.prepareStatement("select name from movies where is_imp='y' and is_active='y'");
		rs = st1.executeQuery();
		while(rs.next())
		{
			impShow.add(rs.getString(1));
			System.out.println(impShow);
		}
		st1 = (PreparedStatement) con.prepareStatement("select name from sports where is_imp='y' and is_active='y'");
		rs = st1.executeQuery();
		while(rs.next())
		{
			impShow.add(rs.getString(1));
			System.out.println(impShow);
		}
		st1 = (PreparedStatement) con.prepareStatement("select name from shows where is_imp='y' and is_active='y'");
		rs = st1.executeQuery();
		while(rs.next())
		{
			impShow.add(rs.getString(1));
			System.out.println(impShow);
		}
		return impShow;
	}
	
	public void checkValidShows() throws SQLException
	{
		PreparedStatement st;
		st = (PreparedStatement) con.prepareStatement("update movies set is_active='n' where curdate()>broadcast_date");
		st.executeUpdate();
		st = (PreparedStatement) con.prepareStatement("update shows set is_active='n' where curdate()>broadcast_date");
		st.executeUpdate();
		st = (PreparedStatement) con.prepareStatement("update sports set is_active='n' where curdate()>broadcast_date");
		st.executeUpdate();
		st = (PreparedStatement) con.prepareStatement("update timing set is_active='n' where curdate()>broadcast_date");
		st.executeUpdate();
	}
	
	public LinkedHashMap<String, String> getHomeDetail(String category) throws SQLException
	{
		checkValidShows();
		int i=0;
		LinkedHashMap<String, String> hm = new LinkedHashMap<String, String>();
		ArrayList<String> list = new ArrayList<String>();
		PreparedStatement st;
		if("movies".equals(category))
		{
			st = (PreparedStatement) con.prepareStatement(" select m.name, m.broadcast_date, t.from_time, t.to_time, m.pk_movie_id, m.is_imp, t.pk_timing_id from movies m inner join timing t on m.fk_timing_id=t. pk_timing_id where m.is_active='y' ");
		}
		else if("shows".equals(category))
		{
			st = (PreparedStatement) con.prepareStatement("select s.name, s.broadcast_date, t.from_time, t.to_time, s.pk_show_id, s.is_imp, t.pk_timing_id from shows s inner join timing t on s.fk_timing_id=t. pk_timing_id where s.is_active='y'");
		}
		else
		{
			st = (PreparedStatement) con.prepareStatement("select s.name, s.broadcast_date, t.from_time, t.to_time, s.pk_sport_id, s.is_imp, t.pk_timing_id from sports s inner join timing t on s.fk_timing_id=t. pk_timing_id where s.is_active='y'");
		}
		ResultSet rs = st.executeQuery();
		while(rs.next())
		{
			hm.put(String.valueOf(++i), rs.getString(1)+"@!"+rs.getString(2)+"@!"+rs.getString(3)+"@!"+rs.getString(4)+"@!"+rs.getString(5)+"@!"+rs.getString(6)+"@!"+rs.getString(7));
		}
		DatabaseConnection.closeConnection(con);
		return hm;
	}
	
	public boolean ajaxCheckEmail(String email) throws SQLException
	{
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select * from user where email=?");
		st.setString(1, email);
		ResultSet rs = st.executeQuery();
		while (rs.next())
		{
			System.out.println(rs.getString(1)+rs.getString(2));
		    return true;
		}
		DatabaseConnection.closeConnection(con);
		return false;
	}
	
	public int registerInsert(String name, String email, String passwd, String is_admin) throws SQLException
	{
		PreparedStatement st = (PreparedStatement) con.prepareStatement("insert into user(name, email, passwd, is_admin, created_by, created_date, is_active) values(?, ?, ?, ?,?,curdate(),'y')");
		st.setString(1, name);
		st.setString(2, email);
		st.setString(3, passwd);
		st.setString(4, is_admin);
		st.setString(5, name);
		int result = st.executeUpdate();
		DatabaseConnection.closeConnection(con);
		return result;
	}
	
	public ArrayList getPollInfo() throws SQLException
	{
		ArrayList poll = new ArrayList();
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select question, option1, option2, option3, option4, fk_score_id from movie_poll;");
		ResultSet rs = st.executeQuery();
		while (rs.next())
		{
			poll.add(rs.getString(1));
			poll.add(rs.getString(2));
			poll.add(rs.getString(3));
			poll.add(rs.getString(4));
			poll.add(rs.getString(5));
			poll.add(rs.getString(6));
		    return poll;
		}
		return null;
	}
	
	public boolean castVote(HttpServletRequest request) throws SQLException
	{
		System.out.println("in casttttttttttttttttttttttttttttttttttttttt");
		PreparedStatement st = (PreparedStatement) con.prepareStatement("select * from score where pk_score_id=? and email like '%"+request.getParameter("email")+"%'");
		st.setString(1, request.getParameter("id"));
		ResultSet rs = st.executeQuery();
		System.out.println("in casttttttttttttttttttttttttttttttttttttttt");
		while (rs.next())
		{
			return false;
		}
		String email =  request.getParameter("email");
		String option =  request.getParameter("option");
		String id = request.getParameter("id");
		System.out.println("helloooo"+email+option+id);
		System.out.println("update score set email=concat(email, '"+email+"'), "+option+"="+option+"+1 where pk_score_id="+id);
		st = (PreparedStatement) con.prepareStatement("update score set email=concat(email, '"+email+"'), "+option+"="+option+"+1 where pk_score_id="+id);
		st.executeUpdate();
		return true;
	}
	
	public HashMap getResult(HttpServletRequest request) throws SQLException
	{
		HashMap hashMap = new HashMap();
		System.out.println("in casttttttttttttttttttttttttttttttttttttttt");
		PreparedStatement st = (PreparedStatement) con.prepareStatement(" select m.option1, s.option1, m.option2, s.option2, m.option3, s.option3, m.option4, s.option4, (s.option1+s.option2+s.option3+s.option4) as count from score as s join movie_poll as m on s.pk_score_id=m.fk_score_id where m.poll_date=curdate();");
		ResultSet rs = st.executeQuery();
		System.out.println("in casttttttttttttttttttttttttttttttttttttttt");
		while (rs.next())
		{
			System.out.println("in casttttttttttttttttttttttttttttttttttttttt");
			hashMap.put(rs.getString(1), rs.getString(2));
			hashMap.put(rs.getString(3), rs.getString(4));
			hashMap.put(rs.getString(5), rs.getString(6));
			hashMap.put(rs.getString(7), rs.getString(8));
			hashMap.put("count", rs.getString(9));
		}
		return hashMap;
	}
}













