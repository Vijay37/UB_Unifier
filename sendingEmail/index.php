<?php
	$to = "vijayaha@buffalo.edu";
	$subject = "UB Unifier verification link";
	
	$link = "link";
	$chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$digits = '0123456789';
	$token = generateRandomString($chars);
	$token .= generateRandomString($digits);
	$link = "link".$token;

	$txt = "Hi,\nPlease click the following to verify your account for UB Unifier : ".$link;
	$headers = "From: ubunifier.5683@gmail.com" . "\r\n" .
	"CC: kchikte@buffalo.edu";

	$retVal = mail($to,$subject,$txt,$headers);
	if (retVal) {
		echo("<p>Message successfully sent!</p>");
	} else {
		echo("<p>Error while sending email!</p>");
	}

	function generateRandomString($characters) {
		$length = 5;
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}
?>
