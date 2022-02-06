window.onload = displayHomePage;

var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"
                   ];

var impShows;
var parse;
var ajaxcall = new ajax();

function displayHomePage()
{
	var suggestion_category = ['movies', 'shows', 'sports'];
	ajaxcall.attachDropdown();
	ajaxcall.getImpShows();
	ajaxcall.getPollData();
	validate.disappearMsg();
	for(var i=0; i<suggestion_category.length;i++)
	{
		ajaxcall.suggestion(suggestion_category[i]);
	}
}

function ajax()
{
	this.ajaxDropdown = ajaxDropdown;
	this.showShowCategory = showShowCategory;
	this.showMovieCategory = showMovieCategory;
	this.showSportCategory = showSportCategory;
	this.attachDropdown = attachDropdown;
	this.suggestion = suggestion;
	this.generateHomePageContent = generateHomePageContent;
	this.getImpShows = getImpShows;
	this.getPollData = getPollData;
	this.addOption = addOption;
	this.doVote = doVote;
	this.showResult = showResult;
	this.showResultDiv = showResultDiv;
	this.showAgainPoll = showAgainPoll;
}

//drop down
function showShowCategory() {
    document.getElementById("shows").classList.toggle("show");
}
function showMovieCategory() {
    document.getElementById("movies").classList.toggle("show");
}
function showSportCategory() {
    document.getElementById("sports").classList.toggle("show");
}

function attachDropdown()
{
	ajaxcall.ajaxDropdown("Shows", "#shows");
	ajaxcall.ajaxDropdown("Movies", "#movies")
	ajaxcall.ajaxDropdown("Sports", "#sports")
}

// Close the dropdown if the user clicks outside of it
window.onmouseout = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  } 
}

function getImpShows()
{
	var path = $("#contextPath").val();
	$.post(path+"/jsp/ajax.jsp", 
			{
				"action": "getImpShows"
			}, 
			function(data){
				var data = data.substring(0, data.indexOf(']')+1);
				parse = $.parseJSON(data);
				slideObj.startSlider(parse);
			});
}

function getPollData()
{
	var path = $("#contextPath").val();
	$.post(path+"/jsp/ajax.jsp", 
			{
				"action": "poll"
			}, 
			function(data){
				var data = data.substring(0, data.indexOf(']')+1);
				parse = $.parseJSON(data);
				ajaxcall.addOption(parse);
			});
}

function showResult()
{
	var email = $("#vote").val();
	var score_id = $("input[type='radio']").attr("id");
	var option = $('input[name="pollOption"]:checked').val();
	var path = $("#contextPath").val();
	$.post(path+"/jsp/ajax.jsp", 
			{
				"action": "poll_result",
				"email": email,
				"id": score_id,
				"option": option
			}, 
			function(data){
				var data = data.substring(0, data.indexOf('}')+1);
				parse = $.parseJSON(data);
				alert(parse);
				var count = parse.count;
				delete parse.count;
				alert(parse);
				ajaxcall.showResultDiv(parse, count);
			});
}

function showResultDiv(parse, count)
{
	$("label").hide();
	$(".vote-button").hide();
	$(".result").hide();
	$("br").hide();
	$('input[name="pollOption"]').hide();
	alert($(".result-back").css("display"));
	$.each(parse, function(key, value) {
		$(".poll").append("<label class='final-result'>"+key+"  "+Math.round(((value/count)*100))+" %"+"</label>");
	});
	$(".poll").after('<button class="vote-button result-back" onclick="ajaxcall.showAgainPoll()">Back</button>');
}

function showAgainPoll()
{
	$(".final-result").remove()
	$(".result-back").remove()
	$(".option").show();
	$(".vote-button").show();
	$(".result").show();
	$('input[name="pollOption"]').show();
	$("br").show();
	
}

function doVote()
{
	var email = $("#vote").val();
	var score_id = $("input[type='radio']").attr("id");
	var option = $('input[name="pollOption"]:checked').val();
	var path = $("#contextPath").val();
	$.post(path+"/jsp/ajax.jsp", 
			{
				"action": "vote",
				"email": email,
				"id": score_id,
				"option": option
			}, 
			function(data){
				var data = data.substring(0, data.indexOf('<'));
				parse = $.parseJSON(data);
				if(parse == true)
				{
					$("#error").removeClass("vote-error");
					$("#error").addClass("vote-success").html("Your response had been recorded");
					return true;
				}
				$("#error").removeClass("vote-error")
				$("#error").addClass("display-error").html("Your Already voted");

			});
}

