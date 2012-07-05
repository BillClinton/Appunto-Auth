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
	<div class="login-form">
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
