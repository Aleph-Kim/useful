<?php
class basic_php
{
    /**
     * 객체를 HTML 형식의 문자열로 출력하는 함수
     * @param object $obj 출력할 오브젝트 객체
     * @param int $depth 출력할 데이터 깊이
     * @return string HTML 형식으로 출력된 문자열
     */
    function dumpObject($obj, $depth = 999) {
        Yii::import('system.utils.CVarDumper');
        echo CVarDumper::dumpAsString($obj, $depth, true);
        exit;
    }
}
