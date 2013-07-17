<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once('phpass-0.3/PasswordHash.php');

class Appunto_auth
{
	/**
	 * Constructor. 
	 * Load config and url helper.
	 */
    public function __construct()
    {
		log_message('error','library constructor');
		$this->CI =& get_instance();

		$this->CI->load->config('appunto_auth',true,false); // true to avoid naming collisions, false to not suppress errors
		$this->CI->lang->load('appunto_auth');

		$this->CI->load->library('session');
		$this->CI->load->helper('url');
		$this->CI->load->helper('language');

        $this->CI->load->model('pathmodel');
        $this->CI->load->model('usermodel');

		$this->cache_paths = $this->CI->config->item('cache_paths', 'appunto_auth');
		$this->path_cache_duration = $this->CI->config->item('path_cache_duration', 'appunto_auth');

    }

	/**
     * Check if user is logged in 
	 * 
	 * @return	void 
	*/
	public function logged_in()
	{
		return ($this->CI->session->userdata('logged_in') == true);
	}

	/**
     * Get username if user is logged in 
	 * 
	 * @return	void 
	*/
	public function get_username()
	{
		if ($this->CI->session->userdata('logged_in') == true)
		{ 
			return ($this->CI->session->userdata('username'));
		}
		return false;
	}

	/**
     * Get user id if user is logged in 
	 * 
	 * @return	void 
	*/
	public function get_user_id()
	{
		if ($this->CI->session->userdata('logged_in') == true)
		{ 
			return ($this->CI->session->userdata('user_id'));
		}
		return false;
	}

	/**
	 * Hook to be executed before controller 
	 * This hook must be included in CodeIgniter's config/hooks.php file using 
	 * the following format:
	 *
	 * $hook['post_controller_constructor'] = array(
	 * 	'class'    => 'Appunto_auth',
	 * 	'function' => 'require_authentication_hook',
	 * 	'filename' => 'Appunto_auth.php',
	 * 	'filepath' => 'libraries',
	 * 	'params'   => array()
	 * );
	 *
	 * @return	void 
	 */
	public function require_authentication_hook() 
	{
		$this->cnt++;
//		log_message('error','cnt: '.$this->cnt);

		$paths 		= $this->_getPaths();
		$ci_class	= $this->CI->router->fetch_class();
		$ci_method	= $this->CI->router->fetch_method();

		die;

		// Test validity of path
		if (array_key_exists($ci_class,$paths) && 
			array_key_exists($ci_method,$paths[$ci_class]))
		{
			// Valid path - store it in a variable for brevity
			$path = $paths[$ci_class][$ci_method];

			//  Test if path is public
			if ($path['public_flag'] == 1)
			{
				// Valid, public path - return
				return;  
			}
			else
			{
				// Valid, private path - make sure user is logged in
				if ($this->logged_in()) 
				{
					// User is logged in, check if path has required permission
					if (is_numeric($path['perm']) && $path['perm'] > 0)
					{
						// Path has a required permission - check if user has this permission
						//$user_permissions = $this->_getPermissions();
						//if (in_array($path['perm'],$user_permissions,true))
						if ($this->userHasPermission($path['perm']))
						{
							// User has Permission - return
							return;
						}
						else
						{
							// User does not have required permission 
							$this->_sendError($this->CI->lang->line('appunto_not_authorized'));
							die;
						}
					}
					else
					{
						// Path has no required permission - check if config allows private without permission
						if ($this->CI->config->item('allow_private_without_permission','appunto_auth'))
						{
							// Paths without permissions are viewable by logged-in users
							return;
						}
						else
						{
							// User does not have required permission 
							$this->_sendError($this->CI->lang->line('appunto_not_authorized'));
							die;
						}
					}
				} 
				else 
				{
					// User is not logged in
					$this->_sendError($this->CI->lang->line('appunto_login_required'),true);
					die;
				} 
			}
		}
		else
		{
			// Path is not in database
			$this->_sendError($this->CI->lang->line('appunto_invalid_path'));
			die;
		}
		die; //shouldn't arrive here
	}
			
	/**
	 * send auth error
	 *
	 * @param string
	 * @return	void
	 */
	public function sendError($msg, $login=false)
	{
		$ajax	= $this->_isAjaxRequest();

		if ($ajax)
		{
			$result = array (
				'success'   => false,
				'msg'       => $msg
			);
			$this->sendResponse($result);
		}
		else
		{
        	$this->CI->load->helper('appunto-auth');

			$view = $login ? 'appunto-auth/login' : 'appunto-auth/error';
			$data['site_name'] = $this->CI->config->item('site_name', 'appunto_auth');
			$data['auth_message'] = $msg;

			echo($this->CI->load->view($view,$data,true));
		}
	}
			

