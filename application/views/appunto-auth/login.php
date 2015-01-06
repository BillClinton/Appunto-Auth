<!DOCTYPE HTML>
<html>
<head>
    <title><?php if (isset($site_name)) echo $site_name ?></title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>resources/appunto-auth/css/login.css" /> 
</head>
<body>
<?php echo appunto_login_box($auth_message) ?>
</body>
</html>



