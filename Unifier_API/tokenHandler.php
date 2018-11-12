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
?>
