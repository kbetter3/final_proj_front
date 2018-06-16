function my_menu_menu() {
    $.ajax({
        type: "POST",
        url: "menu",
        success: my_menu_success_menu
    });
}

function my_menu_success_menu(jobj) {
    $("#my-menu-container").html("").append(jobj.tags);
}

function my_menu_chart() {
    my_submenu_chartsubmenu();
    my_chart_chart();
}

function my_menu_lastest() {

}

function my_menu_genre() {

}

function my_menu_mymenu() {

}

function my_menu_notice() {

}