	/**
	 * Return an array of paths.
	 *
	 * @return	array 
	 */
	public function getPaths()
	{
		$path_array = array();
        $result 	= $this->CI->pathmodel->enumerate();

		if (isset($result['rows']) && is_array($result['rows'])) 
		{
			$rows = $result['rows'];
			foreach ($rows as $row)
			{
				$perm_id = intval($row->permission_id); //tighten this up *******************************************************
				$path_array[strtolower($row->ci_controller)][strtolower($row->ci_method)] = array(
					'public_flag'	=> $row->public_flag,
					'perm'			=> $perm_id,
					'perm_string'	=> $row->internal_name
				);
			}
		}
		return $path_array;
	}

	/**
	 * check if user has role.
	 *
	 * @return	boolean
	 */
	public function userHasRole($role_id)
	{
		$user_id = $this->CI->session->userdata('user_id');

		return ($this->CI->usermodel->verifyRoleById($user_id,$role_id) > 0);
	}

	/**
	 * check if user has permission.
	 *
	 * @return	boolean
	 */
	public function userHasPermission($permission)
	{
		log_message('error','check perm');
		log_message('error',print_r($permission,true));
		$user_id = $this->CI->session->userdata('user_id');

		if (gettype($permission)=='string')
		{
			log_message('error','perm is a string');
			return $this->CI->usermodel->verifyPermissionByName($user_id,$permission);
		}
		else if (gettype($permission)=='integer')
		{
			log_message('error','perm is an int');
			return $this->CI->usermodel->verifyPermissionById($user_id,$permission);
		}
		return false;
	}

	/**
	 * Return an array of user permissions.
	 *
	 * @return	array 
	 */
	private function _getPermissions()
	{
		$user_id = $this->CI->session->userdata('user_id');
		if (isset($user_id) && is_numeric($user_id) && $user_id > 0) 
		{
			return $this->CI->usermodel->get_user_permission_array($user_id);
		}
		return array();
	}

