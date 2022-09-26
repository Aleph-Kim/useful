<?php
class basic_php
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
        switch ($limit) {
            case 'count':
                $this->select('COUNT(0)');
                $option = 'col';
                break;
            default:
                $this->select('
                    *
                ');
                break;
        }
        
        return $this->from('테이블이름')
            ->order_by($order_by)
            ->fetch($where, $limit, $option);
    }
}
