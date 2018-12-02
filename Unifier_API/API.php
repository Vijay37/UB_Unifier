<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");
include_once("sql_connection.php");
include_once("UserSession.php");
include_once("eventHandler.php");
include_once("tokenHandler.php");
if(isset($_POST["KEY"])){
  if($_POST["KEY"]=="LOGIN"){
    $response=validateUser($_POST["EMAIL"],$_POST["PASSWORD"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="REGISTER"){
    $response=registerUser($_POST["F_NAME"],$_POST["L_NAME"],$_POST["EMAIL"],$_POST["PASSWORD"],$_POST["CALENDAR_EMAIL"]);
    if($response['SIGNUP']=="SUCCESS"){
      generate_and_set_registration_token($_POST["EMAIL"],"register");
    }
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="LOGOUT"){
    $response=logout_user();
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="ADDLINK"){
    $response=add_user_favlink($_POST["EMAIL"],$_POST["LINK"],$_POST["LINKNAME"]);
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
  else if($_POST["KEY"]=="GETEVENT"){
    $response=get_event_list();
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="GETUSEREVENT"){
    $response=get_user_event_list($_POST["EMAIL"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="GETUSERLINK"){
    $response=get_user_link_list($_POST["EMAIL"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="VALIDATERESETTOKEN"){
    $response=validate_reset_token($_POST["TOKEN"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="FORGOTPASSWORD"){
    $response=generate_and_set_registration_token($_POST["EMAIL"],"reset");
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="RESETPASSWORD"){
    $response=reset_password($_POST["TOKEN"],$_POST["PASSWORD"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="VALIDATEREGISTERTOKEN"){
    $response=validate_registration_token($_POST["TOKEN"]);
    echo json_encode($response);
  }
  else if($_POST["KEY"]=="SETREGISTERTOKEN"){
    $response=set_registration_token($_POST["TOKEN"],$_POST["EMAILID"]);
    echo json_encode($response);
  }
}
?>
