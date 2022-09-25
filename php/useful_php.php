<?php
class 유용한
{
    // 기본 ajax process 함수
    public function 함수이름()
    {
        header('Content-type: application/json; charset=utf-8');
        $params = $this->vars['params'];

        $this->db->trans_begin();

        if ($this->db->trans_complete() == true) {
            $result['status'] = 'complete';
        } else {
            $result['status'] = 'fail';
        }
        echo json_encode($result);
        exit;
    }

    // 기본 모델 함수
    public function 모델이름($where, $limit = NULL, $order_by = 'regdate DESC')
    {
        $option = NULL;
        if ($limit == 'count') {
            $this->select('COUNT(0)');
            $option = 'col';
        } else {
            $this->select('
                *
			');
        }

        return $this->from('테이블이름')
            ->order_by($order_by)
            ->fetch($where, $limit, $option);
    }
    public function 유용한()
    {
        // 핸드폰 번호 형식 010-0000-0000
        $핸드폰번호 = preg_replace("/([0-9]{3})([0-9]{3,4})([0-9]{4})$/", "\\1-\\2-\\3", $핸드폰번호);

        // 인터넷 번호 형식 0000-0000
        $인터넷번호 = preg_replace("/([0-9]{3,4})([0-9]{4})$/", "\\1-\\2", $인터넷번호);

        // 만 나이 계산
        $age = floor((date('Ymd') - date('Ymd', strtotime($생일))) / 10000);

        // 한국식 나이 계산
        $age = date('Y') - date('Y', $생일) + 1;

        // 시간 포맷
        $시간 = date("Y-m-d H:i:s", strtotime($시간));

        // 숫자 3자리 콤마
        number_format($숫자);

        // 오브젝트 배열 정렬 (DESC)
        // 함수를 사용하므로 전역 변수만 사용 가능 
        // EX) $params (X) $this->vars['params'] (O)
        usort($배열, function ($오브젝트1, $오브젝트2) {
            return $오브젝트1['정렬할 기준'] < $오브젝트2['정렬할 기준'];
        });

        // 숫자 두 자리로 만들기 예) 01, 02, 03
        sprintf('%02d', $숫자);

        // date()에 사용하는 알파벳
        // https://www.habonyphp.com/2020/07/php-date.html

        // 시간 계산
        $시간 = date('Y-m-d H:i:s', strtotime($시간, '+1 years +1 months +1 days -1 hours -1 minutes -1 seconds'));

        // where문에 키워드 넣기
        $where[] = "칼럼이름 LIKE " . $this->db->escape('%' . $params['keyword'] . '%');

        // 오브젝트 value 값으로 배열 만들기
        $배열 = array_column($오브젝트, '키');
    }

    public function 페이지네이션()
    {
        $params = &$this->vars['params'];

        $where = [];

        $vars['pagePerEntries'] = 10;
        $vars['totalEntries'] = $this->모델->get함수($where, 'count');
        $vars['pagination'] = $this->pagination->navy($vars['totalEntries'], $params['page'], $vars['pagePerEntries']);

        $vars['list'] = [];
        if ($vars['totalEntries'] > 0) {
            $vars['list'] = $this->모델->get함수($where, $vars['pagination']['Offset']);
        }

        $this->load->view('경로', $vars);
    }
}
?>

<!-- 페이지네이션 html -->
<?php if (!empty($params['page'])) { ?>
    <input type="hidden" id="page" value="<?= $params['page'] ?>">
<?php } else { ?>
    <input type="hidden" id="page" value="1">
<?php } ?>
<div class="number_list_whole">
    <?php if ($pagination['page'] != 1) { ?>
        <a onclick="window.location.replace('<?= $pagination['base_url'] . ($pagination['page'] - 1) ?>')">
            <p class="page_prev">
                <span></span>
            </p>
        </a>
    <?php } ?>
    <?php foreach ($pagination['List'] as $pageNo) { ?>
        <?php if ($pageNo == $pagination['page']) { ?>
            <p class="push"><a><?= $pageNo ?></a></p>
        <?php } else { ?>
            <a onclick="window.location.replace('<?= $pagination['base_url'] . $pageNo ?>')">
                <p>
                    <?= $pageNo ?>
                </p>
            </a>
        <?php } ?>
    <?php } ?>
    <?php if ($pagination['last']) { ?>
        <a onclick="window.location.replace('<?= $pagination['base_url'] . ($pagination['page'] + 1) ?>')">
            <p class="page_next">
                <span></span>
            </p>
        </a>
    <?php } ?>
</div>