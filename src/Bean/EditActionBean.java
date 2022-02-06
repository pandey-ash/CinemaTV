package Bean;

import javax.servlet.http.HttpServletRequest;

import Helper.Helper;

public class EditActionBean
{
	public void editData(HttpServletRequest request) throws Exception
	{
		AddInputBean inputbean = new AddInputBean();
		inputbean.setId(request.getParameter("id"));
		inputbean.setTiming_id("timing_id");
		inputbean.setSub_category(request.getParameter("sub_category"));
		inputbean.setCategory(request.getParameter("category"));
		inputbean.setBroadcast_date(request.getParameter("Broadcast Date"));
		inputbean.setName("/images/"+request.getParameter("category")+"/"+request.getParameter("movie Name")+".jpg");
		inputbean.setStart_time(request.getParameter("movie Start Time"));
		inputbean.setEnd_time(request.getParameter("movie End Time"));
		inputbean.setIs_imp(request.getParameter("is_imp"));
		new Helper().editDataHelper(inputbean);
	}
}
