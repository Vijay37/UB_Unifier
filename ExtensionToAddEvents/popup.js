chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
  parseSelection(selection[0]);
  // handleClientLoad();
});

var hour = ''; var minutes = ''; var day = ''; var month = ''; var year = ''; var theDate = ''; var allDay = 0;

function parseSelection(textSelection) {

	// var title="Testing on progress";
	// var stime="2018-11-27_13:00";
	// var etime="2018-11-27_14:00";
	// title = title.replace(/\ /g,"_");
	// var newURL ="http://localhost/ExtensionToAddEvents/PHP/home.php?title="+title+"&sTime="+stime+"&eTime="+etime;
	// chrome.tabs.create({ url: newURL });
	// return;
	var title="";
	var stime="";
	var etime="";

	textSelection = textSelection.replace(new RegExp("ET", 'g'),"");
	textSelection = textSelection.replace(/[()]/g,"");
	
	// alert("replaced:"+textSelection);
	var starts = "";
	var ends = "";
	var datePattern = /\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}/;
	console.log("textSelection:"+textSelection);
	if(textSelection.toUpperCase().indexOf('all day'.toUpperCase())>-1)
		allDay = 1;
	
	if(textSelection.indexOf("Starts:")>-1 && textSelection.indexOf("Ends:")>-1){
		starts = textSelection.substring(textSelection.indexOf("Starts:")+"Starts:".length,textSelection.indexOf("Ends:")-1);
		ends = textSelection.substring(textSelection.indexOf("Ends:")+"Ends:".length,textSelection.length);
		// alert('starts:'+starts);
		// extractDate(starts.trim(),'event-start-time');
		// extractDate(ends.trim(),'event-end-time');
		// alert('ends:'+ends);
		stime = extractDate(starts.trim());
		etime = extractDate(ends.trim());
		textSelection = textSelection.replace(new RegExp(starts, 'g'),"");
		textSelection = textSelection.replace(new RegExp(ends, 'g'),"");
		textSelection = textSelection.replace(new RegExp("Starts:", 'g'),"");
		textSelection = textSelection.replace(new RegExp("Ends:", 'g'),"");
		title = textSelection;
	}
	else if(textSelection.indexOf("Starts:")>-1){
		starts = textSelection.substring(textSelection.indexOf("Starts:")+"Starts:".length,textSelection.length);
		// extractDate(starts.trim(),'event-start-time');
		stime = extractDate(starts.trim());
		textSelection = textSelection.replace(new RegExp(starts, 'g'),"");
		textSelection = textSelection.replace(new RegExp("Starts:", 'g'),"");
		title = textSelection;
	}
	else if(textSelection.indexOf("Ends:")>-1){
		ends = textSelection.substring(textSelection.indexOf("Ends:")+"Ends:".length,textSelection.length);
		// extractDate(ends.trim(),'event-end-time');
		etime = extractDate(ends.trim());
		textSelection = textSelection.replace(new RegExp(ends, 'g'),"");
		textSelection = textSelection.replace(new RegExp("Ends:", 'g'),"");
		title = textSelection;
	}
	else if(datePattern.test(textSelection)){
		var array;
		var array1 = textSelection.split("\n");
		var array2 = array1[1].split(",");
		
		if(datePattern.test(array2[0])){
			date = array2[0];
			// alert("array2[1]:"+array2[1]);
			if(array2[1].indexOf("-")>-1){
				array = array2[1].split("-");
				starts = date+" "+array[0];
				ends = date+" "+array[1];
				// alert("starts:"+starts);
			}
			// extractDate(starts.trim(),'event-start-time');
			// extractDate(ends.trim(),'event-end-time');
			stime = extractDate(starts.trim());
			etime = extractDate(ends.trim());
		}
		title = array1[0];
	}
	stime = stime.replace(/\ /g,"_");
	etime = etime.replace(/\ /g,"_");
	title = title.replace(/\ /g,"_");
	// alert(stime);
	// alert(etime);
	// alert(title);
	var newURL ="http://localhost/ExtensionToAddEvents/PHP/home.php?title="+title+"&sTime="+stime+"&eTime="+etime;
	chrome.tabs.create({ url: newURL });
	return;
	// textSelection = textSelection.replace(new RegExp(starts, 'g'),"");
	// textSelection = textSelection.replace(new RegExp(ends, 'g'),"");
	// textSelection = textSelection.replace(new RegExp("Starts:", 'g'),"");
	// textSelection = textSelection.replace(new RegExp("Ends:", 'g'),"");
	// document.getElementById('event-title').value = textSelection;
}

