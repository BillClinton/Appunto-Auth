<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Application extends CI_Controller {

    function __construct()
    {
        parent::__construct();

        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        $this->load->library('security');
        $this->load->library('appunto_auth');
        $this->lang->load('appunto_auth');
        $this->load->helper('appunto-auth');
    }

	public function index()
	{

		$data= array();

		if (isset($this->session->userdata['username']))
		{
			$data['username']= $this->session->userdata['username'];
		}

		$this->load->view('appunto-auth/app',$data);
		//$this->load->view('appunto-auth/app_src',$data);
	}
}
/* End of file application.php */
/* Location: ./application/controllers/application.php */
