<?
class Masking
{
    /**
     * 휴대폰 번호 마스킹
     */
    function phoneNoMasking($str)
    {
        $str = str_replace('-', '', $str);
        $strlen = mb_strlen($str, 'utf-8');
        $mValue = "";

        switch ($strlen) {
            case 10:
                $mValue = mb_substr($str, 0, 3) . "-" . mb_substr($str, 3, 1) . "**" . "-*" . mb_substr($str, 7, 3);;
                break;
            case 11:
                $mValue = mb_substr($str, 0, 3) . "-" . mb_substr($str, 3, 2) . "**" . "-*" . mb_substr($str, 8, 3);
                break;
            case 0:
                $mValue = '';
                break;
        }
        return $mValue;
    }

    /**
     * id 마스킹
     */
    function IDMasking($str)
    {
        $mValue = preg_replace('/.{3}$/', '***', $str);
        return $mValue;
    }

    /**
     * IP 마스킹
     */
    function IPaddressMasking($str)
    {
        // ? : 0 ~ 1, + : 1개 이상
        $str = preg_replace('/(\d+)([\.]\d+[\.])(\d+)([\.]\d+)/i', '***\2***\4', $str);
        return $str;
    }

    /**
     * 이름 마스킹
     */
    function nameMasking($str)
    {
        $str = str_replace('-', '', $str);
        $strlen = mb_strlen($str, 'utf-8');
        $mValue = "";

        switch ($strlen) {
            case 2:
                $mValue = mb_strcut($str, 0, 3, "UTF-8") . '*';
                break;
            case 3:
                $mValue = mb_strcut($str, 0, 3, "UTF-8") . '*' . mb_strcut($str, 8, 11, "UTF-8");
                break;
            case 4:
                $mValue = mb_strcut($str, 0, 3, "UTF-8") . '**' . mb_strcut($str, 12, 15, "UTF-8");
                break;
            default:
                $mValue = mb_strcut($str, 0, 3, "UTF-8") . '**' . mb_strcut($str, 12, 15, "UTF-8");
                break;
        }
        return $mValue;
    }
    // 출처 - https://link2me.tistory.com/2027


    /**
     * 이메일 마스킹
     * @return String 마스킹된 이메일(te**@g****.com) 
     */
    function EmailMasking($str)
    {
        // 마스킹 처리하는 길이(이메일 길이의 절반)
        $masking_size = round(strlen(explode('@', $str)[0]) / 2);

        $pattern = '/(\w+)(\w{' . $masking_size . '})(@.{1})([\w*?]+)(.+)/i';
        $replace = '\1' . str_repeat('*', $masking_size) . '\3****\5';
        $str = preg_replace($pattern, $replace, $str);

        return $str;
    }
}
