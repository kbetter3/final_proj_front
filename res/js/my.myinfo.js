function my_myinfo_load() {
    my_myinfo_loaddata();
}

function my_myinfo_loaddata() {
    $.ajax({
        type: "post",
        url: "member/myinfo",
        success: my_myinfo_success_loaddata
    });
}

function my_myinfo_success_loaddata(jobj) {
    if (jobj.state == RespState.data) {
        var member = jobj.member;

        $("#my-myinfo-id").text(member.id);
        $("#my-myinfo-email").text(member.email);
        $("#my-myinfo-power").text(member.power);

        if (member.power == 1) {
            $("#my-myinfo-uploader").show();
            $("#my-myinfo-uploader").on("click", my_myinfo_getpower);
        } else {
            $("#my-myinfo-uploader").hide();
        }

        $("#my-myinfo-regdate").text(member.regdate);
        $("#my-myinfo-voucher").text(member.voucher);
        $("#my-myinfo-downcount").text(member.downcount);
    }
}

function my_myinfo_getpower() {
    $.ajax({
        type: "post",
        url: "member/getpower",
        success: my_myinfo_loaddata
    });
}
