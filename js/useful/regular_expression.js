// 정규식 사용 방법
정규식.test(문자열);

// 이메일
var emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// url
var urlReg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

// 숫자
var numReg = /[^0-9]/g;

// 년-월-일 (YYYY-mm-dd)
var dateReg = /(\d{4})(\d{2})(\d{2})/;

// 일반번호
var phoneReg = /^\d{2,3}\d{3,4}\d{4}$/;

// 인터넷번호
var internetPhoneReg = /^\d{4}\d{4}$/;

// 휴대전화번호
var cellPhoneReg = /^(\d{2,3})(\d{3,4})(\d{4})$/;

// 공백 제거
var 공백제거 = 공백포함.replace(/\s/g, '');

/**
 * 전화번호 자동 하이픈 변환
 * @param {*} phone 전화번호
 * @returns 하이픈이 추가된 전화번호
 */
function phoneNumberFormat(phone) {
    return phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 소수점 제한 함수
var prevDemicalInput = "";
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
        input = prevDemicalInput;
        $(this).val(input);
    } else {
        prevDemicalInput = input;
        $(this).val(prevDemicalInput);
    }
}

$('#input').on('keyup', demicalLimit);