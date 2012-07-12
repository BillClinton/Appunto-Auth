<!DOCTYPE html>
<html>
<head>
    <title>AppuntoAuth 0.0.1</title>
<link rel="SHORTCUT ICON" href="<?=base_url()?>resources/appunto-auth/favicon.ico">
<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/loading_mask.css" />
</head>
<body>
<div id="loading-mask"></div>
<div id="loading">
  <div class="loading-indicator">
    <span id="loading-msg">Loading styles and images...</span>
  </div>
</div>

<div id='script-includes'>

	<!-- ExtJS style sheets -->
	<link rel="stylesheet" type="text/css" href="http://cdn.sencha.io/ext-4.0.7-gpl/resources/css/ext-all.css">
	<!-- <link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-4.0.7-gpl/resources/css/ext-all.css"> -->
	<!-- <link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css"> -->

	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_app.css" />
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_login.css" />
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_curvy.css" />
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_branding.css" /> 
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/appunto_auth_icons.css" />

	<!-- set a base_url -->
	<script type="text/javascript">var appunto_auth_base_url = '<?=base_url()?>index.php/';</script>

	<!-- ExtJS library -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Sencha ExtJS...';</script>
	<script type="text/javascript" src="http://cdn.sencha.io/ext-4.0.7-gpl/ext-dev.js"></script>
	<!-- <script type="text/javascript" src="http://extjs.cachefly.net/ext-4.0.7-gpl/ext-dev.js"></script> -->
	<!-- <script type="text/javascript" src="extjs/ext-dev.js"></script> -->

	<!-- Application requirements -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
	<script type="text/javascript" src="<?=base_url()?>app.js"></script>

</div>

<div id="app-user">
		 <?php echo login_box(false,'login-form-header') ?>
</div>

</body>
</html>
