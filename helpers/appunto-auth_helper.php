<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Appunto Auth helpers
 * 
 * A collection of helpers for including Appunto Auth components in your html 
 *
 */

/*
 *
 */
if ( ! function_exists('appunto_auth_admin'))
{
	function appunto_auth_admin($ext_theme = false)
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		$js_config = $CI->appunto_auth->jsConfigItems();

		log_message('error','appunto_auth_admin');
		$base_url = base_url();
		$site_url = site_url();
		log_message('error','appunto_auth_admin1');
		$site_name = config_item('site_name', 'appunto_auth');
		log_message('error','appunto_auth_admin2');
		$lang = config_item('language');
		log_message('error','/appunto_auth_admin');
/*
	<script type="text/javascript">
		var ci_site_url = "{$site_url}",
			ci_base_url = "{$base_url}";
	</script>
*/

		

		$html = <<<APP
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">

    <title>{$site_name}</title>

	<link rel="icon" type="image/ico" href="{$base_url}resources/appunto-auth/favicon.ico"/>


	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/app.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/icons.css" />

	{$js_config}	

	<!-- Include optional language file -->
	<script type="text/javascript" src="{$base_url}resources/appunto-auth/lang/{$lang}.js"></script>

	<script src="{$base_url}resources/appunto-auth/js/microloader.js"></script>

</head>
<body></body>
</html>
APP;
	log_message('error',$html);
	return $html;
	}
}
?>
