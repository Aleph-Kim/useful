<?php
class basic_php
{
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