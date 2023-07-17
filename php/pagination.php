<?
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
<input type="hidden" id="page" value="<?= (!empty($params['page']) ? $params['page'] : 1) ?>">
<div class="number_list_whole">
    <? if ($pagination['page'] != 1) { ?>
        <a onclick="window.location.replace('<?= $pagination['base_url'] . ($pagination['page'] - 1) ?>')">
            <p class="page_prev">
                <span></span>
            </p>
        </a>
    <? } ?>
    <? foreach ($pagination['List'] as $pageNo) { ?>
        <? if ($pageNo == $pagination['page']) { ?>
            <p class="push"><a><?= $pageNo ?></a></p>
        <? } else { ?>
            <a onclick="window.location.replace('<?= $pagination['base_url'] . $pageNo ?>')">
                <p>
                    <?= $pageNo ?>
                </p>
            </a>
        <? } ?>
    <? } ?>
    <? if ($pagination['last']) { ?>
        <a onclick="window.location.replace('<?= $pagination['base_url'] . ($pagination['page'] + 1) ?>')">
            <p class="page_next">
                <span></span>
            </p>
        </a>
    <? } ?>
</div>