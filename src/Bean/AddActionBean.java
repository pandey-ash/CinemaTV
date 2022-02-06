package Bean;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import Helper.Helper;

public class AddActionBean
{
	
	public void insertData(HttpServletRequest request) throws Exception
	{
		AddInputBean inputbean = new AddInputBean();
		inputbean.setSub_category(request.getParameter("sub_category").trim());
		inputbean.setCategory(request.getParameter("category").trim());
		inputbean.setBroadcast_date(request.getParameter("Broadcast Date").trim());
		String name = request.getParameter("movie Name").trim().replaceAll(" +", " ").replace(" ", "%20");
		inputbean.setName("/images/"+request.getParameter("category")+"/"+name+".jpg");
		inputbean.setStart_time(request.getParameter("movie Start Time").trim());
		inputbean.setEnd_time(request.getParameter("movie End Time").trim());
		inputbean.setIs_imp(request.getParameter("is_imp").trim());
		new Helper().insertDataHelper(inputbean);
	}
}
