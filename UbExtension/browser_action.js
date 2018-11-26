var browseraction = {};
var calendarId="";
var selectedText="";
browseraction.QUICK_ADD_API_URL_= 'https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/quickAdd';
browseraction.CALENDAR_LIST_API_URL_ = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
browseraction.getCalList = function() {
    chrome.identity.getAuthToken({'interactive': true}, function (authToken) {
        $.ajax(browseraction.CALENDAR_LIST_API_URL_, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        },
        success: function(data) {
          var calendars = {};
          for (var i = 0; i < data.items.length; i++) {
            var calendar = data.items[i];
			      console.log(calendar);
            if(calendar.accessRole === "owner"){
                calendarId=calendar.id;
			           }
          }
          $('#create-event').on('click', function() {
          browseraction.createQuickAddEvent_($('#event-title').val().toString());
            });
        }
        });
    });
}

browseraction.createQuickAddEvent_ = function(title) {
   console.log("title :"+title);
   console.log("calendarId:"+calendarId);
    var quickAddUrl = browseraction.QUICK_ADD_API_URL_.replace('{calendarId}', encodeURIComponent(calendarId)) + '?text=' + encodeURIComponent(title);
    chrome.identity.getAuthToken({'interactive': false}, function (authToken){
        $.ajax(quickAddUrl, {
        type: 'POST',
        headers: {
          'Authorization': 'Bearer ' + authToken
        },
        success: function(response) {
          alert("Event added succesfully");
          $('#popUp').hide();
        },
        error: function(response) {
            alert("Error" + response);
        }
        });
    });
}

browseraction.getCalList();
$('#create-event').on('click', function() {
browseraction.createQuickAddEvent_($('event-title').val().toString());
  });
