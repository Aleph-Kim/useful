// 휴대전화번호
var cell_phone_reg = /^(\d{2,3})(\d{3,4})(\d{4})$/;

/**
 * 전화번호 자동 하이픈 변환
 * @param {*} phone 전화번호
 * @returns 하이픈이 추가된 전화번호
 */
 function phoneNumberFormat(phone) {
    return phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 일반번호
var phone_reg = /^\d{2,3}\d{3,4}\d{4}$/;

// 인터넷번호
var internet_phone_reg = /^\d{4}\d{4}$/;

// 이메일
var email_reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// url
var url_reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

// 숫자
var num_reg = /[^0-9]/;

// 년-월-일 (YYYY-mm-dd)
var date_reg = /(\d{4})(\d{2})(\d{2})/;


// 소수점 제한 함수
var prev_demical_input = "";
function demicalLimit() {
    // {0,3} = 소수점 3자리 제한
    var regexp = /^(0|[1-9]\d*)(\.\d{0,3})?$/;

    var input = $(this).val().replace(/,/gi, "");

    if (input == '') {
        input = "";
        $(this).val("");
        return false;
    }

    if (input.search(regexp) == -1) {
        input = prev_demical_input;
        $(this).val(input);
    } else {
        prev_demical_input = input;
        $(this).val(prev_demical_input);
    }
}

$('#input').on('keyup', demicalLimit);