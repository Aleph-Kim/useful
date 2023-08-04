-- varchar 자료형인 칼럼 숫자 기준 order_by
-- Ex) 전 : 1, 10, 2 / 후 : 1, 2, 10
ORDER BY ABS(varchar_int)

-- Ex) group by 시
SELECT 
    ABS(e.varchar_int) as varchar_int
FROM 
    ex_table e
GROUP BY 
    e.varchar_int
ORDER BY 
    varchar_int

-- 테이블 구조 복사
CREATE TABLE IF NOT EXISTS `new_table` LIKE `old_table`;

-- 테이블 구조 + 데이터 복사
CREATE TABLE IF NOT EXISTS `new_table` SELECT * FROM `old_table`;

-- 정규식 조건문
SELECT 
    *
FROM 
    테이블명
WHERE 
    칼럼명 REGEXP '정규식조건';
-- EX) 1, 2, 3으로 시작하는 값만 가져오는 조건
SELECT 
    *
FROM 
    테이블명
WHERE 
    칼럼명 REGEXP '^1|^2|^3';

-- 정규식 리스트
. : 문자 하나
* : 앞 글자의 *개수 숫자 이상 반복
^ : 첫값
$ : 끝값
[.] : 괄호 안의 문자열 일치 확인
{.} : 반복
| : or

-- 일평균 데이터 카운트(빈 날짜 제외)
SELECT 
    COUNT(*) / COUNT(DISTINCT DATE(regdate)) as avg_count
FROM 
    example_table

-- 일평균 데이터 카운트(최초 데이터 생성 ~ 마지막 데이터 생성)
SELECT 
    COUNT(*) / DATEDIFF(MIN(regdate), MIN(regdate)) AS avg_count
FROM 
    example_table

-- 일평균 데이터 카운트(최초 데이터 생성 ~ 현재)
SELECT 
    COUNT(*) / DATEDIFF(NOW(), MIN(regdate)) AS avg_count
FROM 
    example_table