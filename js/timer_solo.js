/** @type {Number} 시간 차이 ms */
var diff_time;

/**
 * 현재 시간을 기준으로 입력받은 종료 시간까지 타이머를 작동 시키는 함수
 * @param {String} end_time 종료 시간
 * @param {String} tag 타이머 텍스트가 들어갈 태그
 */
function setTimer(end_time, tag) {
    var deadline_time = new Date(end_time);
    var now_time = new Date();
    if (now_time > deadline_time) {
        $(tag).text(`타이머가 종료되었습니다.`);
    } else {
        var { diff_ms, diff_hour, diff_minute, diff_second } = calculationDiffTime(deadline_time, now_time);
        diff_time = diff_ms;

        $(tag).text(`${diff_hour}:${diff_minute}:${diff_second}`);
        timerStart(tag);
    }
}

/**
 * 입력 받은 두 시간의 차이를 반환하는 함수
 * @param {object} deadline_time 종료 시간
 * @param {object} now_time 현재 시간
 * @returns 시간 차이 시/분/초, 전체 시간 차이 ms
 */
function calculationDiffTime(deadline_time, now_time) {
    var diff_ms = Math.trunc((deadline_time - now_time) / 1000);

    var { diff_hour, diff_minute, diff_second } = getDiffHMS(diff_ms);

    return { diff_ms, diff_hour, diff_minute, diff_second };
}

/**
 * ms 단위의 시간을 시/분/초로 계산 해주는 함수
 * @param {Number} diff_ms ms 단위 시간
 * @returns 시간 차이 시/분/초
 */
function getDiffHMS(diff_ms) {
    var criterion_time = Math.floor(diff_ms / 60);
    var diff_hour = Math.floor(criterion_time / 60).zf(2);
    var diff_minute = (criterion_time % 60).zf(2);
    var diff_second = (diff_ms % 60).zf(2);
    return { diff_hour, diff_minute, diff_second };
}

/**
 * 타이머 시작 / 재시작
 * @param {string} tag 타이머 텍스트가 들어갈 태그
 */
function timerStart(tag) {
    clearInterval(timer);
    var timer = setInterval(function () {
        if (diff_time == 0) {
            $(tag).text(`타이머가 종료되었습니다.`);
            clearInterval(timer);
        } else {
            var { diff_hour, diff_minute, diff_second } = getDiffHMS(diff_time);

            $(tag).text(`${diff_hour}:${diff_minute}:${diff_second}`);
            diff_time--;
        }
    }, 1000);
}

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