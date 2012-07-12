<div id='appunto-auth-app-info'>
<style type="text/css">
table.version-info {
	background				: #ccc;
	-moz-border-radius		: 16px;
	-webkit-border-radius	: 16px;
	border-radius			: 16px;
	background-color		: #6F95FC;
	padding					: 16px 0; 
	margin					: 16px 0 16px 20px;
}
table.version-info td {
	padding					: 4px 32px;
	margin					: 1px;
	font-size				: 1.25em;
	background-color		: #ddd;
	border-collapse			: separate;
	border-spacing			: 1px;
}
table.version-info th {
	padding					: 4px 24px;
	font-size				: 1.25em;
	color					: #fff;
}
</style>
<table class="version-info">
<tr>
	<th>&nbsp;</th>
	<th>version</th>
</tr>
<tr>
	<td>Appunto Auth</td>
	<td><?= $appunto_auth_version ?></td>
</tr>
<tr>
	<td>CodeIgniter</td>
	<td><?= CI_VERSION ?></td>
</tr>
<tr>
	<td>Sencha Ext JS</td>
	<td><span id='extjs-version-display'>0.0.0</span></td>
</tr>
<tr>
	<td>PHP</td>
	<td><?= phpversion() ?></td>
</tr>
<tr>
	<th colspan="2">&nbsp;</td>
</tr>
</table>
</div>


