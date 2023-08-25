// YYYY-mm-dd 형식 출력
시간 = 시간.substring(0, 10);

// date type 변수 문자열 변환
시간 = 시간.toISOString();

/**
 * 시간차이를 시분초 단위로 계산해주는 함수
 * @param {String} time 
 * @returns {String} 시간차이
 */
function 시간차이(time) {
    // 현재 시간 기준으로 차이 계산
    var nowTime = new Date();
    var deadline = new Date(time);

    // 시간 차이를 초 단위로 변수에 저장
    var diffTime = (deadline - nowTime) / 1000;
    var diffHour = Math.floor(diffTime / (60 * 60)).zf(2);
    var diffMinute = Math.floor((diffTime % diffHour) / 60).zf(2);
    var diffSecond = Math.floor(diffTime % 60).zf(2);

    return '시간차이 = ' + diffHour + ':' + diffMinute + ':' + diffSecond;
}

/**
 * 입력받은 시간이 얼마나 경과 되었는지 반환하는 함수
 * @param {string} time 과거 시간
 * @returns {string} 경과 시간
 */
function get_date_diff(time) {
    var nowTime = new Date();
    var deadline = new Date(time);

    var diffTime = (nowTime - deadline) / 1000;

    var time_list = [
        { time: "분", milliSeconds: 60 },
        { time: "시간", milliSeconds: 60 * 60 },
        { time: "일", milliSeconds: 60 * 60 * 24 },
        { time: "개월", milliSeconds: 60 * 60 * 24 * 30 },
        { time: "년", milliSeconds: 60 * 60 * 24 * 365 },
    ].reverse();

    for (var time of time_list) {
        var betweenTime = Math.floor(diffTime / time.milliSeconds);

        if (betweenTime > 0) {
            return `${betweenTime}${time.time} 전`;
        }
    }
    return "방금 전";
}

/**
 * date picker 한글화
 */
$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
});