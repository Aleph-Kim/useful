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
}
