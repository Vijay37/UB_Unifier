chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
  $("#event-title").val(selection);
});

$(document).ready(function()
{
    $('#cancel-event').click(function()
    {
    	$('#popUp').hide();
    });



});