function addOption(option)
{
	for(var i=0; i<option.length; i++)
	{
		if(i== (option.length -1))
		{
			break;
		}
		if(i==0)
		{
			$(".poll").append("<h2 class='poll-heading'>POLLS</h2>");
			$(".poll").append("<p style='margin-bottom: 15px;font-size: 24px;'>"+option[i]+"</p>");
			continue;
		}
		$(".poll").append("<input type='radio' name='pollOption' value=option"+i+" id="+option[option.length-1]+"><label class='option'>"+option[i]+"</label><br/>");
	}
	$(".poll").append()
}

function ajaxDropdown(category, categoryId)
{
	var path = $("#contextPath").val();
	$.post(path+"/jsp/ajax.jsp", 
			{
				"category": category
			}, 
			function(data){
				var data = data.substring(0, data.indexOf('}')+1);
				parse = $.parseJSON(data);
				$.each(parse, function(key, value) {
					$(categoryId).append("<a href='/CinemaTV/jsp/categoryTemplate.jsp?category="+value+"&sub-category="+key+"'"+ "class='anchor-dropdown' id="+key+" category="+value+">"+key+"</a>");
				});
			});
}



//##################for home page dynamic suggestion############################

function suggestion(category)
{
	var i = 0;
	var path = $("#contextPath").val();
	var img_array = new Array(7);
	var show_day = new Array(7)
	var from_time = new Array(7);
	var to_time = new Array(7);
	$.post(path+"/jsp/ajax.jsp", 
			{
				"suggestion": category
			}, 
			function(data){
				var data = data.substring(0, data.indexOf('}')+1);
				parse = $.parseJSON(data);
				var length = Object.keys(parse).length;
				$.each(parse, function(key, value) {
					var show_detail = value.split("@!");
					img_array[i] = show_detail[0];
					show_day[i] = show_detail[1];
					from_time[i] = show_detail[2];
					to_time[i] = show_detail[3];
					if(parseInt(key)==length)
					{
						ajaxcall.generateHomePageContent(category, img_array, show_day, from_time, to_time)
					}
					++i;
				});
			});
	
	//ajaxcall.generateHomePageContent(category, img_array, show_day, from_time, to_time)
}

function generateHomePageContent(showcategory, img_array,  show_day, from_time, to_time)
{
	for(var i=0; i<img_array.length; i++)
	{
		if(img_array[i] == undefined)
		{
			break;
		}
		if(img_array[i].indexOf(" ")>-1)
		{
			img_array[i] = img_array[i].split(' ').join('%20');
		}
	}
	$(".banner").after("<div class='suggestion-div'></div>");
	$('.suggestion-div').append("<div id='suggestion-content'>");
	$("#suggestion-content").append('<h2><b class="category">'+showcategory.toUpperCase()+'</b></h2>');
	for(var i=0; i<=img_array.length; i++)
	{
		if(img_array[i] == undefined)
		{
			show_day[i] = ""; 
			from_time[i] = "";
			to_time[i] = "";
		}
		else
		{
			if(from_time[i]>12)
			{
				temp = show_day[i].split("-");
				show_day[i] = temp[2]+" "+MONTH_NAMES[parseInt(temp[1])-1]+" "+temp[0];
				from_time[i] = (from_time[i]-12)+" PM";
				to_time[i] = (to_time[i]-12)+ " PM";
			}
			else if(to_time[i]>12)
			{
				temp = show_day[i].split("-");
				show_day[i] = temp[2]+" "+MONTH_NAMES[parseInt(temp[1]-1)]+" "+temp[0];
				from_time[i] = from_time[i]+" AM";
				to_time[i] = (to_time[i]-12)+ " PM";
			}
			else
			{
				temp = show_day[i].split("-");
				show_day[i] = temp[2]+" "+MONTH_NAMES[parseInt(temp[1]-1)]+" "+temp[0];
				from_time[i] = from_time[i]+" AM";
				to_time[i] = to_time[i]+" AM";
			}
		}
		
		if(img_array[i] == undefined)
		{
			$("#suggestion-content").append('<div class="second-row" style="background: url(/CinemaTV'+img_array[i]+');background-size: 100% 100%;"><p class="small-day">'+show_day[i]+'</p><p class="small-time">'+from_time[i]+'-'+to_time[i]+'</p></div>');
		}
		else if(i == 0)
		{
			$("#suggestion-content").append('<div class="larger-div" style="background: url(/CinemaTV'+img_array[i]+');background-size: 100% 100%;"><p class="larger-day">'+show_day[i]+'</p><p class="larger-time">'+from_time[i]+'-'+to_time[i]+'</p></div>');
		}
		else if(i == img_array.length)
		{
			$("#suggestion-content").append('<div class="clr"></div>');
		}
		else if(i>3)
		{
			$("#suggestion-content").append('<div class="smaller-div second-row" style="background: url(/CinemaTV'+img_array[i]+');background-size: 100% 100%;"><p class="small-day">'+show_day[i]+'</p><p class="small-time">'+from_time[i]+'-'+to_time[i]+'</p></div>');
		}
		else
		{
			$("#suggestion-content").append('<div class="smaller-div" style="background: url(/CinemaTV'+img_array[i]+');background-size: 100% 100%;"><p class="small-day">'+show_day[i]+'</p><p class="small-time">'+from_time[i]+'-'+to_time[i]+'</p></div>');
		}
	}
	//checkBackground();
}

