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
	function appunto_auth_application($width="100%", $height="600px", $additional_css='')
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		$urls = $CI->appunto_auth->include_urls();

		$base_url = base_url();
		$site_url = site_url();

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
	<link rel="stylesheet" type="text/css" href="{$base_url}/extjs/resources/css/ext-all.css">

	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_app.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_login.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_curvy.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_branding.css" /> 
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_icons.css" />

	<!-- set base url, display type -->
	<script type="text/javascript">
		var ci_site_url = "{$site_url}",
			ci_base_url	= "{$base_url}",
			appunto_auth_display_type = 'container';
			appunto_auth_height = "{$height}" 
	</script>

	<!-- ExtJS library -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Sencha ExtJS...';</script>
	<script type="text/javascript" src="{$urls['extjs_lib']}"></script>

	<!-- Application requirements -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
	<!-- <script type="text/javascript" src="{$base_url}app.js"></script> -->
	<script type="text/javascript" src="{$base_url}resources/appunto-auth/app-all.js"></script>

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

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		$urls = $CI->appunto_auth->include_urls();

		$base_url = base_url();
		$site_url = site_url();

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
	<link rel="stylesheet" type="text/css" href="{$urls['extjs']}resources/css/ext-all.css">

	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_app.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_login.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_curvy.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_branding.css" /> 
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/appunto_auth_icons.css" />

	<!-- set base url, display type -->
	<script type="text/javascript">
		var ci_site_url = "{$site_url}",
			ci_base_url	= "{$base_url}",
			appunto_auth_display_type = 'viewport';
	</script>

	<!-- ExtJS library -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Sencha ExtJS...';</script>
	<script type="text/javascript" src="{$urls['extjs_lib']}"></script>

	<!-- Application requirements -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
	<!-- <script type="text/javascript" src="{$base_url}app.js"></script> -->
	<script type="text/javascript" src="{$base_url}resources/appunto-auth/app-all.js"></script>

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

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');
		if (!isset($CI->form_validation)) $CI->load->library('form_validation');

		$urls = $CI->appunto_auth->include_urls();

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
		$field_uri = form_hidden('uri',set_value('uri',$CI->uri->uri_string()));
		$submit_button	= form_submit(array('name'=>'login','value'=>$label_button,'class'=>'round-button'));

		$form_open = form_open('appunto-auth/user/authenticate');
		$form_close = form_close();

		$html = <<<LOGINBOX
<div id='script-includes'>
	<link rel="stylesheet" type="text/css" href="{$urls['base']}resources/appunto-auth/css/appunto_auth_login.css" />
</div>
$form_open
$field_uri
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
	function login_header($return=false, $css = 'login-form-header')
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');
		if (!isset($CI->form_validation)) $CI->load->library('form_validation');

		$urls = $CI->appunto_auth->include_urls();

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
		$field_uri = form_hidden('uri',set_value('uri',$CI->uri->uri_string()));
		$submit_button	= form_submit(array('name'=>'login','value'=>$label_button,'class'=>'round-button'));

		$form_open = form_open('appunto-auth/user/authenticate');
		$form_close = form_close();

		$html = <<<LOGINBOX
$form_open
$field_uri
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
$form_close
LOGINBOX;

	return $html;
	}
}
?>
