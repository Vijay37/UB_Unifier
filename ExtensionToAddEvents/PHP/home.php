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

<script src="home.js"></script>

</body>
</html>