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
	function appunto_auth_application($ext_theme = false)
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		$urls = $CI->appunto_auth->include_urls();

		$base_url = base_url();
		$site_url = site_url();

		$ext_stylesheet = '<link rel="stylesheet" type="text/css" href="'.$urls['extjs'].'resources/css/ext-all.css">';	
		if ($ext_theme != false)
		{
			$ext_stylesheet = '<link rel="stylesheet" type="text/css" href="'.$urls['extjs'].'resources/css/ext-all-'.$ext_theme.'.css">';
		}
				
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
    <link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/build/app.css">
	{$ext_stylesheet}	

	<!-- Application style sheets -->
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/icons.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/app.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/custom.css" />
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/css/curvy_appunto.css" /> 

	<!-- set base url, display type -->
	<script type="text/javascript">
		var ci_site_url = "{$site_url}",
			ci_base_url	= "{$base_url}",
			ci_index 	= "{$base_url}index.php"; //append index.php if necessary
	</script>

	<!-- Application requirements -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
	<script type="text/javascript" src="{$base_url}resources/appunto-auth/build/appunto-auth-all.js"></script>

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

		$CI->load->config('appunto_auth',true,false); // true to avoid naming collisions, false to not suppress errors
		$site_name = "<div class='site_name'>".$CI->config->item('site_name', 'appunto_auth')."</div>";

		$urls = $CI->appunto_auth->include_urls();

		$base_url = base_url();
		$site_url = site_url();

		/** 
		 * If language library is loaded, set labels.  If not, set to false which is also 
		 * the return value for the lang function if the language string is not found.
		 */
		$label_username = (function_exists('lang')) ? lang('appunto_form_username') : false;
		$label_password = (function_exists('lang')) ? lang('appunto_form_password') : false;
		$label_login_button = (function_exists('lang')) ? lang('appunto_form_login_button') : false;
		$label_logout_button = (function_exists('lang')) ? lang('appunto_form_logout_button') : false;

		$label_username = (false != $label_username) ? $label_username : 'login:';
		$label_password = ($label_password) ? $label_password : 'password:';
		$label_login_button = ($label_login_button) ? $label_login_button : 'submit';
		$label_logout_button = ($label_logout_button) ? $label_logout_button : 'logout';

		$login = array(
			'name'	=> 'username',
			'id'	=> 'username',
			'value' => set_value('username'),
			'maxlength'	=> 80
		);
		$password = array(
			'name'	=> 'password',
			'id'	=> 'password'
		);

		$message_div = '';
		if (isset($auth_message)) {
			$message_div = "<div id='login-form-auth-message' class='login-form-auth-message'>$auth_message</div>";
		} 
		else if ($CI->appunto_auth->logged_in()) {
			$message_div = "<div id='login-form-auth-message' class='login-form-auth-message'>You are already logged in.</div>";
		}

		$validation_errors = validation_errors();

		$field_username = form_input($login);
		$field_password = form_password($password);
		$field_uri 		= form_hidden('uri',set_value('uri',$CI->uri->uri_string()));
		$login_button	= form_submit(array('name'=>'login','value'=>$label_login_button,'id'=>'login-button'));
		$logout_button	= form_submit(array('name'=>'logout','value'=>$label_logout_button,'id'=>'logout-button'));

		$login_form_open = form_open('login');
		$logout_form_open = form_open('logout');
		$form_close = form_close();

		if ($CI->appunto_auth->logged_in()) {

		$html = <<<LOGINBOX
	<div class="$css">
		$site_name
		$logout_form_open
		$message_div
		$logout_button
		$form_close
	</div>
LOGINBOX;

		} else {

		$html = <<<LOGINBOX
	<div class="$css">
		$site_name
		$login_form_open
		$message_div
		<div class="login-form-errors">$validation_errors</div>
		$field_uri
		<label>$label_username $field_username</label>
		<label>$label_password $field_password</label>
		$login_button
		$form_close
	</div>
LOGINBOX;

		}

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

		$CI->load->config('appunto_auth',true,false); // true to avoid naming collisions, false to not suppress errors
		$site_name = "<div class='site_name'>".$CI->config->item('site_name', 'appunto_auth')."</div>";

		$urls = $CI->appunto_auth->include_urls();

		/** 
		 * If language library is loaded, set labels.  If not, set to false which is also 
		 * the return value for the lang function if the language string is not found.
		 */
		$label_username = (function_exists('lang')) ? lang('appunto_form_username') : false;
		$label_password = (function_exists('lang')) ? lang('appunto_form_password') : false;
		$label_login_button = (function_exists('lang')) ? lang('appunto_form_login_button') : false;
		$label_logout_button = (function_exists('lang')) ? lang('appunto_form_logout_button') : false;

		$label_username = (false != $label_username) ? $label_username : 'login:';
		$label_password = ($label_password) ? $label_password : 'password:';
		$label_login_button = ($label_login_button) ? $label_login_button : 'submit';
		$label_logout_button = ($label_logout_button) ? $label_logout_button : 'logout';

		$login = array(
			'name'	=> 'username',
			'id'	=> 'username',
			'value' => set_value('username'),
			'maxlength'	=> 80
		);
		$password = array(
			'name'	=> 'password',
			'id'	=> 'password'
		);

		$message_div = '';
		if ($CI->appunto_auth->logged_in()) {
			$message_div = "<div id='login-form-auth-message' class='login-form-auth-message'>logged in as ".$CI->appunto_auth->get_username()."</div>";
		}

		$validation_errors = validation_errors();

		$field_username = form_input($login);
		$field_password = form_password($password);
		$field_uri 		= form_hidden('uri',set_value('uri',$CI->uri->uri_string()));
		$login_button	= form_submit(array('name'=>'login','value'=>$label_login_button,'id'=>'login-button'));
		$logout_button	= form_submit(array('name'=>'logout','value'=>$label_logout_button,'id'=>'logout-button'));

		$login_form_open = form_open('login');
		$logout_form_open = form_open('logout');
		$form_close = form_close();

		if ($CI->appunto_auth->logged_in()) {

		$html = <<<LOGINHEADER
	<div id="login-header">
		$site_name
	<div class="$css">
		$logout_form_open
		$message_div
		$logout_button
		$form_close
	</div>
	</div>
LOGINHEADER;

		} else {

		$html = <<<LOGINHEADER
	<div id="login-header">
		$site_name
	<div class="$css">
		$login_form_open
		$field_uri
		<label>$label_username $field_username</label>
		<label>$label_password $field_password</label>
		$login_button
		$form_close
	</div>
	</div>
LOGINHEADER;

		}

	return $html;
	}
}

