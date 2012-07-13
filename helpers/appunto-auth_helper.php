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
if ( ! function_exists('appunto_auth_application'))
{
	function appunto_auth_application($height="600px", $width="100%", $additional_css='')
	{
		$CI =& get_instance();

		$CI->load->config('appunto_auth',true,false); // true to avoid naming collisions, false to not suppress errors
		$extjs_url = $CI->config->item('extjs_url', 'appunto_auth');

		$base_url = base_url();

		$html = <<<APP
<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/loading_mask.css" />
<div id="loading-mask"></div>
<div id="loading">
  <div class="loading-indicator">
    <span id="loading-msg">Loading styles and images...</span>
  </div>
</div>
<div id='script-includes'>

	<!-- ExtJS style sheets -->
	<link rel="stylesheet" type="text/css" href="{$extjs_url}resources/css/ext-all.css">

	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_app.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_login.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_curvy.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_branding.css" /> 
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_icons.css" />

	<!-- set base url, display type and height -->
	<script type="text/javascript">
		var appunto_auth_base_url = '{$base_url}index.php/',	
			appunto_auth_display_type = 'container',
			appunto_auth_height = '$height';
	</script>

	<!-- ExtJS library -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Sencha ExtJS...';</script>
	<script type="text/javascript" src="{$extjs_url}ext-dev.js"></script>
	<!-- <script type="text/javascript" src="{$extjs_url}ext.js"></script> -->

	<!-- Application requirements -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
	<script type="text/javascript" src="{$base_url}app.js"></script>

</div>
<div id="appunto-auth-app-div" style="width:$width;height:$height;$additional_css">
</div>
APP;

	return $html;
	}
}
/*
 *
 */
if ( ! function_exists('appunto_auth_application_viewport'))
{
	function appunto_auth_application_viewport()
	{
		$CI =& get_instance();

		$base_url = base_url();

		$html = <<<APP
<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/loading_mask.css" />
<div id="loading-mask"></div>
<div id="loading">
  <div class="loading-indicator">
    <span id="loading-msg">Loading styles and images...</span>
  </div>
</div>
<div id='script-includes'>

	<!-- ExtJS style sheets -->
	<link rel="stylesheet" type="text/css" href="http://cdn.sencha.io/ext-4.0.7-gpl/resources/css/ext-all.css">

	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_app.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_login.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_curvy.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_branding.css" /> 
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_icons.css" />

	<!-- set a base_url -->
	<script type="text/javascript">var appunto_auth_base_url = '{$base_url}index.php/';</script>

	<!-- set display type -->
	<script type="text/javascript">var appunto_auth_display_type = 'viewport';</script>

	<!-- ExtJS library -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Sencha ExtJS...';</script>
	<!-- <script type="text/javascript" src="http://cdn.sencha.io/ext-4.0.7-gpl/ext.js"></script> -->
	<script type="text/javascript" src="http://cdn.sencha.io/ext-4.0.7-gpl/ext-dev.js"></script>
	<!-- <script type="text/javascript" src="http://extjs.cachefly.net/ext-4.0.7-gpl/ext-dev.js"></script> -->
	<!-- <script type="text/javascript" src="extjs/ext.js"></script> -->

	<!-- Application requirements -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
	<script type="text/javascript" src="{$base_url}app.js"></script>

</div>
APP;

	return $html;
	}
}

if ( ! function_exists('login_box'))
{
	function login_box($return=false, $css = 'login-form-box')
	{
		$CI =& get_instance();

		/** 
		 * If language library is loaded, set labels.  If not, set to false which is also 
		 * the return value for the lang function if the language string is not found.
		 */
		$label_username = (function_exists('lang')) ? lang('appunto_form_username') : false;
		$label_password = (function_exists('lang')) ? lang('appunto_form_password') : false;
		$label_button = (function_exists('lang')) ? lang('appunto_form_button') : false;

		$label_username = (false != $label_username) ? $label_username : 'login';
		$label_password = ($label_password) ? $label_password : 'password';
		$label_button = ($label_button) ? $label_button : 'submit';

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

		$message_div = '';
		if (isset($auth_message)) {
			$message_div = "<div class='login-form-auth-message'>$auth_message</div>";
		}

		$validation_errors = validation_errors();

		$field_username = form_input($login);
		$field_password = form_password($password);
		$submit_button	= form_submit(array('name'=>'login','value'=>$label_button,'class'=>'round-button'));

		$form_open = form_open('appunto-auth/user/authenticate');
		$form_close = form_close();

		$html = <<<LOGINBOX
$form_open
<div class="login-wrap">
	<div class="$css">
		$message_div
		<div class="login-form-errors">$validation_errors</div>
		<div class="login-form-label">$label_username</div>
		<div class="login-form-field">$field_username</div>
		<div class="login-form-label">$label_password</div>
		<div class="login-form-field">$field_password</div>
		<div class="login-form-button">$submit_button</div>
		<div class="login-form-links"></div>
	</div>
</div>
$form_close
LOGINBOX;

	return $html;
	}
}

if ( ! function_exists('login_header'))
{
	function login_header()
	{
		$CI =& get_instance();

		/** 
		 * If language library is loaded, set labels.  If not, set to false which is also 
		 * the return value for the lang function if the language string is not found.
		 */
		$label_username = (function_exists('lang')) ? lang('appunto_form_username') : false;
		$label_password = (function_exists('lang')) ? lang('appunto_form_password') : false;
		$label_button = (function_exists('lang')) ? lang('appunto_form_button') : false;

		$label_username = (false != $label_username) ? $label_username : 'login';
		$label_password = ($label_password) ? $label_password : 'password';
		$label_button = ($label_button) ? $label_button : 'submit';

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

		$message_div = '';
		if (isset($auth_message)) {
			$message_div = "<div class='login-form-auth-message'>$auth_message</div>";
		}

		$validation_errors = validation_errors();

		$field_username = form_input($login);
		$field_password = form_password($password);
		$submit_button	= form_submit(array('name'=>'login','value'=>$label_button,'class'=>'round-button'));

		$form_open = form_open('appunto-auth/user/authenticate');
		$form_close = form_close();

		$html = <<<LOGINBOX
$form_open
<div class="login-wrap">
	<div class="login-form-header">
		$message_div
		<div class="login-form-errors">$validation_errors</div>
		<div class="login-form-label">$label_username</div>
		<div class="login-form-field">$field_username</div>
		<div class="login-form-label">$label_password</div>
		<div class="login-form-field">$field_password</div>
		<div class="login-form-button">$submit_button</div>
		<div class="login-form-links"></div>
	</div>
</div>
$form_close
LOGINBOX;

	return $html;
	}
}
?>
