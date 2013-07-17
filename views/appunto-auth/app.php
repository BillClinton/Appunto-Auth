<!DOCTYPE html>
<html>
<head>
    <title>AppuntoAuth 0.0.2</title>
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
    <link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/css/default/app.css">

	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/icons.css" />
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/app.css" />
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/curvy_appunto.css" /> 
	<link rel="stylesheet" type="text/css" href="<?=base_url()?>resources/appunto-auth/css/custom.css" /> 

	<!-- set base url, display type -->
	<script type="text/javascript">
		var ci_site_url = "<?=base_url()?>",
			ci_base_url = "<?=base_url()?>",
			ci_index 	= "<?=base_url()?>index.php"; //append index.php if necessary
	</script>

	<!-- Application requirements -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
	<script type="text/javascript" src="<?=base_url()?>all-classes.js"></script>

</div>

<div id="login-header">
<? echo login_header(); ?>
</div>

</body>
</html>
