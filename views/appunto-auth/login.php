<!DOCTYPE html>
<html>
<head>
    <title><?php if (isset($site_name)) echo $site_name ?> <?php if (isset($auth_message)) echo " - $auth_message" ?></title>
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_custom.css" />
</head>
<body>
<div style="margin-top:140px">
<?php echo login_box() ?>
</div>
</body>
</html>
