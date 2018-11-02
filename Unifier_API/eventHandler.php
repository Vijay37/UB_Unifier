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
      mysqli_close($sql_conn);
      return $ret;
    }
    function add_user_event($emailId,$event_name,$event_desc="",$time,$date,$location="",$category=""){
      $ret['message'] = "SUCCESS";
      $ret['STATUS'] = "SUCCESS";
      $sql_conn = mysqli_connection();
      if(!($stmt = $sql_conn->prepare("INSERT INTO UserEvents(userEmail,event_name,description,`time`,`date`,location,category) VALUES (?,?,?,?,?,?,?)"))){
        $ret["message"] =  "Statement preparation failed: (" . $sql_conn->errno . ") " . $sql_conn->error;
        $ret['STATUS'] = "FAILURE";
        return $ret;
      }
      if(!($stmt->bind_param("sssssss",$emailId, $event_name,$event_desc,$time,$date,$location,$category))){
        $ret["message"] ="Binding Parameters Failed.";
        $ret['STATUS'] = "FAILURE";
        return $ret;
      }
      if (!($res = $stmt->execute())) {
        $ret["message"] =  "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
        $ret['STATUS'] = "FAILURE";
        return $ret;
      }
      mysqli_close($sql_conn);
      return $ret;
    }
    function add_event($event_name,$event_desc="",$time,$date,$location="",$category=""){
      $ret['message'] = "SUCCESS";
      $ret['STATUS'] = "SUCCESS";
      $sql_conn = mysqli_connection();
      if(!($stmt = $sql_conn->prepare("INSERT INTO Event(event_name,description,`time`,`date`,location,category) VALUES (?,?,?,?,?,?)"))){
        $ret["message"] =  "Statement preparation failed: (" . $sql_conn->errno . ") " . $sql_conn->error;
        $ret['STATUS'] = "FAILURE";
        return $ret;
      }
      if(!($stmt->bind_param("ssssss", $event_name,$event_desc,$time,$date,$location,$category))){
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

    function get_event_list(){
      $ret['message'] = "SUCCESS";
      $sql_conn = mysqli_connection();
      $sql="SELECT * from Event WHERE 1";
      $result = mysqli_query($sql_conn, $sql);

      while($row = mysqli_fetch_array($result)) {
          $json[] = $row;
      }
      $ret['RESULT']=$json;
      mysqli_close($sql_conn);
      return $ret;
    }
    function get_user_event_list($email){
      $sql_conn = mysqli_connection();
      $res=array();
      $sql="SELECT * from UserEvents WHERE userEmail='$email'";
      $result = mysqli_query($sql_conn, $sql);

      while($row = mysqli_fetch_array($result)) {
          $json[] = $row;
      }
      $res=$json;
      mysqli_close($sql_conn);
      return $res;
    }
    function get_user_link_list($email){
      $sql_conn = mysqli_connection();
      $res=array();
      $sql="SELECT * from UserLinks WHERE userEmail='$email'";
      $result = mysqli_query($sql_conn, $sql);

      while($row = mysqli_fetch_array($result)) {
          $json[] = $row;
      }
      $res=$json;
      mysqli_close($sql_conn);
      return $res;
    }
?>
