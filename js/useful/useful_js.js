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