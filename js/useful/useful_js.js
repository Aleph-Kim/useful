// 셀렉트 옵션 태그 선택자
$(`.셀렉트박스`).val('옵션값');
// 체크박스 체크 여부 확인
$('input:checkbox[id="아이디"]').is(":checked");
// 체크박스 체크 처리
$('input:checkbox[id="아이디"]').prop("checked", true);
// 라디오 타입 인풋 체크 되어있는 값 가져오기
$('input[name=radioName]:checked').val();
// 체크한 값 배열 가져오기
var check_arr = [];
$("input[name=input]:checked").each(function () {
    check_arr.push($(this).val());
});

// 해당 클래스를 가지고 있는지
$("#아이디").prop(".클래스");

// 태그의 요소로 값 가져오기 (예시 : data)
$('[data-데이터셋이름="값"]');

// 폼 전송 차단 및 검증 후 재 전송
$('#폼아이디').submit(function (event) {
    event.preventDefault();

    // 검증 코드
    // 예)
    if ($('#검증할인풋').val().length == 0) {
        alert('안내메시지');
        return false;
    }

    $(this).unbind('submit');
    $(this).submit();
});

// url 변경 (뒤로 가기 시 기존 url)
history.pushState('', '', '/변경할url');

// url 변경 (뒤로 가기 시 뒤로 가기 동작)
history.replaceState('', '', '/변경할url');

// js 로드 후 생성된 html이라 on 이벤트가 감지되지 않을 때 사용
$(document).on('click', '.태그', function () {
    console.log('click event');
});

// 변수 값이 함수명인 함수 사용
eval(`${변수}()`);

// 이름에 변수값이 포함된 변수 생성
eval(`var ${변수}이름 = 값`);

// 강제 이벤트 발생
$('.태그').trigger('click');

// js 클릭 이벤트
function eventDetectStart() {
    var tag = document.getElementsByClassName(`tag`)[0];
    tag.addEventListener('click', clickEvent); // 부여
    tag.removeEventListener('click', clickEvent); // 삭제
}

// 클릭 이벤트 1회만 실행
$('tag').on('click', function () {
    eventFunction();
    // arguments.callee 사용 시 함수에서 자신을 호출할 수 있음
    $('tag').off('click', arguments.callee);
});

/**
 * 클립보드 복사 함수
 */
function copyToClipboard() {
    // 복사할 대상을 현재 url로 선언
    var content = location.href;

    if (navigator.clipboard) { // navigator.clipboard 사용 가능 시 해당 방법으로 복사
        navigator.clipboard.writeText(content);
    } else { // 웹 표준에서 벗어난 execCommand 함수 사용
        var textArea = document.createElement("textarea");
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea)
    }
};

/**
 * form value값을 반환하는 함수
 * @param {string} formId - 폼태그 id
 * 
 * @returns {object} formValue - 폼 value
 */
function getFormValues(formId) {
    const formValue = {};
    const formElements = $(`#${formId}`).serializeArray();

    $.each(formElements, function (index, element) {
        formValue[element.name] = element.value;
    });

    return formValue;
}

/**
 * 값이 비어있는지 검사하는 함수
 * @param {*} value 검사할 값
 * @returns {boolean} 빈 값 여부
 */
function isEmpty(value) {
    return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

/**
 * 회원가입 등 페이지에서 비밀번호 입력값이 유효한 지 검증하는 함수
 * 
 * 비밀번호 규칙 - 8~20자의 영문, 숫자, 특수문자의 조합
 */
function passwordCheck() {
    var password = _.trim($('[name="password"]').val()); // 비밀번호 입력 input
    var rePassword = _.trim($('[name="re_password"]').val()); // 비밀번호 재입력 input
    var errTxtTag = $('.error_text'); // 에러 문구 출력 태그

    var regSize = /^.{8,20}$/; // 길이 제한 정규식
    var regEng = /[a-zA-Z]/; // 영어 포함 정규식
    var regNum = /\d+/; // 숫자 포함 정규식
    var regSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/; // 특수문자 포함 정규식


    if (isEmpty(password)) {
        errTxtTag.text("비밀번호를 입력해주세요.").show();
        return;
    }
    if (regSize.test(password) == false) {
        errTxtTag.text("8자 ~ 20자 이내로 입력해 주세요.").show();
        return;
    }
    if (regEng.test(password) == false) {
        errTxtTag.text("영어가 포함되지 않았습니다.").show();
        return;
    }
    if (regNum.test(password) == false) {
        errTxtTag.text("숫자가 포함되지 않았습니다.").show();
        return;
    }
    if (regSpecial.test(password) == false) {
        errTxtTag.text("특수문자가 포함되지 않았습니다.").show();
        return;
    }
    if (isEmpty(rePassword)) {
        errTxtTag.text("비밀번호를 재입력해주세요.").show();
        return;
    }
    if (password !== rePassword) {
        errTxtTag.text('비밀번호가 일치하지 않습니다.').show();
        return;
    }

    errTxtTag.hide();
    passCheckAllow = true; //  비밀번호 검증 완료 여부
}

//------------------------ CapsLock 관련 Strat ------------------------
/**
 * CapsLock이 켜져있는지 확인하는 함수
 *
 * @param {Event} e
 */
function check_capslock(e) {
    $('.capslockp').hide();
    var obj = $(':focus').attr('id');
    var s = String.fromCharCode(e.keyCode);
    if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
        window.capsLockEnabled = true;
        if ($('#capslockp_' + obj).length == 0) {
            $('#' + obj).after('<p class="capslockp text-guide" id="capslockp_' + obj + '" style="display:none; margin-top: 5px; color:red;">CapsLock이 켜져 있습니다.</p>');
        }
        $('#capslockp_' + obj).show();
    }
    else {
        window.capsLockEnabled = false;
        $('#capslockp_' + obj).hide();
    }
}
/**
 * 입력받은 태그에 이벤트 리스너를 추가하는 함수
 * 
 * @param {object} obj - 확인할 태그 Ex - $('#password')
 */
function check_capslock_form(obj) {
    obj.keypress(check_capslock);
}

check_capslock_form($('input[type=password]'));
//------------------------ CapsLock 관련 End ------------------------

// 새로고침 시 스크롤 최상단으로 이동
history.scrollRestoration = "manual";

// 폼 전송을 차단하고 해당 폼의 값을 콘솔에 출력하는 코드
const form = document.querySelector('#폼_아이디');
form.addEventListener('submit', (event) => {
    // 폼 전송을 중지합니다.
    event.preventDefault();
    console.log(new FormData(form));
});

// 페이지 로드 시  함수 실행
document.addEventListener("DOMContentLoaded", function () {
    함수();
});

// js 한 줄 코드 정렬 사이트 https://beautifier.io/