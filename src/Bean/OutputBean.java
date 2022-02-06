package Bean;

import java.util.ArrayList;
import java.util.LinkedHashMap;

public class OutputBean
{
	private boolean flag; 
	private String msg;
	private LinkedHashMap map;
	private LinkedHashMap<String, String> login;
	
	public LinkedHashMap<String, String> getLogin() {
		return login;
	}
	public void setLogin(LinkedHashMap<String, String> login) {
		this.login = login;
	}
	private ArrayList<String> arrayList;
	
	public ArrayList<String> getArrayList() {
		return arrayList;
	}
	public void setArrayList(ArrayList<String> arrayList) {
		this.arrayList = arrayList;
	}
	public LinkedHashMap getMap() {
		return map;
	}
	public void setMap(LinkedHashMap linkedHashMap) {
		this.map = linkedHashMap;
	}
	public boolean getFlag() {
		return flag;
	}
	public void setFlag(boolean flag) {
		this.flag = flag;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
}
