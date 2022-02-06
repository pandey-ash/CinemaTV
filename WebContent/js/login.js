$(document).ready(function(){
	$("#login-link").click(function(){
		$("#pop-background, #login").css("display", "block");
		return false;
	});
	$("#register-link").click(function(){
		$("#pop-background, #register").css("display", "block");
		return false;
	});
	$("#pop-background, #cancel-img").click(function(){
		$(".error, .reset-field,textarea").removeAttr("style").html("").val("");
		$("select").removeAttr("style");
		$("#pop-background, #login").css("display", "none");
		$("#pop-background, #register").css("display", "none");
	});
	$("#pop-background, #cancel-img").click(function(){
		$(".error, .reset-field,textarea").removeAttr("style").html("").val("");
		$("select").removeAttr("style");
		$("#pop-background, #register").css("display", "none");
	});
});