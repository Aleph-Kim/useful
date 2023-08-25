/** @type {Number} 시간 차이 ms */
var diffTime;

/**
 * 현재 시간을 기준으로 입력받은 종료 시간까지 타이머를 작동 시키는 함수
 * @param {String} endTime 종료 시간
 * @param {String} tag 타이머 텍스트가 들어갈 태그
 */
function setTimer(endTime, tag) {
    var deadlineTime = new Date(endTime);
    var nowTime = new Date();
    if (nowTime > deadlineTime) {
        $(tag).text(`타이머가 종료되었습니다.`);
    } else {
        var { diffMs, diffHour, diffMinute, diffSecond } = calculationDiffTime(deadlineTime, nowTime);
        diffTime = diffMs;

        $(tag).text(`${diffHour}:${diffMinute}:${diffSecond}`);
        timerStart(tag);
    }
}

/**
 * 입력 받은 두 시간의 차이를 ms단위 시간, 남은 시 / 분 / 초로 반환해주는 함수
 * @param {object} deadline 종료 시간
 * @param {object} nowTime 현재 시간
 * @returns 전체에서 차이나는 ms단위 시간, 남은 시 / 분 / 초
 */
function calculationDiffTime(deadlineTime, nowTime) {
    var diffMs = Math.trunc((deadlineTime - nowTime) / 1000);

    var { diffHour, diffMinute, diffSecond } = getDiffHMS(diffMs);

    return { diffMs, diffHour, diffMinute, diffSecond };
}

/**
 * 타이머 시작 / 재시작
 * @param {string} tag 타이머 텍스트가 들어갈 태그
 */
 function timerStart(tag) {
    clearInterval(timer);
    var timer = setInterval(function () {
        if (diffTime == 0) {
            $(tag).text(`타이머가 종료되었습니다.`);
            clearInterval(timer);
        } else {
            var { diffHour, diffMinute, diffSecond } = getDiffHMS(diffTime);

            $(tag).text(`${diffHour}:${diffMinute}:${diffSecond}`);
            diffTime--;
        }
    }, 1000);
}

/**
 * 입력받은 ms 단위 시간을 시 / 분 / 초 단위로 환산 해주는 함수
 * @param {number} diffTime ms단위 시간
 * @returns 남은 시 / 분 / 초
 */
function getDiffHMS(diffMs) {
    var criterionTime = Math.floor(diffMs / 60);
    var diffHour = Math.floor(criterionTime / 60).zf(2);
    var diffMinute = (criterionTime % 60).zf(2);
    var diffSecond = (diffMs % 60).zf(2);
    return { diffHour, diffMinute, diffSecond };
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