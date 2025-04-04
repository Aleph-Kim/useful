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
 * 
 * comment) 클립보드 복사가 정상적으로 작동하지 않을 경우 execCommand 방식만 사용
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
    return value === null || value === undefined || value.trim() === '' || (Array.isArray(value) && value.length === 0);
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

/**
 * input max length에 도달 시 다음 input으로 넘겨주는 함수
 * 
 * @param {input} ths - 입력 인풋
 */
function maxNextTab(ths) {
    var max = ths.maxLength;
    var now = ths.value.length;

    if (now >= max) {
        $(ths).next('input').focus();
    }
}

//------------------------ CapsLock 관련 Strat ------------------------
/**
 * CapsLock이 켜져있는지 확인하는 함수
 *
 * @param {Event} e
 */
function check_capslock(e) {
    $('.capslockp').hide(); // 모든 capslock 문구 숨기기

    var obj = $(':focus').attr('name'); // 입력중인 태그의 name값
    var s = String.fromCharCode(e.keyCode); // 입력한 문자

    if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) { // 입력한 문자의 값이 대문자로 변환한 값과 같고, 소문자로 변환한 값과 다르며 쉬프트키를 사용한 입력이 아닐 경우
        if ($('#capslockp_' + obj).length == 0) {
            $(`input[name=${obj}]`).after('<p class="capslockp" id="capslockp_' + obj + '" style="color:red; margin: 5px;" hidden>CapsLock이 켜져 있습니다.</p>');
        }
        $('#capslockp_' + obj).show();
    }
    else {
        $('#capslockp_' + obj).hide();
    }
}

/**
 * 입력받은 태그에 이벤트 리스너를 추가하는 함수
 * 
 * @param {object} obj - 확인할 태그 Ex - $('#password')
 */
function check_capslock_form(obj) {
    obj.keypress(check_capslock); // 입력 이벤트 리스너 추가
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

/**
 * 접속 기기의 모바일 여부를 반환하는 함수
 * 
 * @returns {boolean} - 모바일 여부
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 한글 문자열에서 초성, 중성, 종성을 추출하는 함수
 * 
 * @param {string} str - 변환할 문자열
 * @returns {string[]} - 초성, 중성, 종성이 분리된 배열
 */
function separateKoreanCharacters(str) {
    // 유니코드 한글 시작 코드: '가'의 유니코드 값
    const HANGUL_START = 0xAC00;
    // 유니코드 한글 끝 코드: '힣'의 유니코드 값 
    const HANGUL_END = 0xD7A3;
    // 한글 중성(모음)의 개수: 'ㅏ'부터 'ㅣ'까지 총 21개
    const JUNGSUNG_COUNT = 21;
    // 한글 종성(받침)의 개수: 받침 없음 포함 총 28개
    const JONGSUNG_COUNT = 28;

    // 한글 초성 배열: 'ㄱ'부터 'ㅎ'까지 총 19개의 자음
    const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    // 한글 중성 배열: 'ㅏ'부터 'ㅣ'까지 총 21개의 모음
    const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    // 한글 종성 배열: 받침 없음('')부터 'ㅎ'까지 총 28개의 받침
    const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    // 한글 전체(자음, 모음, 완성형 한글) 매칭 패턴
    const HANGUL_PATTERN = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    // 자음만 매칭하는 패턴
    const CONSONANT_PATTERN = /[ㄱ-ㅎ]/;
    // 모음만 매칭하는 패턴
    const VOWEL_PATTERN = /[ㅏ-ㅣ]/;

    // 결과 문자열을 배열로 구성하여 join으로 최종 결합
    let result = [];

    str.replace(HANGUL_PATTERN, (char) => {
        const code = char.charCodeAt(0);

        // 완성형 한글인 경우
        if (code >= HANGUL_START && code <= HANGUL_END) {
            const normalized = code - HANGUL_START;
            const chosungIndex = Math.floor(normalized / (JUNGSUNG_COUNT * JONGSUNG_COUNT));
            const jungsungIndex = Math.floor((normalized % (JUNGSUNG_COUNT * JONGSUNG_COUNT)) / JONGSUNG_COUNT);
            const jongsungIndex = normalized % JONGSUNG_COUNT;

            result.push(
                CHOSUNG[chosungIndex],
                JUNGSUNG[jungsungIndex],
                JONGSUNG[jongsungIndex]
            );
            return;
        }

        // 자음 또는 모음만 있는 경우
        if (CONSONANT_PATTERN.test(char) || VOWEL_PATTERN.test(char)) {
            result.push(char);
            return;
        }

        // 그 외 문자
        result.push(char);
    });

    return result;
}

// 페이지 로드 시  함수 실행
document.addEventListener("DOMContentLoaded", function () {
    함수();
});

// js 한 줄 코드 정렬 사이트 https://beautifier.io/