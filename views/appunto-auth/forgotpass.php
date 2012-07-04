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
?>
<html>
<head>
    <title><?php if (isset($site_name)) echo $site_name ?> <?php if (isset($auth_message)) echo " - $auth_message" ?></title>
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>css/appunto_auth_login.css" />
</head>
<body>

<?php echo form_open('user/forgotpassword') ?>
<div class="login-wrap">
<div class="login-form">
<?php if (isset($auth_message)) { ?>
	<div class="login-form-auth-message"><?php echo $auth_message ?></div>
<? } ?>
	<div class="login-form-errors"><?php echo validation_errors(); ?></div>
	<div class="login-form-label"><?php echo lang('appunto_form_forgot_pw_username','login') ?></div>
	<div class="login-form-field"><?php echo form_input($login); ?></div>
	<div class="login-form-button"><?php echo form_submit(array('name'=>'login','value'=>lang('appunto_form_forgot_pw_button'),'class'=>'round-button')); ?></div>
</div>
</div>
<?php echo form_close(); ?>

</body>
</html>
