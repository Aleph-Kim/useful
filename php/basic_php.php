<?
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
            ->join('연관테이블', '조건')
            ->order_by($order_by)
            ->fetch($where, $limit, $option);
    }

    /**
     * 입력 이미지를 저장 후 출력 경로를 반환하는 함수
     * @param string $img base64 인코딩 된 이미지
     * @return string 출력 경로
     */
    function save_img($img)
    {
        // 이미지 저장 경로
        $tempPath = ATTACH_PATH . 'upload/';
        // 이미지 출력 시 경로
        $tempURL = ATTACH_URL . 'upload/';

        // 이미지 저장 경로에 디렉토리가 존재하지 않는다면 생성
        if (!is_dir($tempPath)) {
            mkdir($tempPath, TRUE);
            chmod($tempPath, 0755);
        }

        $explodArray = explode("base64,", $img);
        $img = $explodArray[1];
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);

        if ($data === false) {
            throw new \Exception('base64_decode failed');
        }

        $pull_path = $tempPath . md5($_SERVER['REMOTE_ADDR']) . '_' . fn_hash_id(TRUE) . '.jpg';
        file_put_contents($pull_path, $data);
        return str_replace($tempPath, $tempURL, $pull_path);
    }

    /**
     * 이미지를 삭제하는 함수
     * @param string $img 이미지 경로
     */
    function delete_prev_img($img)
    {
        // 이미지 저장 경로
        $tempPath = ATTACH_PATH . 'upload/';

        $old_img = explode('/', $img)[3];
        $file = $tempPath . $old_img;
        if (file_exists($file)) {
            unlink($tempPath . $old_img);
        }
    }
}
