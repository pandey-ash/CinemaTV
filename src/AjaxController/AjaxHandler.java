package AjaxController;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;

import Bean.HomePageInputBean;
import Bean.LoginInputBean;
import Bean.OutputBean;
import Bean.SportAjaxInputBean;
import Helper.Helper;
import Bean.AjaxInputBean;
import CommonDoa.CommonDoa;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class AjaxHandler
{
	public String toJSON(Object jsonObject)
	{
		Gson gson= new GsonBuilder().create();
		return gson.toJson(jsonObject);
	}
	
	public String getSportCategory(String category)
	{
		try
		{
			SportAjaxInputBean inputbean = new SportAjaxInputBean();
			inputbean.setCategory(category);
			OutputBean ob = new Helper().getCategoryDetail(inputbean);
			return toJSON(ob.getMap());
		}catch(Exception e)
		{
			System.out.println(e.getMessage());
			return "";
		}
	}
	
	public String getHomePageSuggestion(String category)
	{
		try{
		HomePageInputBean inputbean = new HomePageInputBean();
		inputbean.setCategory(category);
		OutputBean ob = new Helper().getHomePageData(inputbean);
		return toJSON(ob.getMap());
		}catch(Exception e)
		{
			System.out.println(e.getMessage());
			return "";
		}
	}
	
	public String getImpShowDetail(String action)
	{
		try
		{
			OutputBean ob = new Helper().getAllImpShow();
			return toJSON(ob.getArrayList());
		}catch(Exception e)
		{
			System.out.println(e.getMessage());
			return "";
		}
	}
	
	public OutputBean getLoginInfo(String email, String passwd)
	{
		try
		{
			LoginInputBean inputbean = new LoginInputBean();
			inputbean.setEmail(email);
			inputbean.setPasswd(passwd);
			Helper help = new Helper();
			return help.getLoginStatus(inputbean);
		}catch(Exception e)
		{
			System.out.println("exception occurrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"+ e.getMessage());
			return null;
		}
	}
	
	public String checkForValidEmail(String email)
	{
		try
		{
			AjaxInputBean inputbean = new AjaxInputBean();
			inputbean.setEmail(email);
			Helper help = new Helper();
			OutputBean ob = new Helper().checkAjaxEmail(inputbean);
			return toJSON(ob);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public String getPollDetail()
	{
		try{
		ArrayList poll = new CommonDoa().getPollInfo();
		return toJSON(poll);
		}catch(Exception e)
		{
			System.out.println("erorrrrrrrrrrrrrrrrrr"+ e.getMessage());
			return null;
		}
	}
	
	public String doVoting(HttpServletRequest request)
	{
		try{
			boolean poll = new CommonDoa().castVote(request);
			return toJSON(poll);
		}catch(Exception e)
		{
			System.out.println("erorrrrrrrrrrrrrrrrrr"+ e.getMessage());
			return null;
		}
	}
	
	public String getPollResult(HttpServletRequest request)
	{
		try{
			HashMap poll = new CommonDoa().getResult(request);
			
			return toJSON(poll);
		}catch(Exception e)
		{
			System.out.println("erorrrrrrrrrrrrrrrrrr"+ e.getMessage());
			return null;
		}
	}
}