//Image slider 

var slideObj = new slideImage();
var interval;

function slideImage()
{
	this.startSlider = startSlider;
	this.stopSlider = stopSlider;
	this.doSlideShow = doSlideShow;
	this.initializeSlideShow = initializeSlideShow;
}

function startSlider(impShows)
{
	for(var i=0; i<impShows.length; i++)
	{
		if(impShows[i].indexOf(" ")>-1)
		{
			impShows[i] = impShows[i].split(' ').join('%20');
		}
	}
	slideObj.initializeSlideShow(impShows);
	var interval = setInterval(slideObj.doSlideShow, 2000, impShows);
}

function initializeSlideShow(impShows)
{
	if(impShows)
	{
		$(".main-content").css('background', "url(/CinemaTV"+impShows[0]+") no-repeat");
		$(".main-content").css('background-size', '100% 100%');
	}
	else
	{
		$(".main-content").css('background', "url(/CinemaTV/images/nospecial.jpg no-repeat");
		$(".main-content").css('background-size', '100% 100%');
	}
}

function stopSlider()
{
	clearInterval(interval);
}

function doSlideShow(impShows)
{
	if(!( $('.main-content').length ))
	{
		return;
	}
	var bg = $(".main-content").css('background');
	for(var i=0; i<impShows.length; i++)
	{
		if(bg.indexOf(impShows[i]) > -1 && (i+1)>=impShows.length)
		{
			$(".main-content").css('background', "url(/CinemaTV"+impShows[0]+") no-repeat");
			$(".main-content").css('background-size', '100% 100%');
		}
		else if(bg.indexOf(impShows[i]) > -1)
		{
			$(".main-content").css('background', "url(/CinemaTV"+impShows[i+1]+") no-repeat");
			$(".main-content").css('background-size', '100% 100%');
		}
	}
}

//Image slider end here













var validate = new validation();

function validation(){
	this.doValidation = doValidation;
	this.removeErrorMsg = removeErrorMsg;
	this.checkForEmptyField = checkForEmptyField;
	this.displayErrorMsg = displayErrorMsg;
	this.validateName = validateName;
	this.validateMblNo = validateMblNo;
	this.validateDob = validateDob;
	this.validateEmailId = validateEmailId;
	this.validatePassword = validatePassword;
	this.validateConfirmPassword = validateConfirmPassword;
	this.validateSelect = validateSelect;
	this.validateGender = validateGender;
	this.validateHobbies = validateHobbies;
	this.validatePincode = validatePincode;
	this.validateAddress = validateAddress;
	this.getUserChoice = getUserChoice;
	this.dynamicFieldCheck = dynamicFieldCheck;
	this.displaySuccessMsg  = displaySuccessMsg;
	this.displayRgisterMsg = displayRgisterMsg;
	this.checkEmail = checkEmail;
	this.disappearMsg = disappearMsg;
}

function disappearMsg()
{
setTimeout(function(){$('#short-time').fadeOut();}, 3000);
}

function doValidation(){

	if(!(validate.checkForEmptyField("#first_name", "#first_name_error") && validate.validateName("#first_name", "#first_name_error"))){
		return false
	}
	else if(!(validate.checkForEmptyField("#last_name", "#last_name_error") && validate.validateName("#last_name", "#last_name_error"))){
		return false;
	}
	else if(!(validate.checkForEmptyField("#email_id", "#email_id_error") && validate.validateEmailId("#email_id", "#email_id_error"))){
		return false;
	}
	else if(!(validate.checkForEmptyField("#password", "#password_error") && validate.validatePassword("#password", "#password_error"))){
		return false;
	}
	else if(!(validate.checkForEmptyField("#confirm_pass", "#confirm_pass_error") && validate.validateConfirmPassword("#confirm_pass", "#confirm_pass_error", $("#password").val()))){
		return false;
	}
	else if(!validate.checkEmail('#email_id', '#email_id_error'))
	{
		return false;
	}
	else if(validate.displayRgisterMsg())
	{
		return true;
	}
	return false;
}

