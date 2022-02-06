package Impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;

import Bean.RegisterInputBean;
import Bean.AjaxInputBean;
import Bean.AddInputBean;
import Bean.HomePageInputBean;
import Bean.LoginInputBean;
import Bean.OutputBean;
import Bean.SportAjaxInputBean;
import Bean.UserChoiceBean;
import CommonDoa.CommonDoa;

public class Implementation
{
	public OutputBean categoryAjaxResponse(SportAjaxInputBean inputbean) throws SQLException
	{
		String category = inputbean.getCategory();
		OutputBean ob = new OutputBean();
		ob.setMap(new CommonDoa().getCategory(category));
		return ob;
	}
	
	public OutputBean getHomePageDetail(HomePageInputBean inputbean) throws SQLException
	{
		OutputBean ob = new OutputBean();
		ob.setMap(new CommonDoa().getHomeDetail(inputbean.getCategory()));
		return ob;
	}
	
	public OutputBean getImpShows() throws SQLException
	{
		OutputBean ob = new OutputBean();
		ob.setArrayList(new CommonDoa().getImpShowDetails());
		return ob;
	}
	
	public void checkForEmptyField(AddInputBean inputbean) throws Exception
	{
		if(!(inputbean.getName() != null && !inputbean.getName().isEmpty()))
		{
			throw new Exception("Name field cannot be empty");
		}
		else if(!(inputbean.getBroadcast_date() != null && !inputbean.getBroadcast_date().isEmpty()))
		{
			throw new Exception("Broadcast date field cannot be empty");
		}
		else if(!(inputbean.getStart_time() != null && !inputbean.getStart_time().isEmpty()))
		{
			throw new Exception("Start time cannot be empty");
		}
		else if(!(inputbean.getEnd_time() != null && !inputbean.getEnd_time().isEmpty()))
		{
			throw new Exception("End time cannot be empty");
		}
	}
	
	public void implInsertOperation(AddInputBean inputbean) throws Exception
	{
		checkForEmptyField(inputbean);
		new CommonDoa().performInsertOperation(inputbean);
	}
	
	public void implEditOperation(AddInputBean inputbean) throws Exception
	{
		checkForEmptyField(inputbean);
		new CommonDoa().performEditOperation(inputbean);
	}
	
	public LinkedHashMap impSubCategory(UserChoiceBean inputbean) throws SQLException
	{
		return new CommonDoa().postSubcategory(inputbean.getCategory(), inputbean.getSub_category());
	}
	
	public OutputBean implCheckAjaxEmail(AjaxInputBean inputbean) throws SQLException
	{
		String email = inputbean.getEmail();
		OutputBean ob = new OutputBean();
		if(new CommonDoa().ajaxCheckEmail(email))
		{
			ob.setFlag(true);
		    return ob;
		}
		ob.setFlag(false);
		return ob;
	}
	
	public OutputBean implRegistration(RegisterInputBean rib) throws SQLException
	{
		String first_name = rib.getFirst_name().trim();
		String last_name = rib.getLast_name().trim();
		String name = first_name + " "+last_name;
		
		String email = rib.getEmail();
		String passwd = rib.getPasswd();
		String is_admin = rib.getIs_admin();
		int result = new CommonDoa().registerInsert(name, email, passwd, is_admin);
		OutputBean ob = new OutputBean();
		if(result == 1)
		{
			ob.setFlag(true);
			ob.setMsg("Registration done successful");
			return ob;
		}
		ob.setFlag(false);
		return ob;
	}
}









