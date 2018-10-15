<?php

    include_once("settings.pass");

    function mysqli_connection() {
        global $db_server;
        global $db_username;
        global $db_password;
        global $db_name;
        $conn = new mysqli($db_server, $db_username, $db_password, $db_name);

        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
        $conn->set_charset("utf8");
        return $conn;
    }

?>
