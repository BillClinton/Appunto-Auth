<!DOCTYPE html>
<html>
<head>
    <title><?php if (isset($site_name)) echo $site_name ?> <?php if (isset($auth_message)) echo " - $auth_message" ?></title>
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_login.css" />
</head>
<body>
<div class="app-header" style="height:60px;width:90%;margin:12px auto 6px">
<?php echo login_header('login-form-header') ?>
</div>
<?php echo appunto_auth_application("640px","90%","margin:6px auto 0") ?>
</body>
</html>
