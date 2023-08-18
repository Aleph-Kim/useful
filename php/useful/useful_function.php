<?
class Useful_function
{
    /**
     * 번호 포매팅 함수
     * @param string $number - 전화번호
     * 
     * @return string $format_number - 포매팅된 전화번호
     */
    public static function formatCallNumber($number)
    {
        // 숫자를 제외한 다른 문자 제거
        $number = preg_replace('/[^0-9]/', '', $number);

        // 82로 시작할 경우 (+82)
        if (strpos($number, '82') === 0) {
            return preg_replace('/(^82)(2|\d{2})(\d+)?(\d{4})$/', '+$1-$2-$3-$4', $number);
        }

        // 1로 시작할 경우 (1588, 1566, 1677, ...)
        if (strpos($number, '1') === 0) {
            return preg_replace('/(^1\d{3})(\d{4})$/', '$1-$2', $number);
        }

        // 그 외 (02/0504/0505/010/011/031)
        return preg_replace('/(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/', '$1-$2-$3', $number);
    }

    /**
     * 배열을 간편히 출력하기 위한 함수
     */
    public function showObj()
    {
        $obj = array();
        $obj = var_export($obj, true);

        echo '<pre>';
        echo highlight_string("<?\n\$array = " . $obj . ";\n?>");
        echo '</pre>';
        exit;
    }

    /**
     * curl 통신 호출 함수
     *
     * @param  String $url - 통신 url
     * @param  String|Null $method - 통신 타입
     * @param  Array|Null $params - 파라미터
     * 
     * @return String - 통신 결과
     */
    public static function curlCall($url, $method = 'POST', $params)
    {
        $method = ($method == 'POST') ? 1 : 0;  // TRUE : POST, FALSE : GET

        $ch = curl_init(); // cURL 세션 초기화
        curl_setopt($ch, CURLOPT_URL, $url); // 요청할 URL 설정
        curl_setopt($ch, CURLOPT_POST, $method); // HTTP POST 메서드를 사용하여 요청 설정
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params)); // POST 데이터를 전달할 파라미터를 URL 인코딩하여 설정
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 응답 데이터를 반환받기 위해 true로 설정 (false일 경우 직접 출력)
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4); // IP 주소 해결 방식을 IPv4로 설정 (IPv6 대응, 해제 시 통신 속도 저하)
        $result = curl_exec($ch); // cURL 요청을 실행하고 응답 데이터 받기
        curl_close($ch); // cURL 세션 닫기
        
        return $result;


        // 추가 옵션
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // SSL 인증서 검증 비활성화 (보안 연결 설정)
        curl_setopt($ch, CURLOPT_TIMEOUT_MS, 10); // 10ms 뒤에 통신 종료(반환값을 기다리지 않음)
    }
}
