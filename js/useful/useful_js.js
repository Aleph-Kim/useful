// 체크박스 체크 여부 확인
$('input:checkbox[id="아이디"]').is(":checked")
// 체크박스 체크 처리
$('input:checkbox[id="아이디"]').prop("checked", true);
// 라디오 타입 인풋 체크 되어있는 값 가져오기
$('input[name=radioName]:checked').val();

// 해당 클래스를 가지고 있는지
$("#아이디").prop(".클래스");

// 태그의 요소로 값 가져오기 (예시 : data)
$('[data-데이터셋이름="값"]')

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

// 새로고침 시 스크롤 최상단으로 이동
history.scrollRestoration = "manual"

// 페이지 로드 시  함수 실행
document.addEventListener("DOMContentLoaded", function () {
    함수();
});

// js 한 줄 코드 정렬 사이트 https://beautifier.io/