function dynamicFieldCheck(inputObj, errorObj, functionName){
	if(!validate.checkForEmptyField(inputObj, errorObj)){
		return false;
	}
	else if($(inputObj).attr("id") == "confirm_pass"){
		if(!validate[functionName](inputObj, errorObj, $("#password").val())){
			return false
		}
	}
	else if(!validate[functionName](inputObj, errorObj)){
		return false;
	}
	validate.removeErrorMsg(inputObj, errorObj)
}

function validateName(fname_obj, fname_error_obj){
	//var name = fname_obj.value;
	var name_re = /^[a-zA-Z]{2,10}$/;
	if (!name_re.test($(fname_obj).val())){
		validate.displayErrorMsg(fname_obj, fname_error_obj, "Name should be alphabetic and should of minimum 2 character");
		return false;
	}
	return true;
}

function validateMblNo(mbl_no_obj, mbl_no_error_obj){
	//var mbl_no = mbl_no_obj.value;
	//var mbl_no_re = /^(\+91|0)[789]\d{9}$/;
	var mbl_no_re = /^[789]\d{9}$/;
	if(!mbl_no_re.test($(mbl_no_obj).val())){
		validate.displayErrorMsg(mbl_no_obj, mbl_no_error_obj, "Invalid Mobile No");
		return false;
	}
	return true;
}

function validateDob(dob_obj, dob_error_obj){
	//var dob = dob_obj.value;
	var dob_re = /^(0[1-9]|[1-2]\d|3[0-1]|\d)[\/](0[1-9]|[1-9]|1[0-2])[\/]((19|20)\d\d)$/;
	if(!dob_re.test($(dob_obj).val())){
		validate.displayErrorMsg(dob_obj, dob_error_obj, "Please enter valid date of birth (dd/mm/yyyy)");
		return false
	}
	return true;
}

function validateEmailId(email_id_obj, email_id_error_obj){
	//var email_id = email_id_obj.value;
	var email_id_re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(!email_id_re.test($(email_id_obj).val())){
		validate.displayErrorMsg(email_id_obj, email_id_error_obj, "Please enter valid email id");
		return false
	}
	return true;
}

function validateHobbies(hobby_obj, hobby_error_obj){
	hobby = $("input[name=hobby]:checked").val();
	if(typeof hobby === "string"){
		return true;
	}
	validate.displayErrorMsg("#hobby_div", hobby_error_obj, "Please select your atleast one option.");
	return false;
}

function validatePassword(pass_obj, pass_error_obj){
	var pass_re = /^[\w\W]+\W{1}[a-z]{1}[A-z]{1}\d{1}$/;
//	if (!pass_re.test($(pass_obj).val())){
//		validate.displayErrorMsg(pass_obj, pass_error_obj, "Password does not satisfy specified criteria. Try again");
//		return false;
//	}
	return true
}

function validateConfirmPassword(conf_pass_obj, conf_pass_error_obj, pass){
	if(!($(conf_pass_obj).val() === pass)){
		validate.displayErrorMsg(conf_pass_obj, conf_pass_error_obj, "Entered password and confirm password are not same");
		return false;
	}
	return true;
}

function validateGender(gender_obj, gender_error_obj){
		gender = $("input[name=gender]:checked").val();
		if(typeof gender === "string"){
			return true;
		}
	validate.displayErrorMsg("#radio_div", gender_error_obj, "Please select your gender");
	return false;
}

function validateAddress(addr_obj, addr_error_obj){
	addr = $.trim($(addr_obj).val());
	if(!(20 <= Number(addr.length) && Number(addr.length) <= 40)){
		validate.displayErrorMsg(addr_obj, addr_error_obj, "Address should consist of 20 to 40 character");
		return false;
	}
	return true;
}

function validateSelect(select_obj, select_error_obj){
//	var select_value = select_obj.value;
	var description = $(select_obj).attr("id");
	if($(select_obj).val() === "no-select"){
		validate.displayErrorMsg(select_obj, select_error_obj, "Please select your " + description);
		return false;
	}
	return true;
}

