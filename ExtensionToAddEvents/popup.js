chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
  parseSelection(selection[0]);
});

var hour = ''; var minutes = ''; var day = ''; var month = ''; var year = ''; var theDate = '';
function parseSelection(textSelection) {
	// alert('textSelection:'+textSelection);
	textSelection = textSelection.replace(new RegExp("ET", 'g'),"");
	textSelection = textSelection.replace(/[()]/g,"");
	// alert("replaced:"+textSelection);
	var starts = "";
	var ends = "";
	if(textSelection.indexOf("Starts:")>-1 && textSelection.indexOf("Ends:")>-1){
		starts = textSelection.substring(textSelection.indexOf("Starts:")+"Starts:".length,textSelection.indexOf("Ends:")-1);
		ends = textSelection.substring(textSelection.indexOf("Ends:")+"Ends:".length,textSelection.length);
		extractDate(starts.trim(),'event-start-time');
		extractDate(ends.trim(),'event-end-time');
		// alert('ends:'+ends);
	}
	else if(textSelection.indexOf("Starts:")>-1){
		starts = textSelection.substring(textSelection.indexOf("Starts:")+"Starts:".length,textSelection.length);
		extractDate(starts.trim(),'event-start-time');
	}
	else if(textSelection.indexOf("Ends:")>-1){
		ends = textSelection.substring(textSelection.indexOf("Ends:")+"Ends:".length,textSelection.length);
		extractDate(ends.trim(),'event-end-time');
	}
	textSelection = textSelection.replace(new RegExp(starts, 'g'),"");
	textSelection = textSelection.replace(new RegExp(ends, 'g'),"");
	textSelection = textSelection.replace(new RegExp("Starts:", 'g'),"");
	textSelection = textSelection.replace(new RegExp("Ends:", 'g'),"");
	document.getElementById('event-title').value = textSelection;
}

function extractDate(textSelection,id){
	var foundDate = false;
	var date;
	var monthPattern = /(january|february|march|april|may|june|july|august|september|october|november|december)/gi; //any month
	var monthUpperCasePattern = /(January|February|March|April|May|June|July|August|September|October|November|December)/gi; //any month
	var shortMonthPattern = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/gi; //any short month
	var dashMonthPattern = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/gi; //2004-04-30
	var timeDateStamp = /^(((((0[13578])|([13578])|(1[02]))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(3[01])))|((([469])|(11))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(30)))|((02|2)[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9]))))[\-\/\s]?\d{4})(\s(((0[1-9])|([1-9])|(1[0-2]))\:([0-5][0-9])((\s)|(\:([0-5][0-9])\s))([AM|PM|am|pm]{2,2})))?$/gi; //11/30/2003 10:12:24 am
	
	if (textSelection.match(monthPattern) || textSelection.match(monthUpperCasePattern) || textSelection.match(shortMonthPattern) || textSelection.match(timeDateStamp) || textSelection.match(dashMonthPattern) /*||textSelection.match(slashMonthPattern)*/) {
		foundDate = true;
		theDate = Date.parse(textSelection);
	}
	var d = new Date(theDate);
	alert('date:'+d);
	if (foundDate && theDate != null && textSelection.length > 1 ){//&& textSelection.length < 40) {
		theDate = theDate.toString();
		if (theDate.indexOf("Jan") > -1) month = "01";
		else if (theDate.indexOf("Feb") > -1) month = "02";
		else if (theDate.indexOf("Mar") > -1) month = "03";
		else if (theDate.indexOf("Apr") > -1) month = "04";
		else if (theDate.indexOf("May") > -1) month = "05";
		else if (theDate.indexOf("Jun") > -1) month = "06";
		else if (theDate.indexOf("Jul") > -1) month = "07";
		else if (theDate.indexOf("Aug") > -1) month = "08";
		else if (theDate.indexOf("Sep") > -1) month = "09";
		else if (theDate.indexOf("Oct") > -1) month = "10";
		else if (theDate.indexOf("Nov") > -1) month = "11";
		else if (theDate.indexOf("Dec") > -1) month = "12";
		
		theDate = theDate.substring(8);
		day = theDate.substring(0, 2);
		theDate = theDate.substring(3);
		year = theDate.substring(0, 4);
		theDate = theDate.substring(5);
		hour = theDate.substring(0, 2);
		minutes = theDate.substring(3, 5);
		
		if (parseInt(hour) > 12) {
			hour = String(hour - 12);
		}
		
		if (hour.length == 1) {
			hour = "0" + hour;
		}
		
		if (parseInt(theDate.substring(0, 2)) < 12) {
			AmPm = 'AM';
		} else {
			AmPm = 'PM';
		}
		var value = year + "-" + month + "-" + day + " " + hour +':'+ minutes +' '+AmPm;
		var dateVal = new Date(value);
		document.getElementById(id).value = dateVal;
		// alert('time:'+hour+' '+minutes+' '+AmPm);
		// var dateFormatted = {month:month, day:day, year:year, hour:hour, minutes:minutes, AMPM:AmPm};
		// return dateFormatted;
	}
}

// chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
//   function(tab) {
//     chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
//     function(response){
//       // var text = document.getElementById('text'); 
//       // text.innerHTML = response.data;
//       // alert(response);
//     });
//   });

// chrome.tabs.executeScript( {
//   code: "window.getSelection().toString();"
// }, function(selection) {
// 	var username=selection[0];
// 	$('#popUp').show();
// $.ajax({
// url:'http://localhost/Calendar/home.php',
// method:'get',
// data:{name:username},
// success:function(data)
// {
// alert("Sucess");
// },
// error:function(data)
// {
// alert("error");
// }
// });
  // alert('before call');
  // $.post('home.php');
  // window.location.href = 'home.php';
  // alert('after call');
  // // var x = new XMLHttpRequest();
  // // x.open("GET","home.php",true);
  // // x.send();
  // document.getElementById("text").value = selection[0];
  // return false;
  // window.location.href = 'home.php';
  // document.getElementById("popUp").style.display = "block";
  // alert(selection[0]);
//   $.ajax({
//   url: 'home.php',
//   success: function(data) {
//     alert("success");
//   }
// });
// });

// Selected time should not be less than current time
function AdjustMinTime(ct) {
	var dtob = new Date(),
  		current_date = dtob.getDate(),
  		current_month = dtob.getMonth() + 1,
  		current_year = dtob.getFullYear();
  			
	var full_date = current_year + '-' +
					( current_month < 10 ? '0' + current_month : current_month ) + '-' + 
		  			( current_date < 10 ? '0' + current_date : current_date );

	if(ct.dateFormat('Y-m-d') == full_date)
		this.setOptions({ minTime: 0 });
	else 
		this.setOptions({ minTime: false });
}

$(document).ready(function() 
{
    $('#cancel-event').click(function()
    {
    	$('#popUp').hide();
    });

    // DateTimePicker plugin : http://xdsoft.net/jqplugins/datetimepicker/
	$("#event-start-time, #event-end-time").datetimepicker({ format: 'Y-m-d H:i', minDate: 0, minTime: 0, step: 5, onShow: AdjustMinTime, onSelectDate: AdjustMinTime });
	$("#event-date").datetimepicker({ format: 'Y-m-d', timepicker: false, minDate: 0 });

	// Send an ajax request to create event
	$("#create-event").on('click', function(e) {
	if($("#create-event").attr('data-in-progress') == 1)
		return;

	var blank_reg_exp = /^([\s]{0,}[^\s]{1,}[\s]{0,}){1,}$/,
		error = 0,
		parameters;

	$(".input-error").removeClass('input-error');

	if(!blank_reg_exp.test($("#event-title").val())) {
		$("#event-title").addClass('input-error');
		error = 1;
	}

	if(!blank_reg_exp.test($("#event-start-time").val())) {
		$("#event-start-time").addClass('input-error');
		error = 1;
	}		

	if(!blank_reg_exp.test($("#event-end-time").val())) {
		$("#event-end-time").addClass('input-error');
		error = 1;
	}

	if(error == 1)
		return false;
	// If end time is earlier than start time, then interchange them
	if($("#event-end-time").datetimepicker('getValue') < $("#event-start-time").datetimepicker('getValue')) {
		var temp = $("#event-end-time").val();
		$("#event-end-time").val($("#event-start-time").val());
		$("#event-start-time").val(temp);
	}
	
	// Event details
	parameters = { 	title: $("#event-title").val(), 
					event_time: {
						start_time: $("#event-start-time").val().replace(' ', 'T') + ':00',
						end_time: $("#event-end-time").val().replace(' ', 'T') + ':00',
						event_date: null
					},
					all_day: 0,
				};

	$("#create-event").attr('disabled', 'disabled');
	//check for google login
	// $.ajax({
	// 	type: 'POST',
	// 	url: 'home.php',
	// 	success: function(response) {
	// 		alert('logged in:'+response.status);
	// 	}
	// })

	alert("event details:"+parameters.title+" times:"+parameters.event_time);
	$.ajax({
        type: 'POST',
        url: 'ajax.php',
        data: { event_details: parameters },
        dataType: 'json',
        success: function(response) {
        	$("#create-event").removeAttr('disabled');
        	alert('Event created with ID : ' + response.event_id);
        },
        error: function(response) {
            $("#create-event").removeAttr('disabled');
            alert('error:'+response.message);
        }
    });
    
});
});