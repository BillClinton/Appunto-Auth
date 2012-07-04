<!DOCTYPE html>
<?php
$login = array(
	'name'	=> 'username',
	'id'	=> 'username',
	'value' => set_value('username'),
	'maxlength'	=> 80,
	'size'	=> 20,
    'class' => 'field-textinput'
);
$password = array(
	'name'	=> 'password',
	'id'	=> 'password',
	'size'	=> 20,
    'class' => 'field-textinput'
);
?>
<html>
<head>
    <title><?php if (isset($site_name)) echo $site_name ?><?php if (isset($auth_message)) echo $auth_message ?></title>
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>css/appunto_auth_login.css" />
</head>
<body>

<div class="login-wrap">
<div class="login-form">
<?php if (isset($auth_message)) { ?>
	<div class="login-form-auth-message"><?php echo $auth_message ?></div>
<? } ?>
</div>
</div>

</body>
</html>
