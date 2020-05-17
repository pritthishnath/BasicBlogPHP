$(document).ready(function () {
    tinymce.init({
        selector: 'textarea#post-content',
        menubar: false,
        plugins: ["advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste imagetools"
        ],
        toolbar: 'undo redo | styleselect | bold italic | link image | fontselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent',
        content_css: ['https://fonts.googleapis.com/css?family=Lato|Muli|Playfair+Display', 'css/style.css'],
        height: 350,
        resize: false,
        colors_cols: 5,
        font_formats: 'Lato=Lato;Muli=Muli;Playfair Display=Playfair Display;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
        color_map: [
            "000000", "Black",
            "808080", "Gray",
            "FFFFFF", "White",
            "FF0000", "Red",
            "FFFF00", "Yellow",
            "008000", "Green",
            "0000FF", "Blue"
        ],
        images_upload_url: 'upload.php',
        images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'upload.php');

            xhr.onload = function () {
                var json;

                if (xhr.status != 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }

                json = JSON.parse(xhr.responseText);

                if (!json || typeof json.location != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }

                success(json.location);
                console.log(json.location);
            };

            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            xhr.send(formData);
        }
    });
    $(this).on('focusin', function (e) {
        if ($(e.target).closest(".tox-dialog").length) {
            e.stopImmediatePropagation();
        }
    });
    getPosts();
});

var table;

// Get all posts at initialization in DataTable
function getPosts() {
    table = $("#data-table").DataTable({
        "ajax": {
            "url": "api/getPosts.php",
            "dataSrc": ""
        },
        "columns": [{
                "data": "post_title",
                "width": 350
            },
            {
                "data": "timestamp",
                "width": 300
            },
            {
                "data": null,
                "render": function (data) {
                    var editBtn = "<button class='btn btn-info mr-2 btn-edit' onclick='getPostInfo(" + data.id + ")'>Edit</button>";
                    var deleteBtn = "<button class='btn btn-danger' onclick='deletePost(" + data.id + ")'>Delete</button>";
                    return editBtn + deleteBtn;
                }
            }
        ],
        "rowId": "id"
    })
}

// On form submit
$("#newPostForm").submit(function (e) {
    e.preventDefault();
    tinymce.triggerSave();

    var subBtn = $(":submit", this);
    // Create new post
    if (subBtn.html() == "Create") {
        var data = $(this).serialize();
        var title = $("#post-title", this).val();
        var kebabCaseTitle = toKebabCase(title);
        var serializedData = data + "&post_permalink=" + kebabCaseTitle;
        $.post("api/createPost.php", serializedData, function (data) {
            table.ajax.reload();
            console.log(data);
        });
    }
    // Update post
    else if (subBtn.html() == "Update") {
        var data = $(this).serialize();
        var title = $("#post-title", this).val();
        var kebabCaseTitle = toKebabCase(title);
        var serializedData = data + "&post_permalink=" + kebabCaseTitle;
        $.post("api/update/updatePost.php", serializedData, function (data) {
            table.ajax.reload();
            console.log(data);
        });
        subBtn.html("Create");
    }
    $("#newPostModal").modal("hide");
    $("#newPostForm")[0].reset();
});

// Get post items to the modal
function getPostInfo(id) {
    $.post("api/update/getPostInfo.php", {
        id: id
    }, function (json) {
        var data = JSON.parse(json);
        $("#post-id").val(data.id);
        $("#post-title").val(data.post_title);
        $("#post-desc").val(data.post_desc);
        tinymce.get('post-content').getBody().innerHTML = data.post_content;
        $("#newPostForm :submit").html("Update");
        $("#newPostModal").modal("show");
    })
}


// Delete post
function deletePost(id) {
    $.post("api/deletePost.php", {
        id: id
    }, function (data) {
        table.ajax.reload();
    });
}

///// UTILITIES / EXTRA FUNCTIONALITY **********************

// submit button html change UPDATE to CREATE
$("#closeBtn").on("click", function () {
    $("#newPostForm")[0].reset();
    $("#newPostForm :submit").html("Create");
});

// Chracters count for post description
$("#post-desc").keyup(function (e) {
    var max = 400;
    var len = $(this).val().length;
    if (len > max) {
        e.preventDefault();
        this.value = this.value.substring(0, max);
        // $('.post-desc-char').text(' you have reached the limit');
    } else {
        var char = max - len;
        $('.post-desc-char').text(char + ' characters left');
    }
});

// Chracters count for post title
$("#post-title").keyup(function (e) {
    var max = 150;
    var len = $(this).val().length;
    if (len > max) {
        e.preventDefault();
        this.value = this.value.substring(0, max);
        // $('.post-desc-char').text(' you have reached the limit');
    } else {
        var char = max - len;
        $('.post-title-char').text(char + ' characters left');
    }
});

// Sring to kebab-case function
function toKebabCase(str) {
    return str && str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
}