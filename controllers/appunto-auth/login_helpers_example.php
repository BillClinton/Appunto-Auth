<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * This controller/view combination demonstrates the use of the Appunto Auth helpers
 *
 * To try them out: 
 *
 * copy the examples/controllers/login_helpers_example.php from the appunto-auth sparks directory
 * to your application/controllers/appunto-auth directory 
 *
 * copy the examples/views/login_helpers_example.php from the appunto-auth sparks directory
 * to your application/views/appunto-auth directory 
 *
 * once copied to your applications directory, you should be able to access the examples at:
 * http://yourdomain.com/your-app-path/index.php/appunto-auth/login_helpers_example
 */
class Login_helpers_example extends CI_Controller {

	/**
	 * Example usage of Appunto Auth helpers
	 */
	public function index()
	{
		/**
		 * Load the appunto-auth helper. Required (obviously?)
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
		 * The login helpers require the form validation library.
		 *
		 * If you see a "Fatal error: Call to undefined function set_value()" error 
		 * on your pages it's because you left this out.
		 */
        $this->load->library('form_validation');

		/**
		 * load the example view
		 */
		$this->load->view('appunto-auth/login_helpers_example');
	}
}

/* End of file login_helpers_example.php */
/* Location: examples/controllers/login_helpers_example.php */
