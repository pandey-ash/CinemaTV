package Bean;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Bean.OutputBean;
import Bean.RegisterInputBean;
import Helper.Helper;

public class ActionBean
{
	public OutputBean performRegistrationAction(HttpServletRequest request, HttpServletResponse response) throws SQLException
	{
		RegisterInputBean rib = new RegisterInputBean();
		rib.setFirst_name(request.getParameter("first_name"));
		rib.setLast_name(request.getParameter("last_name"));
		rib.setEmail(request.getParameter("email"));
		rib.setPasswd(request.getParameter("password"));
		rib.setIs_admin(request.getParameter("is_admin"));
		return new Helper().doRegistration(rib);
	}
	
	public LinkedHashMap getAdminData(String category) throws SQLException
	{
		LinkedHashMap admindata = new LinkedHashMap();
		HomePageInputBean inputbean = new HomePageInputBean();
		inputbean.setCategory(category);
		OutputBean ob = new Helper().getHomePageData(inputbean);
		admindata = ob.getMap();
		return admindata;
	}
	
	public LinkedHashMap displayUserChoice(HttpServletRequest request) throws SQLException
	{
		UserChoiceBean inputbean = new UserChoiceBean();
		inputbean.setCategory(request.getParameter("category"));
		inputbean.setSub_category(request.getParameter("sub-category"));
		return new Helper().getSubCategory(inputbean);
	}
}
