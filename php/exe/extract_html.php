<?php

/**
 * 특정 태그 추출
 */

// 추출할 태그명
$tagName = 'div';

// HTML 파일 읽기
$html = file_get_contents('input.html');

// 동적 태그명으로 패턴 생성
$pattern = "/<{$tagName}.*?>(.*?)<\/{$tagName}>/is";
preg_match_all($pattern, $html, $matches);

// 결과 처리
$output = implode("\n", $matches[0]);

// 파일로 저장
file_put_contents('output.html', $output);

echo "태그 추출이 완료되었습니다.";
