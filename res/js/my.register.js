var register_idValidCheck = false;
var register_pwValidCheck = false;
var register_emailValidCheck = false;

var register_idDupCheck = false;

function register_idCheck() {
    register_idValidationCheck();

    if (register_idValidCheck) {
        register_idDuplicationCheck();
        console.log("iddupchck");
    } else {
        return;
    }

    if (register_idValidCheck && register_idDupCheck) {

    }
}

function register_idValidationCheck() {
    var regex = /^[a-zA-Z0-9]{4,20}$/;
    var id_input = $("#my-register-id");
    var id = id_input.val();

    if (regex.test(id) && id.length >= 4 && id.length <= 20) {
//        id_input.removeClass("my-member-red-border").addClass("my-member-green-border");

        $("#my-register-id-info").hide();

        console.log("ok");
        register_idValidCheck = true;
    } else {
        if (id.length === 0) {
            $("#my-register-id-info").text("").append("아이디를 입력하세요.").show();
        } else {
            $("#my-register-id-info").text("").append("아이디는 영문+숫자조합 4~20자만 가능합니다.").show();
        }

        id_input.removeClass("my-member-green-border").addClass("my-member-red-border");

        console.log("no");
        register_idValidCheck = false;
    }
}

function register_idDuplicationCheck() {
    if (register_idValidCheck) {
        var cc = $.ajax({
            url: 'iddupcheck',
            data: {id : $("#my-register-id").val()},
            success: register_idDuplicationCheck
        });

        console.log(cc);
    }
}

function register_idDuplicationCheckSuccess(data) {
    if (data) {
        console.log(data);
    } else {
        console.log("data is null");
    }
}

function register_resetIdValidation() {
    register_idValidCheck = false;
    register_idDupCheck = false;
}
