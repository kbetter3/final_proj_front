var register_idValidCheck = false;
var register_pwValidCheck = false;
var register_emailValidCheck = false;
var register_termValidCheck = false;

var register_idDupCheck = false;

function register_idCheck() {
    register_idValidationCheck();

    if (!register_idValidCheck)
        return;

    register_idDuplicationCheck();
}

function register_idValidationCheck() {
    var regex = /^[a-zA-Z0-9]{4,20}$/;
    var id_input = $("#my-register-id");
    var id = id_input.val();

    if (regex.test(id) && id.length >= 4 && id.length <= 20) {
        $("#my-register-id-info").hide();

        //console.log("ok");
        register_idValidCheck = true;
    } else {
        if (id.length === 0) {
            $("#my-register-id-info").text("").append("아이디를 입력하세요.").show();
        } else {
            $("#my-register-id-info").text("").append("아이디는 영문+숫자조합 4~20자만 가능합니다.").show();
        }

        id_input.removeClass("my-member-gray-border my-member-green-border").addClass("my-member-red-border");

        //console.log("no");
        register_idValidCheck = false;
    }
}

function register_idDuplicationCheck() {
    if (register_idValidCheck) {
        $.ajax({
            url: 'iddupcheck',
            data: {id : $("#my-register-id").val()},
            success: register_idDuplicationCheckSuccess
        });
    }
}

function register_idDuplicationCheckSuccess(data) {
    var id_input = $("#my-register-id");

    if (data.length == 0) {
        register_idDupCheck = true;
        id_input.removeClass("my-member-gray-border my-member-red-border").addClass("my-member-green-border");
        $("#my-register-id-info").text("").hide();
    } else {
        register_idDupCheck = false;
        id_input.removeClass("my-member-gray-border my-member-green-border").addClass("my-member-red-border");
        $("#my-register-id-info").text("").append("이미 사용중인 아이디입니다.").show();
    }
}

function register_resetIdValidation() {
    register_idValidCheck = false;
    register_idDupCheck = false;
    $("#my-register-id-info").text("").hide();
    $("#my-register-id").removeClass("my-member-red-border my-member-green-border").addClass("my-member-gray-border");
}

function register_pwCheck() {
    var pw_info = $("#my-register-pw-info");
    register_pwValidCheck = false;

    pw_info.text("").hide();
    $(this).removeClass("my-member-red-border my-member-green-border");

    if (register_pwLenCheck($(this))) {
        register_pwEqualCheck();
    } else {
        pw_info.text("비밀번호는 8~20자리를 사용하여야 합니다.").show();
        $(this).addClass("my-member-red-border");
    }
}

function register_pwLenCheck(pw_input) {
    var pw = pw_input.val();

    if (pw.length >= 8 && pw.length <= 20) {
        return true;
    } else {
        return false;
    }
}

function register_pwEqualCheck() {
    var pw_input = $("#my-register-pw");
    var pwchck_input = $("#my-register-pwchck");
    var pw = pw_input.val();
    var pwchck = pwchck_input.val();

    pw_input.removeClass("my-member-red-border my-member-green-border");
    pwchck_input.removeClass("my-member-red-border my-member-green-border");

    if (pw === pwchck) {
        register_pwValidCheck = true;
        pw_input.addClass("my-member-green-border");
        pwchck_input.addClass("my-member-green-border");
    } else {
        register_pwValidCheck = false;
        $("#my-register-pw-info").text("비밀번호가 일치하지 않습니다.").show();
        pw_input.addClass("my-member-red-border");
        pwchck_input.addClass("my-member-red-border");
    }
}

function register_emailCheck() {
    register_emailValidCheck = false;

    if(register_emailValidationCheck()) {
        register_emailDuplicationCheck();
    }
}

