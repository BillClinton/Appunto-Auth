<!DOCTYPE html>
<html>
<head>
    <title><?php if (isset($site_name)) echo $site_name ?><?php if (isset($auth_message)) echo $auth_message ?></title>
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/custom.css" />
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
