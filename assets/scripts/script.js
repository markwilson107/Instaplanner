//load placeholder images
$(document).ready(function () {
    // create temp grid  
    var $cont = $("<div>");
    $cont.addClass("container-fluid")
    var $row = $("<div>");
    $row.addClass("row grid-row")
    for (var i = 0; i < 12; i++) {

        $row.append(`<div class="col-4 img-grid-box"><div class="img-grid" style="background-image:url('./assets/img/placeholder.png');"></div></div>`);
    }
    $cont.append($row);
    $(".grid-container").append($cont);
})

$(".dad-example").dad({
    exchangeable: false,
    placeholderTarget: ".item"
});

$(".login").on("click", function () {
    loadUser("tina.cohen")
})

$(".save").on("click", function () {
    localStorage.setItem("userLayout", $(".grid-container")[0].innerHTML);
    console.log($(".grid-container")[0].innerHTML)
})

$(".load").on("click", function () {
    $(".grid-container").html(localStorage.getItem("userLayout"));
    $(".grid-row").dad({
        exchangeable: false,
        placeholderTarget: ".item"
    });
})


function loadUser(username) {
    var url = `https://www.instagram.com/${username}/?__a=1`;
    $.ajax({
        url: url,
        success: function (data) {
            console.log(data);
            // clear grid
            $(".grid-container").html("");
            // create temp grid
            $cont = $("<div>");
            $cont.addClass("container-fluid")
            $row = $("<div>");
            $row.addClass("row grid-row")
            for (var i = 0; i < data.graphql.user.edge_owner_to_timeline_media.edges.length; i++) {

                $row.append(`<div class="col-4 img-grid-box"><div class="img-grid" style="background-image:url('${data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url}');"></div></div>`);
            }
            $cont.append($row);

            $row = $("<div>");
            $row.addClass("row grid-row area")
            $row.dad({
                exchangeable: false,
                placeholderTarget: ".item"
            });
            for (var i = 0; i < 3; i++) {

                $row.append(`<div class="col-4 img-grid-box"><div class="item img-grid" style="background-image:url('./assets/img/placeholder.png');"></div></div>`);
            }
            $cont.prepend($row);
            $(".grid-container").append($cont);
            $(".user-name").html(data.graphql.user.username);
            $(".user-fullname").html(data.graphql.user.full_name);
            $(".user-description").html(data.graphql.user.biography);
            $(".user-avatar").attr("src", data.graphql.user.profile_pic_url)
            $(".user-followers").html(data.graphql.user.edge_followed_by.count.toLocaleString());
            $(".user-following").html(data.graphql.user.edge_follow.count.toLocaleString());
            //images

        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}