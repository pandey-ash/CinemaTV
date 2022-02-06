package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.LinkedHashMap;

import javax.jms.Session;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import Bean.ActionBean;
import Bean.AddActionBean;
import Bean.EditActionBean;
import Bean.OutputBean;
import CommonDoa.CommonDoa;

public class Controller extends HttpServlet
{

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		PrintWriter out = response.getWriter();
		String action = request.getParameter("action");
		try{
			if("add".equals(request.getParameter("action")))
			{
				new AddActionBean().insertData(request);
				response.sendRedirect(request.getContextPath()+"/jsp/success.jsp?msg=Detail added successfully");
			}
			else if("register".equals(action))
			{
				OutputBean ob = new ActionBean().performRegistrationAction(request, response);
				if(ob.getFlag())
				{
					response.sendRedirect(request.getContextPath()+"?msg=Registered successfully");
				}
			}
			else if("edit".equals(request.getParameter("action")))
			{
				new EditActionBean().editData(request);
				response.sendRedirect(request.getContextPath()+"/jsp/success.jsp?msg=Detail edited successfully");
			}
			else if("delete".equals(request.getParameter("action")))
			{
				new CommonDoa().deleteoperation(request);
				response.sendRedirect(request.getContextPath()+"/jsp/admin.jsp");
			}
		}catch(Exception e)
		{
			response.sendRedirect(request.getContextPath()+"/jsp/error.jsp?exception="+e.getMessage());
		}
	}

}
