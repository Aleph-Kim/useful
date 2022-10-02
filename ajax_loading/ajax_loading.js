function lodingSign() {
    // 로딩 이미지 div
    var loadingImg = `<div id='loadingImg'>
                        <img src='loding.gif' style='width: 40px; position: relative; display: block; margin: 0px auto;'/>
                    </div>`;

    $('body').append(loadingImg);
    // 마우스 커서 로딩 중으로 변경
    $('html').css("cursor", "wait");
    // ajax 함수 실행 버튼 클릭 이벤트 차단
    $('button').attr('onclick', 'return false;');
}

// 기본 ajax 함수
function 함수이름() {
    // 로딩 이미지 출력
    lodingImgShow();
    var Params = {};
    $.ajax({
        url: "/url",
        type: 'POST',
        data: Params,
        datatype: 'json',
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
        // ajax 통신 종료 시 
        complete: function () {
            // 로딩 이미지 종료
            lodingImgHide();
        }
    });
}

function lodingImgHide() {
    // 마우스 커서 기본값으로 변경
    $('html').css("cursor", "auto");
    // ajax 함수 실행 버튼 클릭 이벤트 차단 해제
    $('button').attr('onclick', '함수이름()');
    // 로딩 이미지 삭제
    $('#loadingImg').remove();
}