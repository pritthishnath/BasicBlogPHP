<?php 
    include "../db_config.php";

    $id = $_POST['post_id'];
    $title = $_POST['post_title'];
    $permalink = $_POST['post_permalink'];
    $desc = $_POST['post_desc'];
    $content = $_POST['post_content'];

    $query = "UPDATE $tablePosts SET post_title='$title', post_permalink='$permalink',post_desc='$desc' , post_content='$content' WHERE id=$id";
    $conn->query($query) or die($conn->error);

    if (!$conn->error) {
        echo "Updated Successfully";
    }
?>