<?php
    session_start();
    include_once("sql_connection.php");

    function loginUser($user){
        if(session_start()){
            $_SESSION["user"] = json_decode(json_encode($user));
            $_SESSION["login_time"] = time();
            $_SESSION["start_time"] = time();
        }
    }

    function logoutUser($user = NULL){
        session_start();
        session_unset();
        session_destroy();
    }

    function isLoggedIn(){
        return (isset($_SESSION["user"]) && !is_null($_SESSION["user"]));
    }

    function validateUser( $username, $password ){
        $ret['message'] = 'SUCCESS';
        $sql_conn = mysqli_connection();
        $sql = "SELECT * FROM  `user` WHERE userEmail=".$username;
        $result = $sql_conn->query($sql);
        if($result->num_rows==0){
          $ret["message"]="Email ID not found";
        }
        else{
          $row=$result->fetch_assoc();
          if($row["userPassword"]!=$password || $row["verificationStatus"]==0){
            $ret["message"]="Invalid Password/Account not verified";
          }
        }


        return $ret;
    }
    function registerUser($fname,$lname,$emailId,$password){
      $ret['message'] = 'SIGN UP SUCCESSFUL!';
      $ret['STATUS'] = "SUCCESS";
      $sql_conn = mysqli_connection();
      $result = $sql_conn->query("SELECT userEmail FROM user WHERE userEmail = '$emailId'");
      if($result->num_rows > 0) {
           $ret['message'] = "Looks like you have already signed up.";
           return $ret;
      } else {
        $created_date = date("Y-m-d H:i:s");
        if(!($stmt = $sql_conn->prepare("INSERT INTO user(userEmail,userPassword,firstName,lastName) VALUES (?,?,?,?)"))){
          $ret["message"] =  "Statement preparation failed: (" . $sql_conn->errno . ") " . $sql_conn->error;
          $ret['STATUS'] = "FAILURE";
          return $ret;
        }
        if(!($stmt->bind_param("ssss",$emailId, $password, $fname, $lname))){
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

    }
?>
