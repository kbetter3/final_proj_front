function my_submenu_submenu(target) {
    $.ajax({
        url: "submenu",

    });
}

function my_submenu_chartsubmenu() {
    $.ajax({
        type: "POST",
        url: "chartsubmenu",
        success: my_submenu_success_chartsubmenu
    });
}

function my_submenu_success_chartsubmenu(jobj) {
    console.log("서브메뉴 불러오기 성공");
    $("#my-submenu-container").html("").append(jobj.tags);
}


function my_submenu_lastestsubmenu() {

}
