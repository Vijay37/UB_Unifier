<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");
include_once("sql_connection.php");
include_once("UserSession.php");
include_once("eventHandler.php");
if(isset($_POST["KEY"])){
  if($_POST["KEY"]=="LOGIN"){
    $response=validateUser($_POST["EMAIL"],$_POST["PASSWORD"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="REGISTER"){
    $response=registerUser($_POST["F_NAME"],$_POST["L_NAME"],$_POST["EMAIL"],$_POST["PASSWORD"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="LOGOUT"){
    $response=logout_user();
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="ADDLINK"){
    $response=add_user_favlink($_POST["EMAIL"],$_POST["LINK"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="ADDUSEREVENT"){
    $response=add_user_event($_POST["EMAIL"],$_POST["EVENTNAME"],$_POST["DESC"],$_POST["TIME"],$_POST["DATE"],$_POST["LOCATION"],$_POST["CATEGORY"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="ADDEVENT"){
    $response=add_event($_POST["EVENTNAME"],$_POST["DESC"],$_POST["TIME"],$_POST["DATE"],$_POST["LOCATION"],$_POST["CATEGORY"]);
    echo json_encode($response);
  }
}
?>
