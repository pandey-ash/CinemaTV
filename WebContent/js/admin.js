var field = new validateField();
function validateField(){
	this.doShowValidation = doShowValidation;
	this.validateBroadcastDate = validateBroadcastDate;
	this.removeErrorMsg = removeErrorMsg;
	this.displayErrorMsg = displayErrorMsg;
	this.checkForEmptyField = checkForEmptyField;
	this.validateTime = validateTime;
}

function doShowValidation(){
	if(!(field.checkForEmptyField("input[name='movie Name']") )){
		return false;
	}
	else if(!(field.checkForEmptyField("input[name='Broadcast Date']"))){
		return false;
	}
	else if(!(field.checkForEmptyField("input[name='movie Start Time']")))
	{
		return false;
	}
	else if((!(field.checkForEmptyField("input[name='movie End Time']"))))
	{
		return false;
	}
	else if(!(field.validateTime("input[name='movie Start Time']", "input[name='movie End Time']")))
	{
		return false;
	}
	
	return true;
}

function validateTime(startObj, endObj)
{
	var start = document.getElementsByName("movie Start Time")[0].value;
	var end = document.getElementsByName("movie End Time")[0].value;
	if(!(/^[0-9]*$/.test(start)))
	{
		field.displayErrorMsg(startObj, "Please enter valid Start time");
		return false
	}
	else if(!(/^[0-9]*$/.test(end)))
	{
		field.displayErrorMsg(endObj, "Please enter valid End time");
		return false
	}
	else if(parseInt(start)>24)
	{
		field.displayErrorMsg(startObj, "The time must be in 24 hour format");
		return false
	}
	else if(parseInt(end)>24)
	{
		field.displayErrorMsg(endObj, "The time must be in 24 hour format");
		return false
	}
	else if(parseInt(end) <= parseInt(start))
	{
		field.displayErrorMsg(endObj, "The Start time cannot be greater or equal to end time");
		return false
	}
	return true;
}

function validateBroadcastDate(dob_obj){
	//var dob = dob_obj.value;
	dob = document.getElementsByName("Broadcast Date")[0].value
	var dob_re = /^(0[1-9]|[1-2]\d|3[0-1]|\d)[\/](0[1-9]|[1-9]|1[0-2])[\/]((19|20)\d\d)$/;
	if(!dob_re.test(dob)){
		validate.displayErrorMsg(dob_obj, dob_error_obj, "Please enter valid date of birth )");
		return false
	}
	return true;
}


function checkForEmptyField(input_field){
	if($(input_field).val() === "") {
		field.displayErrorMsg(input_field, "Required")
		return false;
	}
return true;
}

function removeErrorMsg(obj){
	$("input[name='"+obj+"']").css("border", "")
	$("input[name='"+obj+"']").next().html("");
	
}

function displayErrorMsg(input_obj, error_msg){
	$(input_obj).css("border", "3px solid red");
	$(input_obj).next().text(error_msg);
	$(input_obj).next().css("color", "red");
	return false;
}

$(document).ready(function(){
	$(".reset").click(clear);
	$("#login-link").click(displayLogin);
	$("#register-link").click(displayRegister);
	$("#pop-background, #cancel-img").click(close);
	function clear(){
		$(".error, .reset-field,textarea").removeAttr("style").html("");
		
		$("#radio_div, #hobby_div").removeAttr("style");
		$("select").removeAttr("style");
	}

	function displayLogin(){
		$("#pop-background, #login").slideDown(1000);
		return false;
	}

	function displayRegister(){
		$("#pop-background, #register").slideDown(1000);
		return false;
	}

	function close(){
		$("#loginSuccess").html("");
		$(".error, .reset-field,textarea").removeAttr("style").html("").val("");
		$("#radio_div, #hobby_div").removeAttr("style");
		$(".uncheck").prop("checked", false);
		$("select").val("no-select");
		$("select").removeAttr("style");
		$("#pop-background, #register").slideUp();
		$("#pop-background, #register, #login").slideUp();
	}
	
	
	
});































function addSubCategory()
{
	var category = $("#category").val();
	$("#sub_category").empty();
	var movies_category = ["Drama", "Action", "Comedy", "Romance", "Horror"];
	var sport_category = ["Football", "Cricket", "Tennis", "Basketball"];
	var show_category =new Array(5);
	for(var i=0;i<movies_category.length; i++)
	{
		show_category[i] = movies_category[i] + " Shows";
	}
	if("Movies" == category)
	{
		for(var i=0;i<movies_category.length; i++)
		{
			$("#sub_category").append("<option value="+movies_category[i]+">"+movies_category[i]+"</option>");
		}
	}
	if("Shows" == category)
	{
		for(var i=0;i<movies_category.length; i++)
		{
			$("#sub_category").append("<option value="+show_category[i]+">"+show_category[i]+"</option>");
		}
	}
	if("Sports" == category)
	{
		for(var i=0;i<movies_category.length; i++)
		{
			$("#sub_category").append("<option value="+sport_category[i]+">"+sport_category[i]+"</option>");
		}
	}
}