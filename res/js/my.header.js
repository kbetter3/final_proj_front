function my_header_home() {
    $.ajax({
        url: 'ws://localhost:8080/final_proj/test',
        success: my_header_success_home
    });
}

function my_header_success_home(json) {
    var jobj = $.parseJSON(json);
    console.log(jobj.data);
}
