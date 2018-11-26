// Selected time should not be less than current time
window.onload=function(){
	var url = window.location.href;
	var vars = getUrlVars();
	var title = vars["title"];
	title = title.replace(/_/g, ' ');
	var stime = vars["sTime"];
	var etime = vars["eTime"];
	var split = stime.split("_");
	var sdate = split[0];
	stime=split[1];
	split = etime.split("_");
	var edate = split[0];
	etime=split[1];
	var final_stime = sdate+" "+stime;
	var final_etime = edate+" "+etime;
	$("#event-start-time").val(final_stime);
	$("#event-title").val(title);
	$("#event-end-time").val(final_etime);
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
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
            alert("Error found");
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