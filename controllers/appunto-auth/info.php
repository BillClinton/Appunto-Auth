
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Info extends CI_Controller {

	public function main() 
	{
		$this->load->view('appunto-auth/info/main.php');
	}

	public function status()
	{
		$this->load->config('appunto_auth',true,false); // true to avoid naming collisions, false to not suppress errors
		$data['appunto_auth_version'] = $this->config->item('appunto_auth_version', 'appunto_auth');
		$data['enable_hooks'] = $this->config->item('enable_hooks');
		$data['session_loaded'] = isset($this->session);
		$data['sess_use_database'] = $this->config->item('sess_use_database');
		$data['auth_loaded'] = isset($this->appunto_auth);
		$this->load->view('appunto-auth/info/status',$data);
	}

	public function application()
	{
		$this->load->config('appunto_auth',true,false); // true to avoid naming collisions, false to not suppress errors
		$data['appunto_auth_version'] = $this->config->item('appunto_auth_version', 'appunto_auth');

		$this->load->view('appunto-auth/info/application',$data);
	}

	public function credits()
	{
		$this->load->view('appunto-auth/info/credits');
	}

	public function license()
	{
		$this->load->view('appunto-auth/info/license');
	}
}
/* End of file info.php */
/* Location: ./application/controllers/appunto-auth/info.php */
