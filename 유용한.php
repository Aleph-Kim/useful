<?php
class 유용한
{
    // 기본 ajax process 함수
    public function 함수이름()
    {
        header('Content-type: application/json; charset=utf-8');
        $params = $this->vars['params'];

        $this->db->trans_begin();

        if ($this->db->trans_complete() == true) {
            $result['status'] = 'complete';
        } else {
            $result['status'] = 'fail';
        }
        echo json_encode($result);
        exit;
    }

    // 기본 모델 함수
    public function 모델이름($where, $limit = NULL, $order_by = 'regdate DESC')
    {
        $option = NULL;
        if ($limit == 'count') {
            $this->select('COUNT(0)');
            $option = 'col';
        } else {
            $this->select('
                *
			');
        }

        return $this->from('테이블이름')
            ->order_by($order_by)
            ->fetch($where, $limit, $option);
    }
    public function 유용한()
    {
        // 핸드폰 번호 형식 010-0000-0000
        $핸드폰번호 = preg_replace("/([0-9]{3})([0-9]{3,4})([0-9]{4})$/", "\\1-\\2-\\3", $핸드폰번호);

        // 인터넷 번호 형식 0000-0000
        $인터넷번호 = preg_replace("/([0-9]{3,4})([0-9]{4})$/", "\\1-\\2", $인터넷번호);

        // 만 나이 계산
        $age = floor((date('Ymd') - date('Ymd', strtotime($생일))) / 10000);

        // 한국식 나이 계산
        $age = date('Y') - date('Y', $생일) + 1;

        // 시간 포맷
        $시간 = date("Y-m-d H:i:s", strtotime($시간));

        // 숫자 3자리 콤마
        number_format($숫자);

        // 오브젝트 배열 정렬 (DESC)
        // 함수를 사용하므로 전역 변수만 사용 가능 
        // EX) $params (X) $this->vars['params'] (O)
        usort($배열, function ($오브젝트1, $오브젝트2) {
            return $오브젝트1['정렬할 기준'] < $오브젝트2['정렬할 기준'];
        });

        // 숫자 두 자리로 만들기 예) 01, 02, 03
        sprintf('%02d', $숫자);

        // date()에 사용하는 알파벳
        // https://www.habonyphp.com/2020/07/php-date.html

        // 시간 계산
        $시간 = date('Y-m-d H:i:s', strtotime($시간, '+1 years +1 months +1 days -1 hours -1 minutes -1 seconds'));

        // where문에 키워드 넣기
        $where[] = "칼럼이름 LIKE " . $this->db->escape('%' . $params['keyword'] . '%');

        // 오브젝트 value 값으로 배열 만들기
        $배열 = array_column($오브젝트, '키');
    }

    public function 페이지네이션()
    {
        $params = &$this->vars['params'];

        $where = [];

        $vars['pagePerEntries'] = 10;
        $vars['totalEntries'] = $this->모델->get함수($where, 'count');
        $vars['pagination'] = $this->pagination->navy($vars['totalEntries'], $params['page'], $vars['pagePerEntries']);

        $vars['list'] = [];
        if ($vars['totalEntries'] > 0) {
            $vars['list'] = $this->모델->get함수($where, $vars['pagination']['Offset']);
        }

        $this->load->view('경로', $vars);
    }
}
?>

<!-- 페이지네이션 html -->
<?php if (!empty($params['page'])) { ?>
    <input type="hidden" id="page" value="<?= $params['page'] ?>">
<?php } else { ?>
    <input type="hidden" id="page" value="1">
<?php } ?>
<div class="number_list_whole">
    <?php if ($pagination['page'] != 1) { ?>
        <a onclick="window.location.replace('<?= $pagination['base_url'] . ($pagination['page'] - 1) ?>')">
            <p class="page_prev">
                <span></span>
            </p>
        </a>
    <?php } ?>
    <?php foreach ($pagination['List'] as $pageNo) { ?>
        <?php if ($pageNo == $pagination['page']) { ?>
            <p class="push"><a><?= $pageNo ?></a></p>
        <?php } else { ?>
            <a onclick="window.location.replace('<?= $pagination['base_url'] . $pageNo ?>')">
                <p>
                    <?= $pageNo ?>
                </p>
            </a>
        <?php } ?>
    <?php } ?>
    <?php if ($pagination['last']) { ?>
        <a onclick="window.location.replace('<?= $pagination['base_url'] . ($pagination['page'] + 1) ?>')">
            <p class="page_next">
                <span></span>
            </p>
        </a>
    <?php } ?>
</div>

<!-- file 인풋 타입 제한 -->
<!-- 이미지 -->
<input type="file" accept="image/*">
<!-- 비디오 -->
<input type="file" accept="video/*">
<!-- 오디오 -->
<input type="file" accept="audio/*">

<!-- 태그 값 변경 시 폼 전송 -->
<input type="text" onkeydown="this.form.submit()">

<script>
    // 기본 ajax 함수
    function 함수이름() {
        var Params = {};
        $.ajax({
            url: "/url",
            type: 'POST',
            data: Params,
            datatype: 'json',
            // ajax 통신 성공 시
            success: function(result) {
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
            error: function(request, status, error) {
                // 에러 출력
                console.error("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error + "\n" + "request:" + request);
            },
            // ajax 통신 시작 시 
            beforeSend: function() {
                // 마우스 커서 로딩중으로 변경
                $('html').css("cursor", "wait");
                // ajax 함수 실행 버튼 클릭 이벤트 차단
                $('#button').on("click.return_false", function() {
                    return false;
                });
            },
            // ajax 통신 종료 시 
            complete: function() {
                // 마우스 커서 기본값으로 변경
                $('html').css("cursor", "auto");
                // ajax 함수 실행 버튼 클릭 이벤트 차단 해제
                $('#button').off("click.return_false");
            }
        });
    }
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

    /**
     * 날짜를 입력받은 형식으로 변환해주는 함수
     * @params {string} format 형식
     * @params {string, object} date 날짜
     * @returns {string} date를 format 형식으로 변환
     */
    function dateFormat(foramt, date) {
        if (date == undefined) {
            return " ";
        }
        if (typeof date != 'object') {
            date = new Date(date);
        }

        var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];

        return foramt.replace(/(Y|y|m|n|d|D|t|KS|KL|H|h|G|g|i|s|a\/p)/gi, function($1) {
            switch ($1) {
                case "Y":
                    return date.getFullYear(); // 년 (4자리)

                case "y":
                    return (date.getFullYear() % 1000).zf(2); // 년 (2자리)

                case "m":
                    return (date.getMonth() + 1).zf(2); // 월 (2자리)

                case "n":
                    return (date.getMonth() + 1).zf(2); // 월

                case "d":
                    return date.getDate().zf(2); // 일 (2자리)

                case "D":
                    return date.getDate(); // 일

                case "t":
                    return new Date(date.getFullYear, date.getMonth + 1, 0).getDate(); // 해당 월 년 마지막 일

                case "KS":
                    return weekKorShortName[date.getDay()]; // 요일 (짧은 한글)

                case "KL":
                    return weekKorName[date.getDay()]; // 요일 (긴 한글)

                case "H":
                    return date.getHours().zf(2); // 시간 (24시간 기준, 2자리)

                case "h":
                    return ((h = date.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)

                case "G":
                    return date.getHours(); // 시간 (24시간 기준)

                case "g":
                    return ((h = date.getHours() % 12) ? h : 12); // 시간 (12시간 기준)

                case "i":
                    return date.getMinutes().zf(2); // 분 (2자리)

                case "s":
                    return date.getSeconds().zf(2); // 초 (2자리)

                case "a/p":
                    return date.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분

                default:
                    return $1;
            }
        });
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
</script>