function validatePincode(pin_obj, pin_error_obj){
//	var pin = pin_obj.value;
	var pin_re = /^[0-9]{6}$/;
	if(!pin_re.test($(pin_obj).val())){
		validate.displayErrorMsg(pin_obj, pin_error_obj, "Please enter valid pincode");
		return false;
	}
	return true
}

function checkForEmptyField(input_field, div){
		if($(input_field).val() === "") {
			validate.displayErrorMsg(input_field, div, "Required")
			return false;
		}
	return true;
}

function removeErrorMsg(obj, error_div){
//	obj.style.removeProperty("border");
	$(obj).css("border", "")
//	error_div = document.getElementById(error_div);
//	error_div.innerHTML = "";
	$(error_div).html("");
	
}

function displayErrorMsg(input_obj, div_obj, error_msg){
	$(input_obj).css("border", "3px solid red");
	$(div_obj).text(error_msg);
	$(div_obj).css("color", "red");
}

function getUserChoice(choice_obj){
	var choice = ""
	for (var i=0; i<choice_obj.length; i++){
		if(choice_obj[i].checked){
			choice = choice + choice_obj[i].value + " ";
		}
	}
	return choice;
}

function displayRgisterMsg(){
	$("#registerSuccess").html("Successfully Register").css("color", "green");
	
	//document.getElementById("registration-form").reset();
	setTimeout(function() { window.location=window.location;},10000);
	
	return true;
}

function checkEmail(inputObj, divObj)
{
	var email=$(inputObj).val();

	var parse;
	var path = $("#contextPath").val();
	$.post(path+"/jsp/ajax.jsp", 
			{
				"action": "duplicate_email",
				"email": email
			}, 
			function(data){
				
				parse = $.parseJSON(data.substring(0, data.indexOf('}')+1));
				
				if(data.indexOf("true")>-1)
				{
					$(divObj).html("Email id alredy taken").css("color", "red");
					$(inputObj).css("border", "3px solid red");
					return false;
				}
				return true;
			});
}

//---------------------------login part---------------------------------------------

loginValidation = new LoginValidation();

function LoginValidation(){
	this.doLoginValidation = doLoginValidation;
	this.validateMblNo = validateMblNo;
	this.validateEmailId = validateEmailId;
	this.validateUsername = validateUsername;
	this.validatePassword = validatePassword;
	this.removeErrorMsg = removeErrorMsg;
	this.displayErrorMsg = displayErrorMsg;
	this.checkForEmptyField = checkForEmptyField;
	this.displaySuccessMsg = displaySuccessMsg;
	this.doDyanimcLoginValidation = doDyanimcLoginValidation;
	this.checkLoginCredential = checkLoginCredential;
}


function doLoginValidation(){
	if(!(loginValidation.checkForEmptyField("#username", "#login_username_error") && loginValidation.validateUsername("#username", "#login_username_error"))){
		return false;
	}
	else if(!(loginValidation.checkForEmptyField("#login-password","#login_password_error"))){
		return false;
	}
	else if(!loginValidation.checkLoginCredential())
	{
		return false;
	}
	else if(loginValidation.displaySuccessMsg())
	{
		return true;
	}
	
	return false;
}


function checkLoginCredential()
{
	var email = $("#username").val();
	var passwd = $("#login-password").val();

	var parse;
	var path = $("#contextPath").val();
	$.post(path+"/jsp/ajax.jsp", 
			{
				"action": "login",
				"email": email,
				"passwd": passwd
			}, 
			function(data){
				parse = data.substring(0, data.indexOf('<'));
				if("false" == parse)
				{
					$("#loginSuccess").html("Invalid credential! Please tr again");
					return false;
				}
				window.location.reload();
			});
}


function doDyanimcLoginValidation(inputObj, divObj, functionName){
	if(!loginValidation.checkForEmptyField(inputObj, divObj)){
		return false;
	}
	else if($(inputObj).attr("id") === "login-password"){
		return true;
	}
	else if(!loginValidation[functionName](inputObj, divObj)){
		return false;
	}
	loginValidation.removeErrorMsg(inputObj, divObj)
}

function validateUsername(usernameObj, divObj){
	emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	mblRe = /^[789]\d{9}$/;
	if(emailRe.test($(username).val()) || mblRe.test($(username).val())){
		return true;
	}
	loginValidation.displayErrorMsg(usernameObj, divObj, "Invalid username");
	return false;
	
}


function displaySuccessMsg(){
	document.getElementById("loginSuccess").innerHTML = "Successfully Logged In"
	//document.getElementById("loginForm").reset();
	setTimeout(function() { window.location=window.location;},2000);
	return true;
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
