function extractDate(textSelection/*,id*/){
	// alert("id:"+id);
	var foundDate = false;
	var date;
	var monthPattern = /(january|february|march|april|may|june|july|august|september|october|november|december)/gi; //any month
	var monthUpperCasePattern = /(January|February|March|April|May|June|July|August|September|October|November|December)/gi; //any month
	var shortMonthPattern = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/gi; //any short month
	var dashMonthPattern = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/gi; //2004-04-30
	var slashMonthPattern = /\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}/;
	var timeDateStamp = /^(((((0[13578])|([13578])|(1[02]))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(3[01])))|((([469])|(11))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(30)))|((02|2)[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9]))))[\-\/\s]?\d{4})(\s(((0[1-9])|([1-9])|(1[0-2]))\:([0-5][0-9])((\s)|(\:([0-5][0-9])\s))([AM|PM|am|pm]{2,2})))?$/gi; //11/30/2003 10:12:24 am
	
// 11/26/2018 12:00 PM
// 11/29/2018 1:00 PM



	if (textSelection.match(monthPattern) || textSelection.match(monthUpperCasePattern) || textSelection.match(shortMonthPattern) || textSelection.match(timeDateStamp) || textSelection.match(dashMonthPattern) ||textSelection.match(slashMonthPattern)) {
		foundDate = true;
		// alert("textSelection:"+textSelection);
		theDate = Date.parse(textSelection);
	}
	// alert("foundDate:"+foundDate);
	// alert("theDate:"+theDate);
	var d = new Date(theDate);
	
	if (foundDate && theDate != null){//&& textSelection.length < 40) {

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
		
		// if (parseInt(hour) > 12) {
		// 	hour = String(hour - 12);
		// }
		
		// if (hour.length == 1) {
		// 	hour = "0" + hour;
		// }
		
		// if (parseInt(theDate.substring(0, 2)) < 12) {
		// 	AmPm = 'AM';
		// } else {
		// 	AmPm = 'PM';
		// }
		// var value = year + "-" + month + "-" + day + " " + hour +':'+ minutes +' '+AmPm;
		var date = year+"-"+month+"-"+day+" "+hour+":"+minutes;
		
		// alert("date:"+date);
		return date;

		// var dateVal = new Date(value);
		// alert("date val:"+dateVal);
		// document.getElementById(id).value = dateVal;

		// alert('time:'+hour+' '+minutes+' '+AmPm);
		// var dateFormatted = {month:month, day:day, year:year, hour:hour, minutes:minutes, AMPM:AmPm};
		// return dateFormatted;
	}
}


