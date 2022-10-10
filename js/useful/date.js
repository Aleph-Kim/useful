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
