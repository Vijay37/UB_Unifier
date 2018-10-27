<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");
include_once("sql_connection.php");
include_once("UserSession.php");
if(isset($_POST["KEY"])){
  if($_POST["KEY"]=="LOGIN"){
    $response=validateUser($_POST["EMAIL"],$_POST["PASSWORD"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="REGISTER"){
    $response=registerUser($_POST["F_NAME"],$_POST["L_NAME"],$_POST["EMAIL"],$_POST["PASSWORD"]);
    echo json_encode($response);
  }
}
?>
