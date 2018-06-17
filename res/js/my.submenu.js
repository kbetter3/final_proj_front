function my_submenu_submenu(target) {
    $.ajax({
        url: "submenu",
        data: {fname: target},
        success: my_submenu_success_submenu
    });
}

function my_submenu_success_submenu(jobj) {
    $("#my-submenu-container").html("").append(jobj.tags);
}


function my_submenu_getMusic() {
    console.log("my.submenu.getMusic");
}
