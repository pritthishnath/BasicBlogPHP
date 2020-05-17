<?php 
    include "db_config.php";

    $title = $_POST['post_title'];
    $permalink = $_POST['post_permalink'];
    $desc = $_POST['post_desc'];
    $content = $_POST['post_content'];

    $query = "INSERT INTO $tablePosts (post_title, post_permalink, post_desc, post_content) VALUES ('$title', '$permalink', '$desc', '$content')";

    $conn->query($query) or die($conn->error);

    if (!$conn->error) {
        echo "Created Successfully";
    }

?>