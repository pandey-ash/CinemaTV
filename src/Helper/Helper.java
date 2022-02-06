package Helper;


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
import Impl.Implementation;

public class Helper
{
	public OutputBean getCategoryDetail(SportAjaxInputBean inputbean) throws SQLException
	{
		return new Implementation().categoryAjaxResponse(inputbean);
	}
	
	public OutputBean getHomePageData(HomePageInputBean inputbean) throws SQLException
	{
		return new Implementation().getHomePageDetail(inputbean);
	}
	
	public OutputBean getAllImpShow() throws SQLException
	{
		return new Implementation().getImpShows();
	}
	
	public OutputBean getLoginStatus(LoginInputBean inputbean) throws SQLException
	{
		return new CommonDoa().validateLogin(inputbean);
	}
	
	public void insertDataHelper(AddInputBean inputbean) throws Exception
	{
		new Implementation().implInsertOperation(inputbean);
	}
	
	public void editDataHelper(AddInputBean inputbean) throws Exception
	{
		new Implementation().implEditOperation(inputbean);
	}
	
	public LinkedHashMap getSubCategory(UserChoiceBean inputbean) throws SQLException
	{
		return new Implementation().impSubCategory(inputbean);
	}
	
	public OutputBean doRegistration(RegisterInputBean rib) throws SQLException
	{
		return new Implementation().implRegistration(rib);
	}
	
	public OutputBean checkAjaxEmail(AjaxInputBean inputbean) throws SQLException
	{
		return new Implementation().implCheckAjaxEmail(inputbean);
	}
}














