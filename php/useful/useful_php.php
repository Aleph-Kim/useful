<?
class Useful_php
{
    public function 유용한()
    {
        // 만 나이 계산
        $age = floor((date('Ymd') - date('Ymd', strtotime($생일))) / 10000);

        // 한국식 나이 계산
        $age = date('Y') - date('Y', $생일) + 1;

        // 시간 포맷
        $시간 = date("Y-m-d H:i:s", strtotime($시간));

        // 시간 연산
        $연산후날짜 = date('Y-m-d', strtotime('연산 날짜', strtotime($날짜)));
        // 예) 2022-04-21 12:00:00 보다 4달 뒤의 해당 일 ms
        $four_month_ago_from = date('Y-m-d', strtotime('+4 months', strtotime(date('Y-m-d', strtotime('2022-04-21 12:00:00')))));
        // 현재로부터의 시간은 다음과 같이 연산 가능
        $ago_from_now = date('Y-m-d', strtotime('연산 날짜'));

        // 시간 차이 구하기
        date_diff(date_create('대상시간'), date_create(date('Y-m-d')));
        // 예) 현재와 2023년 12월 4일의 날짜 차이
        date_diff(date_create('2023-12-04'), date_create(date('Y-m-d')))->days;

        // date()에 사용하는 알파벳
        // https://www.habonyphp.com/2020/07/php-date.html

        // 숫자 3자리 콤마
        number_format($숫자);

        // 오브젝트 배열 정렬 (DESC)
        // 함수를 사용하므로 전역 변수만 사용 가능 
        // EX) $params (X) $this->vars['params'] (O)
        usort($배열, function ($오브젝트1, $오브젝트2) {
            return $오브젝트1['정렬할 기준'] < $오브젝트2['정렬할 기준'];
        });

        /**
         * 오브젝트 배열 안의 특정 값으로 새로운 배열 생성
         */
        $newArray = array_map(function ($object) {
            return $object['key'];
        }, $objectArray);

        // 숫자 두 자리로 만들기 예) 01, 02, 03
        sprintf('%02d', $숫자);

        // 소수점 제한
        // 예) 0.000, 0.100, 0.200
        (float)number_format($숫자, $제한자리수, '.', '');

        // 시간 계산
        $시간 = date('Y-m-d H:i:s', strtotime($시간, '+1 years +1 months +1 days -1 hours -1 minutes -1 seconds'));

        // where문에 키워드 넣기
        $where[] = "칼럼이름 LIKE " . $this->db->escape('%' . $params['keyword'] . '%');

        // 배열 순서 뒤집기
        $배열 = array_reverse($배열);

        // 오브젝트 value 값으로 배열 만들기
        $배열 = array_column($오브젝트, '키');

        // 배열 안에 특정 값이 있는지
        $bool = in_array($배열, $값);

        // 배열 합치기
        $합배열  = array_merge($배열1, $배열2);

        // 배열에서 랜덤으로 선택
        $랜덤키값  = array_rand($배열, $선택할개수);

        // 배열 첫 번째 순서에 값 추가
        array_rand($배열, $첫번째값);

        // 배열 특정 순서에 값 추가/수정
        array_splice($배열, $추가할위치, $수정할개수, $추가할배열);
        // Ex) 배열의 2번째 자리에 있는 값을 예시배열로 변경 (수정할개수를 0으로 지정 시 예시배열 추가)
        array_splice($배열, 1, 1, $예시배열);

        // 배열 특정 값 삭제
        unset($배열[$키]);

        // 문자열 포함 여부 체크
        strpos($문자열, '찾을 문자');

        // 문자열 템플릿(큰 따옴표만 가능)
        $text = '456';
        $sum = "123{$text}";
        // 결과 : 123456

        // 변수 자료형 확인
        $변수자료형 = gettype($변수);

        // curl 통신 속도 개선을 위한 ipv4 지정
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

        // curl 통신 결과를 기다리지 않고 종료 (10ms 뒤에 종료)
        curl_setopt($ch, CURLOPT_TIMEOUT_MS, 10);

        // aes 256 암호화
        $encrypted = openssl_encrypt($password, 'aes-256-cbc', $key);
        // aes 256 복호화
        $decrypted = openssl_decrypt($password, 'aes-256-cbc', $key);
        // sha 256 암호화
        $sha256 = hash('sha256', $password);

        // 사용 가능한 암호화 알고리즘 리스트
        openssl_get_cipher_methods();

        // 에러 로그 브라우저에서 확인
        error_reporting(E_ALL);
        ini_set('display_errors', '1');
    }
}
