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
$('#폼아이디').submit(function(event) {
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

// 시간 차이 계산 (시 : 분 : 초)
function 시간차이(time) {
    // 현재 시간 기준으로 차이 계산
    var now_time = new Date();
    var deadline = new Date(time);

    // 시간 차이를 초 단위로 변수에 저장
    var diff_time = (deadline - now_time) / 1000;
    var diff_hour = String(Math.floor(diff_time / (60 * 60))).padStart(2, '0');
    var diff_minute = String(Math.floor((diff_time % diff_hour) / 60)).padStart(2, '0');
    var diff_second = String(Math.floor(diff_time % 60)).padStart(2, '0');

    return '시간차이 = ' + diff_hour + ':' + diff_minute + ':' + diff_second;
}

// js 로드 후 생성된 html이라 on 이벤트가 감지되지 않을 때 사용
$(document).on('click', '.태그', function() {});

// 오브젝트 키값 변수 사용
var key = 'key';
var obj = {
    [key]: 'value'
};

// 문자형 숫자 입력받은 숫자 자리수로 변환
String.prototype.string = function(len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function(len) {
    return "0".string(len - this.length) + this;
};

// 정수형 숫자 입력받은 숫자 자리수로 변환
Number.prototype.zf = function(len) {
    return this.toString().zf(len);
};


// 새로고침 시 스크롤 최상단으로 이동
history.scrollRestoration = "manual"

// 페이지 로드 시  함수 실행
document.addEventListener("DOMContentLoaded", function() {
    함수();
});

// js 한 줄 코드 정렬 사이트 https://beautifier.io/