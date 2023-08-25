/** @type {array} 시간 차이 ms 배열 */
var timerArr = [];

/**
 * 입력받은 타이머 종료 시간을 기준으로 타이머를 생성하고 남은 시간 문자열을 반환하는 함수
 * @param {String} time 종료 시간
 * @param {String} key 타이머의 남은 시간이 들어갈 태그(id, class)
 * @returns {String} 남은 시간
 */
function getDiffTime(time, key) {
    var nowTime = new Date();
    var deadline = new Date(time);

    if (nowTime > deadline) {
        return '타이머가 종료 되었습니다.';
    } else {
        var { diffTime, diffHour, diffMinute, diffSecond } = calculationDiffTime(deadline, nowTime);

        if (timerArr[key] == undefined) {
            timerArr[key] = diffTime;
        }


        return `남은 시간 ${diffHour}:${diffMinute}:${diffSecond}</span>`;
    }
}
/**
 * 입력 받은 두 시간의 차이를 ms단위 시간, 남은 시 / 분 / 초로 반환해주는 함수
 * @param {object} deadline 종료 시간
 * @param {object} nowTime 현재 시간
 * @returns 전체에서 차이나는 ms단위 시간, 남은 시 / 분 / 초
 */
function calculationDiffTime(deadline, nowTime) {
    var diffTime = Math.trunc((deadline - nowTime) / 1000);
    return getDiffHMS(diffTime);
}

/**
 * setInterval를 사용하여 타이머 기능을 작동시키는 함수
 * @param {Number} time 타이머의 남은 시간 (ms단위)
 * @param {String} key 남은 시간을 표시할 태그(id, class)
 */
function setSaleTimer(time, key) {
    var timer = setInterval(function () {
        if (time == 0) {
            $(`.${key}`).html('타이머가 종료 되었습니다.');
            delete timer[key];
            clearInterval(timer);
        } else {
            var { diffHour, diffMinute, diffSecond } = getDiffHMS(time);

            $(`.${key}`).html(`${diffHour}:${diffMinute}:${diffSecond}`);
            time--;
            timer[key] = time;
        }
    }, 1000);
    timerArr.push(timer);
}

/**
 * 입력받은 ms 단위 시간을 시 / 분 / 초 단위로 환산 해주는 함수
 * @param {number} diffTime ms단위 시간
 * @returns 남은 시 / 분 / 초
 */
function getDiffHMS(diffTime) {
    var criterionTime = Math.floor(diffTime / 60);
    var diffHour = Math.floor(criterionTime / 60).zf(2);
    var diffMinute = (criterionTime % 60).zf(2);
    var diffSecond = (diffTime % 60).zf(2);
    return { diffHour, diffMinute, diffSecond };
}

/**
 * 모든 타이머를 종료 후 재시작하는 함수
 */
function saleTimerStart() {
    resetSaleTimer();
    timerArr.forEach((time, key) => {
        setSaleTimer(time, key);
    });
}

/**
 * 모든 타이머를 종료하는 함수
 */
function resetSaleTimer() {
    timerArr.forEach(timer => {
        clearInterval(timer);
    });
    timerArr = [];
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

// 작동 순서 : getDiffTime(타이머 종료 시간, 출력할 태그) -> saleTimerStart()