<?php 
    $host = "localhost";
    $user = "ambosis";
    $passwd = "pnathsqlidea";
    $db = "blog_db";
    $tablePosts = "posts";

    $conn = new mysqli($host, $user, $passwd, $db) or die($conn->error);
?>