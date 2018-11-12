<?php
	require_once "Mail.php";
	$from = "UB Unifier <ubunifier.5683@gmail.com>";
	$to = "Vijay Harshavardhan Palla <vijayaha@buffalo.edu>";
	$cc = "Kalyani Chikte <kchikte@buffalo.edu>";
	$subject = "UB Unifier verification link";
	$link = "link";
	$body = "Hi,\nPlease click the following to verify your account for UB Unifier : ".$link;
	$host = "ssl://smtp.gmail.com";
	$port = "465";
	$username = "ubunifier.5683@gmail.com";
	$password = "Kalyani@1";
	$headers = array ('From' => $from,
	  'To' => $to,
	  'Cc' => $cc,
	  'Subject' => $subject);
	$smtp = Mail::factory('smtp',
	  array ('host' => $host,
	  	'port' => $port,
	    'auth' => true,
	    'username' => $username,
	    'password' => $password));
	$mail = $smtp->send($to, $headers, $body);
	if (PEAR::isError($mail)) {
	  echo("<p>" . $mail->getMessage() . "</p>");
	 } else {
	  echo("<p>Message successfully sent!</p>");
	}
?>