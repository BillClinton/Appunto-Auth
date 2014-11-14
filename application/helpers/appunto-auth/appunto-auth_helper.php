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

		$base_url = base_url();
		$site_url = site_url();
		$site_name = $CI->config->item('site_name', 'appunto-auth/appunto_auth');
		$theme_dir = $CI->config->item('appunto_auth_theme', 'appunto-auth/appunto_auth');
		$lang = config_item('language');
		

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
	<link rel="stylesheet" type="text/css" href="{$base_url}resources/appunto-auth/theme/{$theme_dir}/theme.css" />

	{$js_config}	

	<!-- Include optional language file -->
	<script type="text/javascript" src="{$base_url}resources/appunto-auth/lang/{$lang}.js"></script>

	<script type="text/javascript">
		Ext = window.Ext || {}; Ext.Boot={};
	</script> 
	<script type="text/javascript" src="{$base_url}resources/appunto-auth/js/app.js"></script> 

</head>
<body></body>
</html>
APP;
	return $html;
	}
}

if ( ! function_exists('appunto_login_box'))
{
	function appunto_login_box($auth_message = false, $css = 'login-form-box')
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto-auth/appunto_auth');
		if (!isset($CI->form_validation)) $CI->load->library('form_validation');

		$CI->load->config('appunto-auth/appunto_auth',true,false); // true to avoid naming collisions, false to not suppress errors
		$site_name = "<div class='site_name'>".$CI->config->item('site_name', 'appunto-auth/appunto_auth')."</div>";

		$base_url = base_url();
		$site_url = site_url();

		$label_username = lang('appunto_form_username');
		$label_password = lang('appunto_form_password');
		$label_login_button = lang('appunto_form_login_button');
		$label_logout_button = lang('appunto_form_logout_button');

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
		if ($auth_message != false) {
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

		$login_form_open = form_open($CI->config->item('login_url', 'appunto-auth/appunto_auth'));
		$logout_form_open = form_open($CI->config->item('logout_url', 'appunto-auth/appunto_auth'));
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


/**
 * Anchor Link (if permitted)
 *
 * Creates an anchor based on the local URL if user has the appropriate permission.
 *
 * @access	public
 * @param	string	the permission's internal name
 * @param	string	the URL
 * @param	string	the link title
 * @param	mixed	any attributes
 * @return	string
 */
if ( ! function_exists('anchor_if_permitted'))
{
	function anchor_if_permitted($permission,$uri = '', $title = '', $attributes = '')
	{
		$CI =& get_instance();
		$CI->load->helper('url');

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		if ($CI->appunto_auth->userHasPermission($permission))
		{
			return anchor($uri,$title,$attributes);
		}
		else
		{
			return '';
		}
	}
}

/**
 * Username (if logged in)
 *
 * @access	public
 * @return	string
 */
if ( ! function_exists('appunto_username'))
{
	function appunto_username()
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

        $username = $CI->appunto_auth->get_username();

		if ($username != false)
		{
			return $username;
		}
		else
		{
			return '';
		}
	}
}

/**
 * appunto_logout_link 
 *
 * @access	public
 * @param	boolean show even if user is logged out
 * @param	mixed	any attributes for anchor helper
 * @return	string
 */
if ( ! function_exists('appunto_logout_link'))
{
	function appunto_logout_link($show_if_logged_out = false, $attributes = '')
	{
		$CI =& get_instance();
		$CI->load->helper('url');

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		if ($show_if_logged_out == true || $CI->appunto_auth->logged_in() == true)
		{
			return anchor($CI->config->item('logout_url', 'appunto-auth/appunto_auth'), lang('appunto_form_logout_button'), $attributes);
		}
		else
		{
			return '';
		}
	}
}

/**
 * is_logged_in 
 *
 * @access	public
 * @return	boolean
 */
if ( ! function_exists('is_logged_in'))
{
	function is_logged_in()
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		return ($CI->appunto_auth->logged_in() == true);
	}
}

/**
 * has_permission 
 *
 * @access	public
 * @param	string the permission's internal name
 * @return	string
 */
if ( ! function_exists('has_permission'))
{
	function has_permission($permission)
	{
		$CI =& get_instance();

		if (!isset($CI->appunto_auth)) $CI->load->library('appunto_auth');

		return ($CI->appunto_auth->userHasPermission($permission) == true);
	}
}

?>
