<?php
    session_start();
    include_once("sql_connection.php");

    function validate_reset_token( $token){
        $ret['message'] = 'SUCCESS';
        $ret["STATUS"] = "SUCCESS";
        $sql_conn = mysqli_connection();
        $sql = "SELECT * FROM  `user` WHERE verificationLink='$token'";
        $result = $sql_conn->query($sql);
        if($result->num_rows==0){
          $ret["message"]="Invalid token";
          $ret["STATUS"] = "FAILURE";
        }
        else{
            $ret["STATUS"] = "SUCCESS";

        }

        mysqli_close($sql_conn);
        return $ret;
    }
    function validate_registration_token($token){
      $status = validate_reset_token($token);
      $sql_conn = mysqli_connection();
      if($status["STATUS"]=="SUCCESS"){
          $sql_conn->query("UPDATE user SET verificationLink = '' , verificationStatus=1 WHERE verificationLink='$token'");
      }
      mysqli_close($sql_conn);
      return $status;

    }
    function set_registration_token($token,$emailId){
      $sql_conn = mysqli_connection();
      if(!($stmt = $sql_conn->prepare("UPDATE user SET verificationLink=? WHERE userEmail=?" ))){
        $ret["message"] =  "Statement preparation failed: (" . $sql_conn->errno . ") " . $sql_conn->error;
        $ret['STATUS'] = "FAILURE";
        mysqli_close($sql_conn);
        return $ret;
      }
      if(!($stmt->bind_param("ss",$token,$emailId))){
        $ret["message"] ="Binding Parameters Failed.";
        $ret['STATUS'] = "FAILURE";
        mysqli_close($sql_conn);
        return $ret;
      }
      if (!($res = $stmt->execute())) {
        $ret["message"] =  "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
        $ret['STATUS'] = "FAILURE";
        mysqli_close($sql_conn);
        return $ret;

      }
      else{
        $ret['STATUS'] = "SUCCESS";
        return $ret;
      }
    }
?>
