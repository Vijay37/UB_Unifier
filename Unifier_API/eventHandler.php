<?php
    include_once("sql_connection.php");
    function add_user_favlink($emailId,$link){
      $ret['message'] = "SUCCESS";
      $ret['STATUS'] = "SUCCESS";
      $sql_conn = mysqli_connection();
      if(!($stmt = $sql_conn->prepare("INSERT INTO UserLinks(userEmail,link) VALUES (?,?)"))){
        $ret["message"] =  "Statement preparation failed: (" . $sql_conn->errno . ") " . $sql_conn->error;
        $ret['STATUS'] = "FAILURE";
        return $ret;
      }
      if(!($stmt->bind_param("ss",$emailId, $link))){
        $ret["message"] ="Binding Parameters Failed.";
        $ret['STATUS'] = "FAILURE";
        return $ret;
      }
      if (!($res = $stmt->execute())) {
        $ret["message"] =  "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
        $ret['STATUS'] = "FAILURE";
        return $ret;
      }
      return $ret;
    }
?>
