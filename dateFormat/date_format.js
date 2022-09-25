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

    return foramt.replace(/(Y|y|m|n|d|D|t|KS|KL|H|h|G|g|i|s|a\/p)/gi, function ($1) {
        switch ($1) {
            case "Y":
                return date.getFullYear(); // 년 (4자리)

            case "y":
                return (date.getFullYear() % 1000).zf(2); // 년 (2자리)

            case "m":
                return (date.getMonth() + 1).zf(2); // 월 (2자리)

            case "n":
                return (date.getMonth() + 1); // 월

            case "d":
                return date.getDate().zf(2); // 일 (2자리)

            case "D":
                return date.getDate(); // 일

            case "t":
                return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // 해당 월 년 마지막 일

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
String.prototype.string = function (len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function (len) {
    return "0".string(len - this.length) + this;
};

// 정수형 숫자 입력받은 숫자 자리수로 변환
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};