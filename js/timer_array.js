var timer_arr = [];

/**
 * 입력받은 타이머 종료 시간을 기준으로 타이머를 생성하고 남은 시간 문자열을 반환하는 함수
 * @param {String} time 종료 시간
 * @param {String} key 타이머의 남은 시간이 들어갈 태그(id, class)
 * @returns {String} 남은 시간
 */
function getDiffTime(time, key) {
    var now_time = new Date();
    var deadline = new Date(time);

    if (now_time > deadline) {
        return '타이머가 종료 되었습니다.';
    } else {
        var diff_time = Math.trunc((deadline - now_time) / 1000);
        if (timer_arr[key] == undefined) {
            timer_arr[key] = diff_time;
        }

        var criterion_time = Math.floor(diff_time / 60);
        var diff_hour = Math.floor(criterion_time / 60).zf(2);
        var diff_minute = (criterion_time % 60).zf(2);
        var diff_second = (diff_time % 60).zf(2);

        return `남은 시간 ${diff_hour}:${diff_minute}:${diff_second}</span>`;
    }
}

/**
 * 모든 타이머를 종료 후 재시작하는 함수
 */
function saleTimerStart() {
    resetSaleTimer();
    timer_arr.forEach((time, key) => {
        setSaleTimer(time, key);
    });
}

/**
 * setInterval를 사용하여 타이머 기능을 작동시키는 함수
 * @param {Number} time 타이머의 남은 시간 (ms단위)
 * @param {String} key 남은 시간을 표시할 태그(id, class)
 */
function setSaleTimer(time, key) {
    var hour;
    var min;
    var sec;
    var timer = setInterval(function () {
        if (time == 0) {
            $(`.${key}`).html('타이머가 종료 되었습니다.');
            delete timer[key];
            clearInterval(timer);
        } else {
            var criterion_time = Math.floor(time / 60);
            hour = Math.floor(criterion_time / 60).zf(2);
            min = (criterion_time % 60).zf(2);
            sec = (time % 60).zf(2);

            $(`.${key}`).html(`남은 시간 ${hour}:${min}:${sec}`);
            time--;
            timer[key] = time;
        }
    }, 1000);
    timer_arr.push(timer);
}

/**
 * 모든 타이머를 종료하는 함수
 */
function resetSaleTimer() {
    timer_arr.forEach(timer => {
        clearInterval(timer);
    });
    timer_arr = [];
}

// 정수형 숫자 입력받은 숫자 자리수로 변환
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};

// 작동 순서 : getDiffTime(타이머 종료 시간, 출력할 태그) -> saleTimerStart()