-- varchar 자료형인 칼럼 숫자 기준 order_by
-- Ex) 전 : 1, 10, 2 / 후 : 1, 2, 10
ORDER BY ABS(varchar_int)

-- Ex) group by 시
SELECT ABS(e.varchar_int) as varchar_int
FROM ex_table e
GROUP BY e.varchar_int
ORDER BY varchar_int