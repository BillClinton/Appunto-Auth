<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

    function __construct()
    {
        parent::__construct();

        $this->load->library('appunto-auth/appunto_auth');

        $this->load->library('form_validation');
    }

	public function login()
	{
		if (isset($_SERVER['HTTP_REFERER']))
		{
			$this->session->set_userdata('prev_url', $_SERVER['HTTP_REFERER']);
		}
		else
		{
			$this->session->set_userdata('prev_url', base_url());
		}  


        $this->load->helper('appunto-auth/appunto-auth');

		if ($this->appunto_auth->logged_in()) redirect($this->router->default_controller);

		$data = array();
		$data['auth_message'] = $this->session->flashdata('auth_message');
		$data['site_name'] = $this->config->item('site_name', 'appunto-auth/appunto_auth');

		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$this->load->view('appunto-auth/login',$data);
		}
		else if ($_SERVER['REQUEST_METHOD'] == 'POST')
		{

			$this->form_validation->set_rules('username', 'lang:appunto_form_username', 'trim|required|xss_clean');
			$this->form_validation->set_rules('password', 'lang:appunto_form_password', 'trim|required|xss_clean');

			$username 	= $this->input->post('username', TRUE);
			$ip_address	= $this->input->ip_address();
			$user_agent	= $this->input->user_agent();

			if (!$this->form_validation->run())
			{
				$this->usermodel->record_login_attempt($username, $ip_address, 0, $user_agent, 'form validation: '.validation_errors('[',']'));
				//$uri = $this->input->post('url', TRUE);
				$this->load->view('appunto-auth/login',$data);
			}
			else
			{
				$user = $this->usermodel->getLoginInfo( $this->input->post('username', TRUE) );
				$pass = $this->input->post('password', TRUE);
				
				if (($user != false) && $this->appunto_auth->checkPassword($pass,$user->password))
				{
					$this->usermodel->record_login_attempt($username, $ip_address, 1, $user_agent, 'successful login');
					$this->usermodel->update_last_login($username,$ip_address);

					$this->session->set_userdata(array(
						'user_id'	=> $user->id,
						'username'	=> $user->username,
						'email'		=> $user->email,
						'logged_in'	=> true
					));
					redirect($this->router->default_controller);
				}
				else
				{
					$this->form_validation->set_rules('password', 'lang:appunto_form_password', 'callback__invalid_password');
					$this->form_validation->run();
					$this->usermodel->record_login_attempt($username, $ip_address, 0, $user_agent, 'password check: '.validation_errors('[',']'));
					$this->load->view('appunto-auth/login',$data);
				}
			}
		}
		else die('invalid request method:'.$_SERVER['REQUEST_METHOD']);
	}

	public function error()
	{
		$data = array();
		$data['site_name'] = $this->config->item('site_name', 'appunto-auth/appunto_auth');
		$data['auth_message'] = lang('appunto_message_default_error');

		$auth_message = $this->session->flashdata('auth_message');
		if (isset($auth_message) && strlen($auth_message)>3) 
		{
			$data['auth_message'] = $auth_message;
		}

		$this->load->view('error',$data);
	}

	/*
	 * callback function for form validation
	 */
	public function _invalid_password($str)
	{
		$this->form_validation->set_message('_invalid_password', lang('appunto_form_invalid_login'));
		return false;
	}

	public function logout()
	{
		$this->session->set_userdata(array(
			'user_id'	=> '',
			'username'	=> '',
			'email'		=> '',
			'logged_in'	=> false
		));
		$_SESSION = array();
		$this->session->set_flashdata('auth_message', lang('appunto_message_logout'));
		redirect(rtrim(site_url(), "/").'/'.$this->config->item('login_url','appunto-auth/appunto_auth'));
	}

	// Not yet implemented... will work on this for a future version
	public function _forgotpassword()
	{
		//if ($this->appunto_auth->logged_in()) redirect($this->router->default_controller);

		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$data = array();
			$data['site_name'] = $this->config->item('site_name', 'appunto-auth/appunto_auth');

			$auth_message = $this->session->flashdata('auth_message');
			if (isset($auth_message) && strlen($auth_message)>3) 
			{
				$data['auth_message'] = $auth_message;
			}

			$this->load->view('forgotpass',$data);
		}
		else if ($_SERVER['REQUEST_METHOD'] == 'POST')
		{

			$this->form_validation->set_rules('username', 'lang:appunto_form_forgot_pw_username', 'trim|required|xss_clean');

			if (!$this->form_validation->run())
			{
				$this->load->view('forgotpass');
			}
			else
			{
			}
		}
		else die('invalid request method');
	}

}
/* End of file application.php */
/* Location: ./application/controllers/application.php */