if ( ! function_exists('user_permissions'))
{
	function user_permissions()
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		$user_id = $CI->appunto_auth->get_user_id();

        $CI->load->model('usermodel');
	
		$result = $CI->usermodel->get_user_permission_array($user_id);

		$permissions = 'var app_up = new Array('; 
		foreach ($result as $key => $perm)
		{
			$permissions .= $perm.',';
		}
		$permissions = rtrim($permissions,',');
		$permissions .= ');';

		$html = <<<APP
<div id='app-up'>
	<script type="text/javascript">
	{$permissions}
	</script>
</div>
APP;

	return $html;
	}
}
if ( ! function_exists('user_permissions_internal_name'))
{
	function user_permissions_internal_name()
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		$user_id = $CI->appunto_auth->get_user_id();

        $CI->load->model('usermodel');
	
		$result = $CI->usermodel->get_user_permission_internal_name_array($user_id);

		$permissions = 'var app_nm = ['; 
		foreach ($result as $key => $perm_internal_name)
		{
			$permissions .= '"'.$perm_internal_name.'",';
		}
		$permissions = rtrim($permissions,',');
		$permissions .= '];';

		$html = <<<APP
<div id='app-nm'>
	<script type="text/javascript">
	{$permissions}
	</script>
</div>
APP;

	return $html;
	}
}
?>
