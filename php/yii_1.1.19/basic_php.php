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

    function basic(){
        // 다른 클래스의 함수를 사용하는 방법
        // 클래스 생성
        list($testController, $actionID) = Yii::app()->createController('test');
        // 함수 호출
        $testController->testFunction();

        // 내 ip 가져오기
        $userIp = Yii::app()->request->userHostAddress;

        // 내 브라우저 정보 가져오기
        $userAgent = Yii::app()->request->userAgent;
        }
    }
}
