<?php
class 유용한
{
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

        // 시간 연산
        $연산후날짜 = date('Y-m-d', strtotime('연산 날짜', strtotime($날짜)));
        // 예) 2022-04-21 12:00:00 보다 4달 뒤의 해당 일 ms
        $four_month_ago_from = date('Y-m-d', strtotime('+4 months', strtotime(date('Y-m-d', strtotime('2022-04-21 12:00:00')))));
        // 현재로부터의 시간은 다음과 같이 연산 가능
        $ago_from_now = date('Y-m-d', strtotime('연산 날짜'));

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

        // 문자열 포함 여부 체크
        strpos($문자열, '찾을 문자');

        // 문자열 템플릿(큰 따옴표만 가능)
        $text = '456';
        $sum = "123{$text}";
        // 결과 : 123456

        // 변수 자료형 확인
        $변수자료형 = gettype($변수);
    }
}
