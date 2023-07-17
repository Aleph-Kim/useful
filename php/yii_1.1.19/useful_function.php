<?
class Useful_function
{


    /**
     * 각 차수별 카테고리 배열을 3단 카테고리 배열로 변환하는 함수
     * 
     * @return array $category_arr - 카테고리 배열
     */
    public static function getCategoryArray()
    {
        /**
         * 1차 카테고리 배열
         * 
         * cid - 카테고리 pk
         * category - 카테고리명
         */
        $cate1_arr = array(
            array(
                'cid' => '1',
                'category' => '도서',
            ),
            array(
                'cid' => '2',
                'category' => '학습',
            ),
            array(
                'cid' => '3',
                'category' => '기타',
            )
        );

        /**
         * 2차 카테고리 배열
         * 
         * cid - 카테고리 pk
         * category - 카테고리명
         * p_cid - 상위 카테고리 pk
         */
        $cate2_arr = array(
            array(
                'cid' => '4',
                'category' => '도서 2차',
                'p_cid' => '1'
            ),
            array(
                'cid' => '5',
                'category' => '학습 2차',
                'p_cid' => '2'
            ),
            array(
                'cid' => '6',
                'category' => '기타 2차',
                'p_cid' => '3'
            )
        );

        /**
         * 3차 카테고리 배열
         * 
         * cid - 카테고리 pk
         * category - 카테고리명
         * p_cid - 상위 카테고리 pk
         */
        $cate3_arr = array(
            array(
                'cid' => '7',
                'category' => '도서 3차',
                'p_cid' => '4'
            ),
            array(
                'cid' => '8',
                'category' => '학습 3차',
                'p_cid' => '5'
            ),
            array(
                'cid' => '9',
                'category' => '기타 3차',
                'p_cid' => '6'
            )
        );

        // 3차원 배열로 변경하기 위해 사용하는 보조 배열
        $sub_category_arr = array();

        // 2차 카테고리 cid를 키값으로 보조 배열 생성
        foreach ($cate2_arr as $cate) {
            $cate['child_cate'] = array();
            $sub_category_arr[$cate['cid']] = $cate;
        }

        // 상위 카테고리(2차 카테고리) pk가 키값인 보조 배열의 하위 카테고리값에 3차 카테고리 추가
        foreach ($cate3_arr as $cate) {
            array_push($sub_category_arr[$cate['p_cid']]['child_cate'], $cate);
        }

        // 카테고리 3차원 배열
        $category_arr = array();

        // 1차 카테고리 cid를 키값으로 3차원 배열 생성
        foreach ($cate1_arr as $cate) {
            $cate['child_cate'] = array();

            $category_arr[$cate['cid']] = $cate;
        }

        // 상위 카테고리(1차 카테고리) pk가 키값인 3차원 배열의 하위 카테고리값에 보조 배열 추가
        foreach ($sub_category_arr as $cate) {
            array_push($category_arr[$cate['p_cid']]['child_cate'], $cate);
        }

        return $category_arr;
    }
}
