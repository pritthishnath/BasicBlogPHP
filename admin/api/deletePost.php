<?php 
    include "db_config.php";

    $id = $_POST['id'];
    $query = "DELETE FROM $tablePosts WHERE id=$id";

    $conn->query($query) or die($conn->error);

    if (!$conn->error) {
        echo "Post Deleted Successfully";
    }

?>