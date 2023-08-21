<?
class RecaptchaController extends Controller
{
    /**
     * google recaptcha 체크
     *
     * @param String $captcha - 캡챠 확인 값
     * @return Array - google api 통신 결과에 다른 code, msg
     */
    public function checkRecaptcha()
    {
        $captcha = Yii::app()->request->getPost('g-recaptcha-response');

        if (empty($captcha)) {
            return array(
                'code' => 100,
                'msg' => '캡챠를 체크해 주세요.'
            );
        }

        $url = "https://www.google.com/recaptcha/api/siteverify"; // recaptcha 검증 url
        $params = array(
            'secret' => RECAPTCHA_SECRET_KEY, // recaptcha secret key
            'response' => $captcha,
            'remoteip' => $_SERVER['REMOTE_ADDR'],
        );

        $result = EHelper::curlCall($url, 'POST', $params);

        $responseKeys = CJSON::decode($result);

        if ($responseKeys["success"]) {
            // Success
        } else {
            // Fail
        }
    }

    /**
     * curl 통신 호출
     *
     * @param  String $url - 통신 url
     * @param  String|Null $method - 통신 타입
     * @param  Array|Null $params - 파라미터
     * @return String - 통신 결과
     */
    public static function curlCall($url, $params)
    {
        $ch = curl_init(); // cURL 세션 초기화
        curl_setopt($ch, CURLOPT_URL, $url); // 요청할 URL 설정
        curl_setopt($ch, CURLOPT_POST, 1); // HTTP POST 메서드를 사용하여 요청 설정
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params)); // POST 데이터를 전달할 파라미터를 URL 인코딩하여 설정
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 응답 데이터를 반환받기 위해 true로 설정 (false일 경우 직접 출력)
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // SSL 인증서 검증 비활성화 (보안 연결 설정)
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4); // IP 주소 해결 방식을 IPv4로 설정 (IPv6 대응)
        $result = curl_exec($ch); // cURL 요청을 실행하고 응답 데이터 받기
        curl_close($ch); // cURL 세션 닫기

        return $result;
    }
}
?>

<!-- 체크 div -->
<div class="g-recaptcha" data-sitekey="<?= RECAPTCHA_SITE_KEY // recaptcha site key ?>"></div>
<!-- recaptcha js cdn -->
<script src="https://www.google.com/recaptcha/api.js"></script>