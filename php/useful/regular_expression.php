<?php
class Regular_expression
{
    public function 정규식()
    {
        // 핸드폰 번호 형식 010-0000-0000
        $핸드폰번호 = preg_replace("/([0-9]{3})([0-9]{3,4})([0-9]{4})$/", "\\1-\\2-\\3", $핸드폰번호);

        // 인터넷 번호 형식 0000-0000
        $인터넷번호 = preg_replace("/([0-9]{3,4})([0-9]{4})$/", "\\1-\\2", $인터넷번호);

        // 문자열 특수문자 제거
        $새문자열 = preg_replace("/[ #\&\+\-%@=\/\\\:;,\.'\"\^`~\_|\!\?\*$#<>()\[\]\{\}]/i", "", $문자열);

        // 문자열 알파벳 대문자, 소문자, 숫자, 하이픈(-), 언더바(_) 제외 제거
        $새문자열 = preg_replace("/[^A-Za-z0-9-_]/", "", $문자열);
    }
}
