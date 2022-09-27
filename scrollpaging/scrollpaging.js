var offsetCnt = 0;
var page = 1;
var scroll_active = true;

// 현재 페이지 값에 해당되는 데이터 배열을 받아와 html 형식에 맞춰 출력
function getDataFunction() {
    var params = {
        'page': page
    };

    $.ajax({
        type: "POST",
        data: params,
        dataType: "json",
        url: "/get_data_process",
        success: function (result) {
            // 가져온 데이터로 html 생성
            createTagHtml(result);
        },
        error: function (request, status, error) {
            // 에러 출력
            console.error("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error + "\n" + "request:" + request);
        },
        beforeSend: function () {
            scroll_active = false;
            $('html').css("cursor", "wait");
        },
        complete: function () {
            $('html').css("cursor", "auto");
        }
    });
}

function createTagHtml(result) {
    var data_list = result.data_list;

    if (data_list.length > 0) {
        // 가져온 데이터를 html 형식에 맞춰 append를 이용해 페이지에 추가해준다.
        var html = '';
        // 데이터가 있을 경우
        data_list.forEach((data) => {
            html += `<div>${data}</div>`;
        });
        offsetCnt += data_list.length;

        if (result.totalEntries <= offsetCnt) {
            scroll_active = false;
        } else {
            scroll_active = true;
        }
        $('.tag').append(html);
    } else {
        // 데이터가 없을 경우
        scroll_active = false;
        $('.no_data').show();
        $('.tag').hide();
    }
}


window.onpageshow = function (event) {
    // 페이지 이동 감지 시 스크롤 페이징 데이터 저장
    $(window).on('beforeunload', function () {
        history.replaceState({
            scrollList: $('.tag').html(),
            scroll_active: scroll_active,
            page: page
        }, null);
        $.cookie("scroll_position", $(window).scrollTop(), 1);
    });

    // 스크롤 이벤트를 감지하여 스크롤이 최하단에 도달했을 경우 조건에 따라 데이터 가져오는 함수 실행
    var tag = document.getElementsByClassName('tag')[0];
    tag.addEventListener('scroll', (function () {
        var scrollTop = tag.pageYOffset || tag.scrollTop;

        if (scroll_active && scrollTop != 0) {
            var scroll = scrollTop + tag.offsetHeight; // 최하단에 도달하기 전에 데이터를 불러오려면 +200 (div 크기에 따라 적절하게 +값 조정  ** +값이 너무 크면 한 번에 같은 데이터를 여러 번 가져오게 될 수 있고 데이터를 계속 가져오는 오류가 발생할 수 있음 **)
            var height = tag.scrollHeight;
            if (scroll >= height) {
                page++;
                getDataFunction();
                scroll_active = false;
            }
        }
    }));

    if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
        // 페이지 로드 시 뒤로가기 이벤트 감지하여 이전 데이터 출력 & 스크롤 이동
        var data = history.state;

        if (data) {
            data.scrolllist = data.scrolllist.replace(/undefined/gi, "");
            $('.tag').html(data.scrolllist);
            var scrollPosition = $.cookie("scroll_position");
            if (scrollPosition != "" && scrollPosition != undefined) {
                $('.tag').scrollTop(scrollPosition);
            }
            scroll_active = data.scroll_active;
            page = data.page;
        }
    } else {
        // 뒤로가기 이벤트로 인한 페이지 로드가 아닐 시 데이터 가져오는 함수 실행
        getDataFunction();
    }
}