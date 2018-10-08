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
          if($row["userPassword"]!=$password || !$row["verificationStatus"]){
            $ret["message"]="Invalid Password/Account not verified";
          }
        }


        return $ret;
    }
?>
