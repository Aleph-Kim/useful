var paging_data_obj;

/**
 * 스크롤페이징에 필요한 데이터 / 함수 객체를 생성하는 클래스
 */
class PagingObj {
    /**
     * @param {*} name 페이징 이름
     * @param {*} scroll_tag 스크롤 이벤트 발생 태그
     * @param {*} html_tag html을 추가할 태그
     */
    constructor(name, scroll_tag, html_tag) {
        this.name = name;
        this.offsetCnt = 0;
        this.page = 1;
        this.scroll_active = true;
        this.scrollTop = 0;
        this.scroll_tag = scroll_tag;
        this.html_tag = html_tag;
        this.scroll_event = (this.scroll_tag == window ? function () {
            if ($(window).scrollTop() != 0) {
                var scroll = $(window).scrollTop() + $(window).innerHeight();
                var height = $('body').prop('scrollHeight');

                checkBottomScroll.call(this, scroll, height);
            }
        } : function () {
            this.scrollTop = this.scroll_tag.pageYOffset || this.scroll_tag.scrollTop;

            if (this.scrollTop != 0) {
                var scroll = this.scrollTop + this.scroll_tag.offsetHeight;
                var height = this.scroll_tag.scrollHeight;

                checkBottomScroll.call(this, scroll, height);
            }
        });
    }

    /**
     * 스크롤 이벤트를 감지하여 스크롤이 최하단에 도달했을 경우 조건에 따라 데이터 가져오는 함수 실행
     */
    scrollEvent = () => {
        if (this.scroll_active) {
            this.scroll_event();
        }
    };

    /**
     * 스크롤 이벤트 감지 시작
     */
    scrollEventDetectStart() {
        this.scroll_tag.addEventListener('scroll', this.scrollEvent);
    }

    /**
     * 스크롤 이벤트 감지 종료
     */
    scrollEventDetectEnd() {
        this.scroll_tag.removeEventListener('scroll', this.scrollEvent);
    }

    /**
     * 뒤로가기로 인한 페이지 접근 시 스크롤페이징 데이터 복구
     * @param {*} data history.state
     */
    loadPrevPage(data) {
        eval(`data.${this.name}_scrollList = \`${data.scrollList.replace(/undefined/gi, "")}\``);
        this.html_tag.html(data.scrollList);
        var scrollPosition = $.cookie(`${this.name}_scroll_position`);
        if (scrollPosition != "" && scrollPosition != undefined) {
            this.scroll_tag.scrollTop = scrollPosition;
        }
        this.scroll_active = data.scroll_active;
        this.offsetCnt = data.offsetCnt;
        this.page = data.page;
    }
}

/**
 * 현재 스크롤 위치가 최하단인지 체크하는 함수
 * @param {*} scroll 현재 스크롤 위치
 * @param {*} height 높이값
 */
function checkBottomScroll(scroll, height) {
    if (scroll >= height) {
        this.scroll_active = false;
        this.page++;
        getDataFunction(this.name);
    }
}

/**
 * 스크롤 페이징 데이터를 가져오는 함수
 * @param {*} name 페이징 이름
 */
function getDataFunction(name) {
    var params = {
        name: name,
        page: paging_data_obj[name].page
    };

    $.ajax({
        type: "POST",
        data: params,
        dataType: "json",
        url: "/get_data_process",
        success: function (result) {
            // 가져온 데이터로 html 생성
            createTagHtml(result, name);
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

/**
 * 비동기 통신으로 가져온 데이터로 html 생성
 * @param {*} result 데이터
 * @param {*} name 페이징 이름
 */
function createTagHtml(result, name) {
    var data_list = result.data_list;

    if (data_list.length > 0) {
        var html = '';
        data_list.forEach((data) => {
            html += eval(`create_${name}_html(data)`);
        });
        paging_data_obj[name].offsetCnt += data_list.length;

        if (result.totalEntries <= paging_data_obj[name].offsetCnt) {
            paging_data_obj[name].scroll_active = false;
        } else {
            paging_data_obj[name].scroll_active = true;
        }
    } else {
        paging_data_obj[name].scrollEventDetectEnd();
        paging_data_obj[name].scroll_active = false;
        html = `<div class="common_no_data">
                    <p>데이터가 없습니다.</p>
                </div>`;
    }
    paging_data_obj[name].html_tag.append(html);
}

/**
 * 각 태그에 맞는 html 형식에 데이터를 삽입하여 반환
 * @param {*} data 데이터
 * @returns 데이터를 삽입한 html
 */
function create_paging1_html(data) {
    return `<div class="paging1">
                <p>${data}</p>
            </div>`;
}

function create_paging2_html(data) {
    return `<div class="paging2">
                <p>${data}</p>
            </div>`;
}

function create_paging3_html(data) {
    return `<div class="paging3">
                <p>${data}</p>
            </div>`;
}

function create_paging4_html(data) {
    return `<div class="paging4">
                <p>${data}</p>
            </div>`;
}

/**
 * 모든 스크롤 페이징 데이터를 초기화
 */
function resetScrollPaging() {
    paging_data_obj.map(data => {
        var name = data.name;

        $(`.${name}`).remove();
        paging_data_obj[name].scrollEventDetectEnd();

        paging_data_obj[name] = new PagingObj(name);
        getDataFunction(name);

        paging_data_obj[name].scrollEventDetectStart();
    });
}

/**
 * 페이지 이동 감지 시 스크롤 페이징 데이터를 저장
 */
function saveCurrentPage() {
    $(window).on('beforeunload', () => {
        var current_paging_data = {};

        for (const [key, obj] of Object.entries(paging_data_obj)) {
            current_paging_data[key] = setCurrentPageData(obj);
        }

        history.replaceState(current_paging_data, null);
    });
}

/**
 * 쿠키에 스크롤 위치를 저장하고 페이징 데이터 복구 시 필요한 데이터를 반환
 * @param {*} obj 페이징 데이터
 * @returns 페이징 데이터 복구 시 필요한 페이징 데이터 오브젝트
 */
function setCurrentPageData(obj) {
    $.cookie(`${obj.name}_scroll_position`, obj.scrollTop, 1);
    return {
        scrollList: obj.html_tag.html(),
        scroll_active: obj.scroll_active,
        offsetCnt: obj.offsetCnt,
        page: obj.page
    };
}

/**
 * 페이지 로드가 뒤로가기로 인한 접근인지 확인하는 함수
 * @param {*} event 페이지 로드 이벤트
 */
function checkBackwardsEvent(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
        var data = history.state;
        if (data) {
            for (const [key, obj] of Object.entries(paging_data_obj)) {
                obj.loadPrevPage(data[obj.name]);
                obj.scrollEventDetectStart();
            }
        }
    } else {
        for (const [key, obj] of Object.entries(paging_data_obj)) {
            getDataFunction(obj.name);
            obj.scrollEventDetectStart();
        }
    }
}