function register_emailValidationCheck() {
    var regex = /^[a-zA-Z0-9@\\.]{5,100}$/;
    var email_input = $("#my-register-email");
    var email = email_input.val();
    var email_info = $("#my-register-email-info");

    email_info.text("").hide();
    email_input.removeClass("my-member-red-border my-member-green-border");

    if (regex.test(email)) {
        return true;
    } else {
        email_input.addClass("my-member-red-border");
        email_info.text("사용할 수 없는 이메일 입니다.").show();
        return false;
    }
}

function register_emailDuplicationCheck() {
    $.ajax({
        url: 'emaildupcheck',
        data: {email : $("#my-register-email").val()},
        success: register_emailDuplicationCheckSuccess
    });
}

function register_emailDuplicationCheckSuccess(data) {
    var email_input = $("#my-register-email");

    if (data) {
        email_input.addClass("my-member-red-border");
        $("#my-register-email-info").text("이미 사용중인 이메일 입니다.").show();
        register_emailValidCheck = false;
    } else {
        email_input.addClass("my-member-green-border");
        register_emailValidCheck = true;
    }
}

function register_resetEmailValidation() {
	register_emailValidCheck = false;
	$("#my-register-email").removeClass("my-member-green-border");
}

function register_termCheck() {
    var terms = $(".my-register-term-checkbox");

    register_termValidCheck = false;
    register_termAgreementInfoHide();

    for (var i = 0; i < terms.length; i++) {
        if (!terms.eq(i).prop("checked")) {
            $("#my-register-term-all").prop("checked", false);
            return;
        }
    }

    $("#my-register-term-all").prop("checked", true);
}

function register_termAllCheck() {
    $(".my-register-term-checkbox").prop("checked", $(this).prop("checked"));
    register_termAgreementInfoHide();
}

function register_termAgreementCheck() {
    var required_term = $(".my-register-term-required");

    for (var i = 0; i < required_term.length; i++) {
        if (!required_term.eq(i).prop("checked")) {
            $("#my-register-term-info").show();
            register_termValidCheck = false;
            return;
        }
    }

    $("#my-register-term-info").hide();
    register_termValidCheck = true;
}

function register_termAgreementInfoHide() {
	var required_term = $(".my-register-term-required");
	var hideInfo = true;

	for (var i = 0; i < required_term.length; i++) {
		if (!required_term.eq(i).prop("checked")) {
			hideInfo = false;
			break;
		}
	}

	if (hideInfo) {
		$("#my-register-term-info").hide();
		register_termValidCheck = true;
	}
}

function register_doRegister() {
    var submit = true;

    if (!register_idDupCheck || !register_idValidCheck) {
        $("#my-register-id").addClass("my-member-red-border");
        submit = false;
    }

    if (!register_pwValidCheck) {
        $("input[type=password]").addClass("my-member-red-border");
        submit = false;
    }

    if (!register_emailValidCheck) {
        $("#my-register-email").addClass("my-member-red-border");
        submit = false;
    }

    register_termAgreementCheck();
    if (!register_termValidCheck) {
        submit = false;
    }

    if (submit) {
//    	register_encpw();
//        $("#register-form").submit();
        $(".my-register-dim").show();
        $.ajax({
            type: "POST",
            url: "register",
            data: {
                id: $("#my-register-id").val(),
                pw: register_encpw(),
                email: $("#my-register-email").val()
            },
            success: my_register_success_doRegister,
            error: function() {
                consoe.log("실패했음");
            }
        });
    }
}

function my_register_success_doRegister(jobj) {
    my_header_home();
}

function register_clipTerm() {
    var term_content = $(this).parent().next(".my-register-term-content");

    if ($(this).hasClass("glyphicon-chevron-down")) {
        $(this).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        term_content.show();
    } else {
        $(this).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        term_content.hide();
    }
}

function register_encpw() {
    var pw = $("#my-register-pw");
    var encpw = SHA256(pw.val());
    pw.val(encpw);
    //console.log(encpw);
    $("#my-register-pwchck").val("");
    return encpw;
}