	/**
	 * Test to determine if request was submitted via Ajax
	 *
	 * This is a convenience method to identify Ajax requests so responses can be 
	 * structured appropriately. It is not intended to provide any additional security.
	 *
	 * Specifically, authentication failures for normal controllers/views will 
	 * redirect to the login page or show an error message while authentication 
	 * failures for JSON requests will offer an ExtJS login dialog or return an 
	 * error message in JSON format;
	 *
	 * This cannot be depended on to return an accurate result since headers can 
	 * be faked and some servers may not provide the HTTP_X_REQUESTED_WITH variable. 
	 *
	 * For servers that don't provide the HTTP_X_REQUESTED_WITH variable, I suggest 
	 * including a flag with AJAX requests and rewritting this function to check for 
	 * the flag.
	 * 
	 * @return	boolean
	 */
	private function _isAjaxRequest()
	{
		return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
				(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'));
	}

	/**
     * Create an array of URLs for use in helper.
	 * 
	 * @return	array
	*/
	public function include_urls()
	{

		$urls = array();

		$urls['base'] = base_url();
		$urls['extjs'] = $this->CI->config->item('extjs_url', 'appunto_auth');

		if (true === $this->CI->config->item('appunto_dev_mode', 'appunto_auth'))
		{
			$urls['extjs_lib'] = $urls['extjs'].'ext-dev.js';
			$urls['app'] = $urls['base'].'app.js';
		} 
		else 
		{
			$urls['extjs_lib'] = $urls['extjs'].'ext.js';
			$urls['app'] = $urls['base'].'resources/appunto-auth/app-all.js';
		}
		return $urls;
	}

	/**
	 * return a hash of the user password. 
	 *
	 * @param string
	 * @return string
	 */
	public function hashPassword($password) 
	{
		$hasher = new PasswordHash(
				$this->CI->config->item('hash_logarithm', 'appunto_auth'),
				$this->CI->config->item('hash_use_portable', 'appunto_auth')
		);
		return $hasher->HashPassword($password);
	}

	/**
	 * compare a password to a hashed password. 
	 *
	 * @param string
	 * @param string
	 * @return boolean
	 */
	public function checkPassword($password,$hash) 
	{
		$hasher = new PasswordHash(
				$this->CI->config->item('hash_logarithm', 'appunto_auth'),
				$this->CI->config->item('hash_use_portable', 'appunto_auth')
		);
		return $hasher->checkPassword($password,$hash);
	}

    /**
     * Check query validity and format result array for queries
     *
	 * @param	array 	results
	 * @param	array 	callback
	 * @return	string 	JSON encoded response
     */
	function sendResponse($results, $cb = null)
	{
        // if callback was sent use it, otherwise check GET
        $callback = $cb==null ? $this->CI->input->get('callback', TRUE) : $cb;

        if ($callback)
        {
            // wrap json encoded response in callback 
            // header('Content-Type: application/x-javascript; charset=utf-8');
            $result = $callback . '(' . json_encode($results) . ');';
        } else {
            // send json encoded response
            header('Content-Type: application/x-json; charset=utf-8');
            $result = json_encode($results);
        }
        echo $result;
	}

    /**
     * Check query validity and format result array for queries
     *
	 * @param	query
	 * @return	array
     */
	function formatQueryResult($query,$total)
    {
        if ($query) 
        {
            $query_result = $query->result();
            $total = $total;
            $result = array (
                'success' => true,
                'total' => $total,
                'rows' => $query_result
            );
        } 
        else 
        {
            $result = array (
                'success' => false,
                'msg' => 'Database Error: '.$this->db->_error_message(),
                'num' => $this->db->_error_number()
            );
        }
        return $result;
    }

    /**
     * Check query validity and format result array for operations
     *
	 * @param	query
	 * @return	array
     */
	function formatOperationResult($query, $record = array())
    {
        //$this->chromephp->log($extra_params);
        if ($query) 
        {
            // query successful
            $result = array(
                'success'   => true,
                'msg'       => 'Operation successful'
            );

            if (count($record)>0) 
            {
				$rows = array(
					'rows'	=> $record
				);
                $result = array_merge($result,$rows);
            }
        } 
        else 
        {
            // database error 
            $result = array (
                'success' => false,
                'msg' => 'Database Error: '.$this->db->_error_message(),
                'num' => $this->db->_error_number()
            );
        }
        return $result;
    }

/*
 * ***** CONTROLLER CODE ****** O__o
 * Putting code that would normally be controller functions in the library to keep the Paths/permissions 
 * manageable and to make it easier to distribute as a spark. 
 */	
	function controller_read($model)
	{
        $start  = $this->CI->input->get_post('start', TRUE);
        $limit  = $this->CI->input->get_post('limit', TRUE);
        $sort   = $this->CI->input->get_post('sort', TRUE);
        $filter = $this->CI->input->get_post('filter', TRUE);

        $property = null;
        $direction = null;
        $active_filter = false;

        // get sort params
        $sort_array = json_decode($sort);
        if (count($sort_array) > 0)
        {
            $property = $sort_array[0]->property;
            $direction = $sort_array[0]->direction;
        }

		$filters = json_decode($filter);

        $result = $model->enumerate($start,$limit,$property,$direction,$filters);

        $this->sendResponse($result);
	}

    function controller_create($model)
    {
        if (!$this->CI->form_validation->run()) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'Your form had errors.  Please correct them and try again',
                'errors'    => validation_errors()
            );
        } 
        else 
        {
			// return all POST items with XSS filter
            $data = $this->CI->input->post(NULL, TRUE); 

            // get result
            $result = $model->create_record($data);
        }
        $this->sendResponse($result);
	}

    function controller_update($model)
    {
        if (!$this->CI->form_validation->run()) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'Your form had errors.  Please correct them and try again',
                'errors'    => validation_errors()
            );
        } 
        else 
        {
			// return all POST items with XSS filter
            $data = $this->CI->input->post(NULL, TRUE);

			if (count($data)>1)
			{
            	$result = $model->update_record($data);
			}
			else
			{
				$result = array (
					'success'   => false,
					'msg'       => 'No updates attempted.'
            	);
			}
        }
        $this->sendResponse($result);
	}

    function controller_destroy($model)
    {
		// create array from post data
		$data = $this->CI->input->post(NULL, TRUE);

        if (!$this->CI->form_validation->run()) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'Your form had errors.  Please correct them and try again',
                'errors'    => validation_errors()
            );
        } 
        else 
        {
            $result = $model->delete_record($data);
        }
        $this->sendResponse($result);
	}
};

