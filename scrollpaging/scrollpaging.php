<?php class ScrollPaging
{
    // 데이터를 가져오는 프로세스
    public function get_data_process()
    {
        header('Content-type: application/json; charset=utf-8');
        $params = $this->vars['params'];

        // 한 페이지에 출력될 데이터 개수
        $result['pagePerEntries'] = 20;
        // 모든 데이터의 개수 (총 개수를 구해서 최대가 몇 페이지인지 알아내기 위함)
        $result['totalEntries'] = $this->model->getFunction($where, 'count');
        // $this->pagination->navy($totalEntries(해당 데이터의 총 개수), $page(몇 페이지의 데이터를 가져와야 하는지), $pagePerEntries = 20(한 페이지당 출력될 데이터 개수))
        $result['pagination'] = $this->pagination->navy($result['totalEntries'], $params['page'], $result['pagePerEntries']);

        $result['data_list'] = [];
        // 데이터가 존재한다면
        if ($result['totalEntries'] > 0) {
            // sql 문법으로 limit에 offset[예)1번째부터 10번째 데이터를 가져오겠다(1, 10)]을 넣어서 해당되는 값을 가져오는 방식
            $result['data_list'] = $this->model->getFunction($where, $result['pagination']['Offset']);
        }

        echo json_encode($result);
        exit;
    }
}
?>


<!-- html이 추가 될 태그 -->
<div class="tag"></div>
<!-- 데이터가 없을 때 출력되는 태그 -->
<div class="no_data" hidden></div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>