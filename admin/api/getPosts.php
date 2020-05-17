<?php 
    include "db_config.php";

    $query = "SELECT * FROM $tablePosts ORDER BY `id`";

    $result = $conn->query($query) or die($conn->error);

    $rows = [];

    if ($conn->affected_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        echo json_encode($rows);
    } else {
        echo null;
    }

?>