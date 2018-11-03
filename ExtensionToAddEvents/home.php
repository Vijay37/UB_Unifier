<?php

session_start();

if(!isset($_SESSION['access_token'])) {
	header('Location: google-login.php');
	exit();	
}

?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.1.9/jquery.datetimepicker.min.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.1.9/jquery.datetimepicker.min.js"></script>

<style type="text/css">

#popUp {
	width: 50%;
  	height: 60%;
	margin: 100px auto;
  	background : #DFE4F9;
  	font-family : Sans-serif;
  	font-size : 20px;
  	/*display :none;*/
}

table {
  	background: none;
  	width: 80%;
  	height: 80%;
  	margin: 100px auto;
  	padding-top: 10%;
}

input[type="text"] {
	background: none;
	padding: 8px;
	display: block;
	margin: 0 0 20px 0;
	width: 100%;
}

.input-error {
	border: 1px solid red !important;
}

#event-date {
	/*display: none;*/
}

button {
	background: none;
	width: 90%;
  	display: block;
  	border: 2px solid #2980b9;
  	padding: 8px;
  	background: none;
  	color: #2980b9;
  	cursor: pointer;
}

</style>
</head>

<body>

<div id="popUp">
	<table>
        <tr>
          <td><label>Event Title</label></td>
          <td><input type="text" id="event-title" placeholder="Event Title" autocomplete="off" /></td>
        </tr>
          <td><label>Start Time</label></td>
          <td><input type="text" id="event-start-time" placeholder="Event Start Time" autocomplete="off" /></td>
        </tr>
        <tr>
          <td><label>End Time</label></td>
          <td><input type="text" id="event-end-time" placeholder="Event End Time" autocomplete="off" /></td>
        </tr>
        <tr>
          <td> <button id="cancel-event">Cancel Event</button></td>
          <td> <button id="create-event">Create Event</button></td>
        </tr>
      </table>
</div>

<script>

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
            alert(response.responseJSON.message);
        }
    });
    
});

//cancel event
$("#cancel-event").on('click', function(e) {
	// $('#popUp').hide();
	$('#event-title').val("");
	$('#event-start-time').val("");
	$('#event-end-time').val("");
});

</script>

</body>
</html>