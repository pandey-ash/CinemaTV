var select_obj = new selectClass();
select_obj.addData()

function selectClass(){
	this.addState = addState;
	this.addCity = addCity;
	this.addData = addData;
}

function addData(){
	select_obj.addState();
	select_obj.addCity();
}

function addCity(){
	var cityList = ["California,", "Alabama,", "Arkansas,", "Arizona,", "Alaska,", "Colorado,", "Connecticut,", "Delaware,", "Florida,", "Georgia,", "Hawaii,", "Idaho,", "Illinois,", "Indiana,", "Iowa,", "Kansas,", "Kentucky,", "Louisiana,", "Maine,", "Maryland,", "Massachusetts,", "Michigan,", "Minnesota,", "Mississippi,", "Missouri,", "Montana,", "Nebraska,", "Nevada,", "New Hampshire,", "New Jersey,", "New Mexico,", "New York,", "North Carolina,", "North Dakota,", "Ohio,", "Oklahoma,", "Oregon,", "Pennsylvania,", "Rhode Island,", "South Carolina,", "South Dakota,", "Tennessee,", "Texas,", "Utah,", "Vermont,", "Virginia,", "Washington,", "West Virginia,", "Wisconsin,", "Wyoming"];
	for(var i=0; i<cityList.length; i++){
		option = "<option value='" + cityList[i] + "'>" + cityList[i] + "</option>"
		$("#city").append(option);
	}
}

function addState(){
	var stateList =  ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chandigarh",
	"Chhattisgarh",
	"Dadra and Nagar Haveli",
	"Daman and Diu",
	"Delhi",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jammu and Kashmir",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Lakshadweep",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Orissa",
	"Pondicherry",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttaranchal",
	"Uttar Pradesh",
	"West Bengal"];
	for(var i=0; i<stateList.length; i++){
		option = "<option value=" + stateList[i] + ">" + stateList[i] + "</option>"
		$("#state").append(option);
	}
	return;
}