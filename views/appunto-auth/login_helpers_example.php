<!DOCTYPE html>
<html>
<head>
    <title><?php if (isset($site_name)) echo $site_name ?> <?php if (isset($auth_message)) echo " - $auth_message" ?></title>
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_login.css" />
</head>
<body>

<!-- you certainly don't need to use tables here - I'm being lazy -->
<table border="2">
<tr>
	<td>
		<h2>Example 1: default login box, directs to default controller </h2>
		<ul>
			<li>Default style (login-form-box defined in resources/appunto-auth/css/appunto_auth_login.css)</li>
			<li>Will redirect to the default controller on success.</li>
		</li>
		<p><b>Command:</b><pre>&#60;?php echo login_box() ?&#62;</pre></p>
	</td> 
	<td>
		 <?php echo login_box() ?>
	</td> 
</tr>
<tr>
	<td>
		<h2>Example 2: a header	login form, refreshes this page</h2>
		<ul>
			<li>Default style (login-form-box defined in resources/appunto-auth/css/appunto_auth_login.css)</li>
			<li>Will refresh this page on success.</li>
		</li>
		<p><b>Command:</b><pre>&#60;?php echo login_box(false) ?&#62;</pre></p>
	</td> 
	<td>
		 <?php echo login_box() ?>
	</td> 
</tr>
<tr>
	<td>
		<h2>Example 3: a header	login form, directs to default controller</h2>
		<ul>
			<li>Uses a custom style class "login-form-header", defined in resources/appunto-auth/css/appunto_auth_login.css</li>
			<li>Will redirect to the default controller on success.</li>
		</li>
		<p><b>Command:</b><pre>&#60;?php echo login_box(true,'login-form-header') ?&#62;</pre></p>
		<p><b>Uses this css:</b>
<pre>
.login-form-header {
    font-size: 12px;
    background: #6F95FC;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    float:right;
    color: #fff;
}
.login-form-header div {
    float:left;
}
.login-form-header .login-form-label {
    float: left;
    padding: 8px 6px 0 6px;
    text-align: right;
}
.login-form-header .login-form-field input {
    margin: 4px 4px;
    width: 90px;
}
</pre>
</p>
	</td>
	<td>
		 <?php echo login_box(true,'login-form-header') ?>
	</td>
</tr>
<tr>
	<td>
		<h2>Example 4: a header	login form, refreshes this page</h2>
		<ul>
			<li>Default style (login-form-box defined in resources/appunto-auth/css/appunto_auth_login.css)</li>
			<li>Will refresh this page on success.</li>
		</li>
		<p><b>Command:</b><pre>&#60;?php echo login_box(false) ?&#62;</pre></p>
	</td> 
	<td>
		 <?php echo login_box() ?>
	</td> 
</tr>
<tr>
	<td>
		<h2>Example 3: a header	login form, refreshes this page</h2>
		<ul>
			<li>Uses a custom style class "login-form-header", defined in resources/appunto-auth/css/appunto_auth_login.css</li>
			<li>Will redirect to the default controller on success.</li>
		</li>
		<p><b>Command:</b><pre>&#60;?php echo login_box(false,'login-form-header') ?&#62;</pre></p>
		<p><b>Uses same css as above.</b></p>
	</td>
	<td>
		 <?php echo login_box(false,'login-form-header') ?>
	</td>
</tr>
</table>
</body>
</html>
