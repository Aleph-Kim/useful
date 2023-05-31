/**
 * 쿠키 저장 함수 
 * @param {string} name - 쿠키 이름
 * @param value - 쿠키 값
 * @param exdays - 쿠키 저장 기간
 */
function setCookie(name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" +
        exdate.toGMTString());
    document.cookie = name + "=" + cookieValue;
}

/**
 * 쿠키 삭제 함수 
 * @param {string} name - 쿠키 이름
 */
function deleteCookie(name) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = name + "= " + "; expires=" + expireDate.toGMTString();
}

/**
 * 쿠키를 가져오는 함수 
 * @param {string} name - 쿠키 이름
 * @return y - 쿠키 값
 */
function getCookie(name) {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 공백 제거

        if (x == name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}

$(document).ready(function () {
    // 저장된 아이디 가져오기
    var user_id = getCookie("user_id");

    if (user_id) {
        $("#save_checkbox").prop("checked", true);
        $("#id_input").val(user_id);
    } else {
        $("#save_checkbox").prop("checked", false);
    }

    // 로그인 시 아이디 저장 체크 여부에 따라 쿠키 저장/삭제
    $('#login_form').submit(function (event) {
        event.preventDefault();

        if ($("#save_checkbox").is(":checked")) {
            // 쿠키 보관일
            var save_days = 7;
            var user_id = $("#id_input").val();

            setCookie("user_id", user_id, save_days);
        } else {
            deleteCookie("user_id");
        }

        $(this).unbind('submit');
        $(this).submit();
    });
});