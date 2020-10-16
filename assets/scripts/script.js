//load placeholder images
$(document).ready(function () {
    // preview navbar
    var $pnav = $("<nav>");
    $pnav.addClass("navbar navbar-expand-lg navbar-light border-bottom border-left border-right preview-nav")
    var $navBrand = $("<a>");
    $navBrand.addClass("navbar-brand preview-title");
    $navBrand.text("Preview");
    $pnav.append($navBrand);

    $(".grid-container").append($pnav);
    // create temp grid  
    var $cont = $("<div>");
    $cont.addClass("container-fluid")
    //var $navbtn = $("<button>");
    //$navbtn.text("button");
    //$pnav.append($navbtn);
    var $row = $("<div>");
    $row.addClass("row grid-row-drag")
    for (var i = 0; i < 24; i++) {

        $row.append(`<div class="col-4 img-grid-box"><div class="img-grid" style="background-image:url('./assets/img/placeholder.png');"></div></div>`);
    }
    $cont.append($row);
    $(".grid-container").append($cont);


    // --- Story Board ---
    // create temp grid  
    var $scont = $("<div>");
    $scont.addClass("container-fluid")
    //var $navbtn = $("<button>");
    //$navbtn.text("button");
    //$pnav.append($navbtn);
    var $srow = $("<div>");
    $srow.addClass("row grid-row-drag")
    for (var i = 0; i < 24; i++) {

        $srow.append(`<div class="col-4 img-story-box"><div class="img-story" style="background-image:url('./assets/img/placeholder.png');"></div></div>`);
    }
    $scont.append($srow);
    $storyCard = $(`<div>`);
    $storyCard.addClass(`card`);
    $storyCardBody = $(`<div>`);
    $storyCardBody.addClass(`card-body`);
    $storyCardBody.append($scont);
    $storyCard.append($storyCardBody);
    $(".story-container").html("<h3 class='story-title'>Storyboard</h3>")
    $(".story-container").append($storyCard);
    //$(".grid-srow-drag").dad({
    //    exchangeable: true,
    //    placeholderTemplate: "<div style=\"border: 1px solid rgb(160, 160, 160 );\"></div>"
    //});


})

$(document).click( function (event) {
    if (event.target.className === "img-grid") {
      console.log("img-grids")
    }

})

$(".login").on("click", function () {
    loadUser("tina.cohen")
})

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
            $(".grid-container").html("");
            
            // create temp grid
            // preview navbar
            var $pnav = $("<nav>");
            $pnav.addClass("navbar navbar-expand-lg navbar-light border-bottom border-left border-right preview-nav")
            var $navBrand = $("<a>");
            $navBrand.addClass("navbar-brand preview-title");
            $navBrand.text("Preview");
            $pnav.append($navBrand);

            $(".grid-container").append($pnav);
            // create temp grid  
            var $cont = $("<div>");
            $cont.addClass("container-fluid")
            //var $navbtn = $("<button>");
            //$navbtn.text("button");
            //$pnav.append($navbtn);
            var $row = $("<div>");
            $row.addClass("row grid-row-drag")
            for (var i = 0; i < data.graphql.user.edge_owner_to_timeline_media.edges.length; i++) {

                $row.append(`<div class="col-4 img-grid-box no-drag item"><div class="img-grid" style="background-image:url('${data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url}');"></div></div>`);
            }
            $cont.append($row);
            $(".grid-container").append($cont);
            
            //user info
            $(".user-name").html(data.graphql.user.username);
            $(".user-fullname").html(data.graphql.user.full_name);
            $(".user-description").html(data.graphql.user.biography);
            $(".user-avatar").attr("src", data.graphql.user.profile_pic_url)
            $(".user-followers").html(data.graphql.user.edge_followed_by.count.toLocaleString());
            $(".user-following").html(data.graphql.user.edge_follow.count.toLocaleString());
            
            $(".grid-row-drag").dad({
                placeholderTemplate: "<div style=\"border: 1px solid rgb(160, 160, 160);opacity:30%;\"></div>"
            });

        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

