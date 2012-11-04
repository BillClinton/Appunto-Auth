<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * This controller/view combination demonstrates the use of the Appunto Auth helpers
 *
 * To try them out: 
 *
 * copy the examples/controllers/examples.php from the appunto-auth sparks directory
 * to your application/controllers/appunto-auth directory 
 *
 * copy the examples/views/examples from the appunto-auth sparks directory
 * to your application/views/appunto-auth directory 
 *
 * once copied to your applications directory, you should be able to access the examples at:
 * http://yourdomain.com/your-app-path/index.php/appunto-auth/example
 */
class Examples extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');

		$this->load->view('appunto-auth/examples/index');
	}

	/**
	 * Example usage of Appunto Auth application helper
	 */
	public function app()
	{
		/**
		 * Load the appunto-auth helper. Required. 
		 */
        $this->load->helper('appunto-auth');

		/**
		 * load the example view
		 */
		$this->load->view('appunto-auth/examples/app');
	}

	/**
	 * Example usage of Appunto Auth application helper in a viewport
	 */
	public function viewport()
	{
		/**
		 * Load the appunto-auth helper. Required. 
		 */
        $this->load->helper('appunto-auth');

		/**
		 * load the example view
		 */
		$this->load->view('appunto-auth/examples/viewport');
	}

	/**
	 * Example usage of Appunto Auth login box 
	 */
	public function login_box()
	{
		/**
		 * Load the appunto-auth helper. Required. 
		 */
        $this->load->helper('appunto-auth');

		/**
		 * Load the language helper and the appunto-auth language file.
		 *
		 * These are recommended, but technically not required.
		 *
		 * Quick Tip: if these are not loaded correctly, your form labels will be lowercase "login,password,submit"
		 * If you are loading the language file properly, the default english values for these labels are
		 * capitalized. 
		 */
		$this->load->helper('language');
		$this->lang->load('appunto_auth');

		/**
		 * load the example view
		 */
		$this->load->view('appunto-auth/examples/login-box');
	}

	/**
	 * Example usage of Appunto Auth login header 
	 */
	public function login_header()
	{
		/**
		 * Load the appunto-auth helper. Required. 
		 */
        $this->load->helper('appunto-auth');

		/**
		 * Load the language helper and the appunto-auth language file.
		 *
		 * These are recommended, but technically not required.
		 *
		 * Quick Tip: if these are not loaded correctly, your form labels will be lowercase "login,password,submit"
		 * If you are loading the language file properly, the default english values for these labels are
		 * capitalized. 
		 */
		$this->load->helper('language');
		$this->lang->load('appunto_auth');

		/**
		 * load the example view
		 */
		$this->load->view('appunto-auth/examples/login-header');
	}
}

/* End of file examples.php */
/* Location: examples/controllers/examples.php */
