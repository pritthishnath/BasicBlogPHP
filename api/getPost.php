<?php 
    include "db_config.php";

    $permalink = $_POST['post_permalink'];

    $query = "SELECT * FROM $tablePosts WHERE `post_permalink`='$permalink'";

    $result = $conn->query($query) or die($conn->error);

    // $rows = [];

    if ($conn->affected_rows > 0) {
        $row = $result->fetch_assoc();

        echo json_encode($row);
    }
        

?>