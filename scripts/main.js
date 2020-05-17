$(document).ready(function () {
  ///// SAMMY ROUTING FUNCTIONALITY
  var app = Sammy("#main", function () {
    console.log(this);
    this.use(Sammy.EJS);
    this.get("#/", function (context) {
      context.app.swap("");
      $.get(
        "api/getData.php",
        function (items) {
          $.each(items, function (i, item) {
            context
              .render("pages/home.ejs", {
                post: item,
              })
              .appendTo(context.$element());
          });
        },
        "json"
      );
      // console.log(context);
    });
    this.get("#/posts/:permalink", function (context) {
      context.app.swap("");
      var permalink = context.params.permalink;
      $.post(
        "api/getPost.php",
        {
          post_permalink: permalink,
        },
        function (item) {
          context
            .render("pages/fullPost.ejs", {
              post: item,
            })
            .appendTo(context.$element())
            .then(function () {
              var imgs = $(".post__article-body img").get();
              for (var i in imgs) {
                var src = imgs[i].getAttribute("src");
                imgs[i].setAttribute("src", "admin/" + src);
                imgs[i].style.margin = "2rem";
              }
            });
        },
        "json"
      );
    });
    this.get("#/about", function (context) {
      context.app.swap("");
      context.partial("pages/about.ejs");
    });
    this.get("#/contact", function (context) {
      context.app.swap("");
      context.partial("pages/contact.ejs");
    });
  });
  app.run("#/");

  //// Nav Links active functionality on page reload
  var url = window.location.href;
  var m = url.match(/#\/\w+$/g);
  if (m == "#/about") {
    closeActive();
    $(".navigation li").eq(1).addClass("active");
  } else if (m == "#/contact") {
    closeActive();
    $(".navigation li").eq(2).addClass("active");
  } else if (url.match(/#\/$/g) == "#/") {
    closeActive();
    $(".navigation li").eq(0).addClass("active");
  } else {
    closeActive();
  }
});

//// Nav Link active functionality on click
function closeActive() {
  $(".navigation li").removeClass("active");
}

$(".navigation li").click(function () {
  closeActive();
  $(this).addClass("active");
});

//// kebab-case-function
function toKebabCase(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join("-")
  );
}
