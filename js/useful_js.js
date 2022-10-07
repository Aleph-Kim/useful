// 체크박스 체크 여부 확인
$('input:checkbox[id="아이디"]').is(":checked")
// 체크박스 체크 처리
$('input:checkbox[id="아이디"]').prop("checked", true);
// 라디오 타입 인풋 체크 되어있는 값 가져오기
$('input[name=radioName]:checked').val();

// 오브젝트 foreach
for (const [key, value] of Object.entries(오브젝트)) {
    console.log()
}

// 해당 클래스를 가지고 있는지
$("#아이디").prop(".클래스");

// 태그의 요소로 값 가져오기 (예시 : data)
$('[data-데이터셋이름="값"]')

// YYYY-mm-dd 형식 출력
시간 = 시간.substring(0, 10);

// date type 변수 문자열 변환
시간 = 시간.toISOString();

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

// 오브젝트 값이 비어있는지 확인
Object.entries(오브젝트).length === 0

// 배열에서 특정 값 삭제
arr = arr.filter(item => item !== value);

// url 변경 (뒤로 가기 시 기존 url)
history.pushState('', '', '/변경할url');

// url 변경 (뒤로 가기 시 뒤로 가기 동작)
history.replaceState('', '', '/변경할url');

// 숫자가 아닌 문자 삭제
문자열.replace(/[^0-9]/, '');

// 숫자만 입력 가능
function keyupNumber(ths) {
    $(ths).val($(ths).val().replace(/[^0-9]/g, ''));
}

function 정규식() {
    // 휴대전화번호 정규식
    var cell_phone_reg = /^\d{3}\d{3,4}\d{4}$/;

    // 일반번호 정규식
    var phone_reg = /^\d{2,3}\d{3,4}\d{4}$/;

    // 인터넷번호 정규식
    var internet_phone_reg = /^\d{4}\d{4}$/;

    // 이메일 정규식
    var email_reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    // url 정규식
    var url_reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
}

// 숫자에 , 넣어주는 함수
function addComma(num) {
    // 문자열 검사 추가
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

// 숫자 두 자리로 만들기 예) 01, 02, 03
String(숫자).padStart(2, '0');

// 숫자 소수점 버리기
Math.trunc(숫자);

/**
 * 시간차이를 시분초 단위로 계산해주는 함수
 * @param {String} time 
 * @returns {String} 시간차이
 */
function 시간차이(time) {
    // 현재 시간 기준으로 차이 계산
    var now_time = new Date();
    var deadline = new Date(time);

    // 시간 차이를 초 단위로 변수에 저장
    var diff_time = (deadline - now_time) / 1000;
    var diff_hour = Math.floor(diff_time / (60 * 60)).zf(2);
    var diff_minute = Math.floor((diff_time % diff_hour) / 60).zf(2);
    var diff_second = Math.floor(diff_time % 60).zf(2);

    return '시간차이 = ' + diff_hour + ':' + diff_minute + ':' + diff_second;
}

/**
 * 입력받은 시간이 얼마나 경과 되었는지 반환하는 함수
 * @param {string} time 과거 시간
 * @returns {string} 경과 시간
 */
function get_date_diff(time) {
    var now_time = new Date();
    var deadline = new Date(time);

    var diff_time = (now_time - deadline) / 1000;

    var time_list = [
        { time: "분", milli_seconds: 60 },
        { time: "시간", milli_seconds: 60 * 60 },
        { time: "일", milli_seconds: 60 * 60 * 24 },
        { time: "개월", milli_seconds: 60 * 60 * 24 * 30 },
        { time: "년", milli_seconds: 60 * 60 * 24 * 365 },
    ].reverse();

    for (var time of time_list) {
        var between_time = Math.floor(diff_time / time.milli_seconds);

        if (between_time > 0) {
            return `${between_time}${time.time} 전`;
        }
    }
    return "방금 전";
}

// js 로드 후 생성된 html이라 on 이벤트가 감지되지 않을 때 사용
$(document).on('click', '.태그', function () {
    console.log('click event');
});

// 오브젝트 키값 변수 사용
var key = 'key';
var obj = {
    [key]: 'value'
};

// 변수 값이 함수명인 함수 사용
eval(`${변수}()`);
// 예)
function 함수() {
    console.log('성공!');
}
var 변수 = '함수';
eval(`${변수}()`);


// 이름에 변수값이 포함된 변수 생성
eval(`var ${변수}이름 = 값`);
// 예)
var 변수 = '변수';
eval(`var ${변수}이름 = 값`);
console.log(변수이름);

/**
 * 문자열을 입력받은 횟수만큼 반복
 * @param {Number} len 반복 횟수
 * @returns 반복된 문자열
 */
String.prototype.string = function (len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};

/**
 * 입력받은 자리수에 부족한만큼 0을 추가한 문자열을 반환
 * @param {Number} len 자리수
 * @returns 입력받은 자리수만큼 0을 포함한 문자열
 */
String.prototype.zf = function (len) {
    return "0".string(len - this.length) + this;
};

/**
 * 정수형 숫자를 입력받은 자리수에 부족한만큼 0을 추가한 문자열로 반환
 * @param {Number} len 자리수
 * @returns {String} 입력받은 자리수만큼 0을 포함한 문자열
 */
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};

// 강제 이벤트 발생
$('.태그').trigger('click');

// 새로고침 시 스크롤 최상단으로 이동
history.scrollRestoration = "manual"

// 페이지 로드 시  함수 실행
document.addEventListener("DOMContentLoaded", function () {
    함수();
});

// js 한 줄 코드 정렬 사이트 https://beautifier.io/