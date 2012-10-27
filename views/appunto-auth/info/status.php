<div id='appunto-auth-app-info'>
<table class="application-status">
<tr>
	<th colspan="3">Application security</th>
</tr>
<tr>
	<td class="<?= ($enable_hooks)?'ok':'error'; ?>">&nbsp;</td>
	<td>Hooks enabled</td>
	<td><?= ($enable_hooks)?'yes':'no'; ?></td>
</tr>
<tr>
	<td class="<?= ($session_loaded)?'ok':'error'; ?>">&nbsp;</td>
	<td>Session library loaded</td>
	<td><?= ($session_loaded)?'yes':'no'; ?></td>
</tr>
<tr>
	<td class="<?= ($sess_use_database)?'ok':'error'; ?>">&nbsp;</td>
	<td>Sessions using Database</td>
	<td><?= ($sess_use_database)?'yes':'no'; ?></td>
</tr>
<tr>
	<td class="<?= ($auth_loaded)?'ok':'error'; ?>">&nbsp;</td>
	<td>Auth library loaded</td>
	<td><?= ($auth_loaded)?'yes':'no'; ?></td>
</tr>
<tr>
	<th colspan="3">&nbsp;</td>
</tr>
</table>
</div>


