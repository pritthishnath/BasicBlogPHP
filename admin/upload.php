<?php

// Images upload path
$imageFolder = "images/";

reset($_FILES);
$temp = current($_FILES);
if(is_uploaded_file($temp['tmp_name'])){
  
    // Verify extension
    if(!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png"))){
        header("HTTP/1.1 400 Invalid extension.");
        return;
    }
    
    $filetowrite = $imageFolder . $temp['name'];
    move_uploaded_file($temp['tmp_name'], $filetowrite);
  
    // Respond to the successful upload with JSON.
    echo json_encode(array('location' => $filetowrite));
} else {
    // Notify editor that the upload failed
    header("HTTP/1.1 500 Server Error");
}
?>