//function
var CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES;
CLIENT_ID = '195769870801-14goc3ou2humursr5j2q1416a7vhfqrn.apps.googleusercontent.com';
API_KEY = 'AIzaSyDvXC227Rdh2e3OmXX8dJGVGd9Us5l1-7E';
DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
SCOPES = "https://www.googleapis.com/auth/calendar";
function setUpGoogleApi(){
	// Client ID and API key from the Developer Console
    CLIENT_ID = '195769870801-14goc3ou2humursr5j2q1416a7vhfqrn.apps.googleusercontent.com';
    API_KEY = 'AIzaSyDvXC227Rdh2e3OmXX8dJGVGd9Us5l1-7E';
    // Array of API discovery doc URLs for APIs used by the quickstart
    DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    SCOPES = "https://www.googleapis.com/auth/calendar";
    // handleClientLoad();
}
function handleClientLoad() {
    window.gapi.load('auth2', initClient);
    // setTimeout(initClient, 10);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
    gapi.client.init({
	    apiKey: API_KEY,
	    clientId: CLIENT_ID,
	    discoveryDocs: DISCOVERY_DOCS,
	    scope: SCOPES
	}).then(function () {
    // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		// Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          // listUpcomingEvents();
          alert("Signed In");
          // AddEvent();
        }
      }
      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      // function listUpcomingEvents() {
      //   gapi.client.calendar.events.list({
      //     'calendarId': 'primary',
      //     'timeMin': (new Date()).toISOString(),
      //     'showDeleted': false,
      //     'singleEvents': true,
      //     'maxResults': 10,
      //     'orderBy': 'startTime'
      //   }).then(function(response) {
      //     var events = response.result.items;
      //     appendPre('Upcoming events:');

      //     if (events.length > 0) {
      //       for (i = 0; i < events.length; i++) {
      //         var event = events[i];
      //         var when = event.start.dateTime;
      //         if (!when) {
      //           when = event.start.date;
      //         }
      //         appendPre(event.summary + ' (' + when + ')')
      //       }
      //     } else {
      //       appendPre('No upcoming events found.');
      //     }
      //   });
      // }

function AddEvent() {
	var event = {
	  	'summary': 'Google I/O 2015',
	  	'location': '800 Howard St., San Francisco, CA 94103',
	  	'description': 'A chance to hear more about Google\'s developer products.',
	  	'start': {
	    	'dateTime': '2018-11-28T09:00:00-07:00',
	    	'timeZone': 'Eastern Standard Time'
	  	},
	  	'end': {
	    	'dateTime': '2018-11-28T17:00:00-07:00',
	    	'timeZone': 'Eastern Standard Time'
	  	}
	};

	var request = gapi.client.calendar.events.insert({
  		'calendarId': 'primary',
  		'resource': event
	});

	request.execute(function(event) {
  		alert('Event created: ' + event.htmlLink);
	});
}


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
	
	// handleClientLoad();f
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
					all_day: allDay,
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

	alert("event details:"+parameters.title+" times:"+parameters.event_time.start_time);
	// $.ajax({
 //        type: 'POST',
 //        url: 'ajax.php',
 //        data: { event_details: parameters },
 //        dataType: 'json',
 //        success: function(response) {
 //        	// $("#create-event").removeAttr('disabled');
 //        	// alert(response);
 //        	alert('Event created with ID : ' + response.event_id);
 //        },
 //        error: function(response) {
 //        	alert('error : ' + response.event_id);
 //            // $("#create-event").removeAttr('disabled');
 //            // alert('error:'+response.message);

 //        }
 //    });
//  	jQuery.ajax({
//     type: 'POST',
//     data: { 'event_details': parameters },
//     dataType: 'json',
//     url: 'ajax.php',
//     success: function (d) { alert('success'); },
//     error: function(d) {alert('ERROR');}
// });
	var str = "Hello";
	// var url = "http://localhost/ExtensionToAddEvents/ajax.php";// No question mark needed
	// xmlReq=new XMLHttpRequest();

	// xmlReq.open("POST",url,true);
	// xmlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xmlReq.setRequestHeader("Content-length", str.length);
	// xmlReq.setRequestHeader("Connection", "close");
	// xmlReq.send(str);
	// console.log("done");

	// $.ajax({type:"POST", 
	// 	url:"http://localhost/ExtensionToAddEvents/ajax.php", 
	// 	data: { 'event_details': parameters }, 
	// 	 dataType: 'json',
	// 	success: function(text) 
 //  		{
	// 		// It was a success, do something here
	// 		alert('success:'+text.event_id);
 //  		},
 //  		error: function(text) 
 //  		{
	// 		// There was an error, scream
	// 		console.log('ERROR:',text);
 //  		},
 //  		dataType: 'json',
	// });

	// setUpGoogleApi();
	// handleClientLoad();
	AddEvent();	
    
});
});