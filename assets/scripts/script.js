//load placeholder images
$(document).ready(function () {
    // create temp grid  
    var $cont = $("<div>");
    $cont.addClass("container-fluid")
    var $row = $("<div>");
    $row.addClass("row grid-row-drag")
    for (var i = 0; i < 24; i++) {

        $row.append(`<div class="col-4 img-grid-box"><div class="img-grid" style="background-image:url('./assets/img/placeholder.png');"></div></div>`);
    }
    $cont.append($row);
    $(".grid-preview").append($cont);

    // --- Story Board ---
    // create temp grid  
    var $scont = $("<div>");
    $scont.addClass("container-fluid")
    var $srow = $("<div>");
    $srow.addClass("row grid-row-drag")
    for (var i = 0; i < 24; i++) {
        $srow.append(`<div class="col-4 img-story-box"><div class="img-story" style="background-image:url('./assets/img/placeholder.png');"></div></div>`);
    }
    $scont.append($srow);
    $(".story-preview").append($scont);
    //$(".grid-srow-drag").dad({
    //    exchangeable: true,
    //    placeholderTemplate: "<div style=\"border: 1px solid rgb(160, 160, 160 );\"></div>"
    //});

})

$(document).click(function (event) {
    if (event.target.className === "img-grid") {
        console.log("img-grids")
    }

})
// Check if user pressed enter in login
$(".login-username").on("keyup", function (e) {
    if (e.key == "Enter" && e.target.value !== "") {
        $('#loginModal').modal("hide")
        loadUser(e.target.value);
    }
})
// checks if user presses submit on login
$(".login-submit").on("click", function () {
    if ($(".login-username").val() !== "") {
        loadUser($(".login-username").val());
    }
});

//





$(".save").on("click", function () {
    localStorage.setItem("userLayout", $(".grid-container")[0].innerHTML);
    console.log($(".grid-container")[0].innerHTML)
})

$(".load").on("click", function () {
    $(".grid-container").html(localStorage.getItem("userLayout"));
    $(".grid-row-drag").dad({
        exchangeable: false
    });
})


function loadUser(username) {
    var url = `https://www.instagram.com/${username}/?__a=1`;
    $.ajax({
        url: url,
        success: function (data) {
            console.log(data);
            // clear grid
            $(".grid-preview").html("");

            // create temp grid  
            var $cont = $("<div>");
            $cont.addClass("container-fluid")
            var $row = $("<div>");
            $row.addClass("row grid-row-drag")
            for (var i = 0; i < data.graphql.user.edge_owner_to_timeline_media.edges.length; i++) {

                $row.append(`<div class="col-4 img-grid-box no-drag item"><div class="img-grid" style="background-image:url('${data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url}');"></div></div>`);
            }
            $cont.append($row);
            $(".grid-preview").append($cont);

            // --- Story Board ---
            // create temp grid  
            $(".story-preview").html("");
            var $scont = $("<div>");
            $scont.addClass("container-fluid")
            var $srow = $("<div>");
            $srow.addClass("row grid-row-drag")
            for (var i = 0; i < 24; i++) {
                $srow.append(`<div class="col-4 img-story-box"><div class="img-story" style="background-image:url('./assets/img/placeholder.png');"></div></div>`);
            }
            $scont.append($srow);
            $(".story-preview").append($scont);

            //user info
            $(".user-name").html(data.graphql.user.username);
            $(".user-fullname").html(data.graphql.user.full_name);
            $(".user-description").html(data.graphql.user.biography);
            $(".user-avatar").attr("src", data.graphql.user.profile_pic_url)
            $(".user-followers").html(data.graphql.user.edge_followed_by.count.toLocaleString());
            $(".user-following").html(data.graphql.user.edge_follow.count.toLocaleString());

            var mainDAD = $(".grid-row-drag").dad({
                active: true,
                placeholderTemplate: "<div style=\"border: 1px solid rgb(160, 160, 160);opacity:30%;\"></div>"
            });

            $("#myBtn").on("click", function () {
                if ($("#myBtn").attr("toggle") === "OFF") {
                    mainDAD.activate();
                    $("#myBtn").attr("toggle", "ON");
                    $(".grid-btn-img").attr("src", "./assets/img/th-solid.png");

                    console.log("on");
                } else if ($("#myBtn").attr("toggle") === "ON") {
                    mainDAD.deactivate();
                    $("#myBtn").attr("toggle", "OFF");
                     $(".grid-btn-img").attr("src", "./assets/img/th-lock.png");
                    console.log("off");
                }
            })

        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

