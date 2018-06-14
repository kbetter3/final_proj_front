function my_header_home() {
    $.ajax({
        url: 'ws://localhost:8080/final_proj/test',
        success: my_header_success_home
    });
}

function my_header_success_home(json) {
//    var jobj = $.parseJSON(json);
    console.log(json.data);
}

function my_header_voucher() {

}

function my_header_login() {
    $("#my-header-right-container").html($("<div class='my-header-logout'>logout</div>").on("click", my_header_logout));
}

function my_header_register() {

}

function my_header_logout() {
    console.log("kk");
}
