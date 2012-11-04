<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

    function __construct()
    {
        parent::__construct();

        $this->load->model('usermodel');
//        $this->load->helper('form');
        $this->load->helper('url');
//        $this->load->helper('language');
        $this->load->library('form_validation');
		$this->load->library('session');
        $this->load->library('appunto_auth');
		$this->load->config('appunto_auth',true,false);
		$this->lang->load('appunto_auth');
    }

	public function index()
	{
//		redirect('login');
		echo('login');
		die;
	}

	public function login()
	{
        $this->load->helper('appunto-auth');

		if ($this->appunto_auth->logged_in()) redirect($this->router->default_controller);

		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{

			$data = array();
			$auth_message = $this->session->flashdata('auth_message');
			if (isset($auth_message) && strlen($auth_message)>3) 
			{
				$data['auth_message'] = $auth_message;
			}
			$data['site_name'] = $this->config->item('site_name', 'appunto_auth');
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
				$this->load->view('appunto-auth/login');
			}
			else
			{
				$user = $this->usermodel->getLoginInfo( $this->input->post('username', TRUE) );
				$pass = $this->input->post('password', TRUE);
				
				if (($user != false) && $this->appunto_auth->checkPassword($pass,$user->password))
				{
					$this->usermodel->record_login_attempt($username, $ip_address, 1, $user_agent, 'successful login');

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
					$this->load->view('appunto-auth/login');

				}
			}
		}
		else die('invalid request method:'.$_SERVER['REQUEST_METHOD']);
	}

/*
	public function authenticate()
	{
        $this->load->helper('appunto-auth');

		if ($this->appunto_auth->logged_in()) redirect($this->router->default_controller);

		if ($_SERVER['REQUEST_METHOD'] == 'POST')
		{

			$this->form_validation->set_rules('username', 'lang:appunto_form_username', 'trim|required|xss_clean');
			$this->form_validation->set_rules('password', 'lang:appunto_form_password', 'trim|required|xss_clean');

			if (!$this->form_validation->run())
			{
				//$uri = $this->input->post('url', TRUE);
				$this->load->view('appunto-auth/login');
			}
			else
			{
				$user = $this->usermodel->getLoginInfo( $this->input->post('username', TRUE) );
				$pass = $this->input->post('password', TRUE);
				
				if (($user != false) && $this->appunto_auth->checkPassword($pass,$user->password))
				{
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
					$this->load->view('appunto-auth/login');

				}
			}
		}
		else die('invalid request method:'.$_SERVER['REQUEST_METHOD']);
	}
*/

	public function error()
	{
		$data = array();
		$data['site_name'] = $this->config->item('site_name', 'appunto_auth');
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
		redirect('/login/');
	}

	public function forgotpassword()
	{
		//if ($this->appunto_auth->logged_in()) redirect($this->router->default_controller);

		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$data = array();
			$data['site_name'] = $this->config->item('site_name', 'appunto_auth');

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

	public function login_attempts()
	{
        $start  = $this->input->get_post('start', TRUE);
        $limit  = $this->input->get_post('limit', TRUE);
        $sort   = $this->input->get_post('sort', TRUE);
        $filter = $this->input->get_post('filter', TRUE);

        $property = null;
        $direction = null;
        //$active_filter = false;

        // get sort params
        $sort_array = json_decode($sort);
        if (count($sort_array) > 0)
        {
            $property = $sort_array[0]->property;
            $direction = $sort_array[0]->direction;
        }

		$filters = json_decode($filter);

        $results = $this->usermodel->login_attempts($start,$limit,$property,$direction,$filters);

        $this->appunto_auth->sendResponse($results);

	}
}
/* End of file application.php */
/* Location: ./application/controllers/application.php */
