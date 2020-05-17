<?php 
    include "../db_config.php";

    $id = $_POST['id'];

    $query = "SELECT * FROM $tablePosts WHERE id=$id";

    $result = $conn->query($query) or die($conn->error);


    if ($conn->affected_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }

?>