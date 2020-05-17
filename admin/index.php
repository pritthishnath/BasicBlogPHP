<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900|Muli:400,500,600,700,800,900|Playfair+Display:400,500,600,700,800&display=swap" rel="stylesheet">
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"> -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Admin Panel - Blog</title>
</head>
<body>
    <div class="container">
        <button id="new-post-btn"class="btn btn-primary m-4" data-toggle="modal" data-target="#newPostModal">New Post</button>
        <table class="table display" id="data-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Timestamp</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
    
    <div class="modal fade" id="newPostModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="newPostModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-custom" role="document">
            <div class="modal-content modal-content-custom">
                <div class="modal-header">
                    <h5 class="modal-title" id="newPostModalLabel">New Post</h5>
                    <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> -->
                </div>
                <form id="newPostForm">
                    <div class="container">
                        <div class="modal-body">
                            <input type="hidden" name="post_id" id="post-id"/>
                            <input type="text" id="post-title" class="form-control post-title" name="post_title" placeholder="Enter title here..." autocomplete="off" />
                            <div class="post-title-char">150 characters left</div>
                            <textarea name="post_desc" id="post-desc" rows="3" class="form-control post-desc" placeholder="Enter short description here..."></textarea>
                            <div class="post-desc-char">400 characters left</div>
                            <textarea name="post_content" id="post-content" class="post-content"></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeBtn">Close</button>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote.min.js"></script> -->
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <script src="scripts/script.js"></script>
</body>
</html>