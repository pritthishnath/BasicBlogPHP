<?php 
    include "db_config.php";

    $query = "SELECT `id`, `post_title`,`post_permalink`, `post_desc`, DATE_FORMAT(DATE(`timestamp`), 'Published on %M %d, %Y') AS `date` FROM $tablePosts ORDER BY `date` DESC";

    $result = $conn->query($query) or die($conn->error);

    $rows = [];

    if ($conn->affected_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        echo json_encode($rows);
    }

?>