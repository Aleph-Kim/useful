// 기본 ajax 함수
function 함수이름() {
    var Params = {};
    $.ajax({
        url: "/url",
        type: 'POST',
        data: Params,
        dataType: 'json',
        // ajax 통신 성공 시
        success: function (result) {
            switch (result.status) {
                case 'complete':
                    console.log('성공 시');
                    break;
                case 'fail':
                    console.log('실패 시');
                    break;
                default:
                    console.log('예외 발생 시');
                    break;
            }
        },
        // ajax 통신 중 에러 발생 시
        error: function (request, status, error) {
            // 에러 출력
            console.error("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error + "\n" + "request:" + request);
        },
        // ajax 통신 시작 시 
        beforeSend: function () {
            // 마우스 커서 로딩중으로 변경
            $('html').css("cursor", "wait");
            // ajax 함수 실행 버튼 클릭 이벤트 차단
            $('button').attr('onclick', 'retrun false;');
        },
        // ajax 통신 종료 시 
        complete: function () {
            // 마우스 커서 기본값으로 변경
            $('html').css("cursor", "auto");
            // ajax 함수 실행 버튼 클릭 이벤트 차단 해제
            $('button').attr('onclick', '함수이름()');
        }
    });
}