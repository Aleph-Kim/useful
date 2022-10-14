// 숫자가 아닌 문자 삭제
문자열.replace(/[^0-9]/, '');

// 숫자만 입력 가능
function keyupNumber(ths) {
    $(ths).val($(ths).val().replace(/[^0-9]/g, ''));
}

// 숫자에 , 넣어주는 함수
function addComma(num) {
    // 문자열 검사 추가
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

// ,가 포함되어 있는 숫자에 , 제거
var 새숫자 = 숫자.replace(/,/g, '');

// 숫자 두 자리로 만들기 예) 01, 02, 03
String(숫자).padStart(2, '0');

// 숫자 소수점 버리기
Math.trunc(숫자);

// 소수점 입력 제한
$('인풋').on('keyup', function (event) {
    event = event || window.event;
    var char_code = event.which || event.keyCode;

    if (char_code === 190) {
        return false;
    }

    this.value = Number(Number(this.value).toFixed(3));
});

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