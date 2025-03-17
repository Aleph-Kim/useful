<?php

/**
 * html 포매팅
 */

function formatHtmlFile($inputFile, $outputFile)
{
    // 입력 파일 읽기
    $html = file_get_contents($inputFile);
    if ($html === false) {
        return "Error: Unable to read input file";
    }

    // 줄바꿈과 공백 제거 후 태그 단위로 분리
    $html = preg_replace('/\s+/', ' ', trim($html));
    $html = str_replace('>', ">\n", $html);
    $html = str_replace('<', "\n<", $html);

    // 빈 줄 제거
    $lines = array_filter(explode("\n", $html), function ($line) {
        return trim($line) !== '';
    });

    $formatted = '';
    $indentLevel = 0;
    $indentSize = 4; // 들여쓰기 크기

    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line)) continue;

        $isClosingTag = strpos($line, '</') === 0;
        $isSelfClosing = preg_match('/\/>$/', $line);

        // 닫는 태그면 들여쓰기 레벨 감소
        if ($isClosingTag) {
            $indentLevel--;
        }

        // 들여쓰기 적용
        $formatted .= str_repeat(' ', $indentLevel * $indentSize) . $line . "\n";

        // 여는 태그이고 셀프 클로징이 아니면 들여쓰기 레벨 증가
        if (!$isClosingTag && !$isSelfClosing) {
            $indentLevel++;
        }
    }

    // 출력 파일에 저장
    $result = file_put_contents($outputFile, $formatted);

    if ($result === false) {
        return "Error: Unable to write to output file";
    }

    return "File successfully formatted and saved";
}

// 사용 예시
$inputFile = "input.html";    // 입력 파일 경로
$outputFile = "output.html";  // 출력 파일 경로

$result = formatHtmlFile($inputFile, $outputFile);
echo $result;
