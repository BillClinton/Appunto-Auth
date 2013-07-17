<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Path extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();

        $this->load->model('pathmodel');
        $this->load->library('appunto_auth');
		$this->load->library('form_validation');
	}

	function read()
	{
        $result = $this->pathmodel->enumerate();

        $this->appunto_auth->sendResponse($result);
	}

	/**
	 * Find new paths
	 *
	 * @return	string 
	 */
	function verify_paths()
	{
		// start off by marking all paths unfound.  
		$this->pathmodel->mark_all_unfound();

		$data			= array();
		$controllers	= array();

		$dir 			= APPPATH.'controllers/';
		$files 			= scandir($dir);

		$controller_dirs = array_filter($files, function($filename) {
			$dir = APPPATH.'controllers/';  // not worth making it a global and "use" is only php 5.3+
			return (is_dir($dir.$filename) && $filename != '..');
		});

		$new_cnt = 0;
		$failed = array();
		foreach ($controller_dirs as $controller_dir) 
		{
			// get files in this directory
			$files = scandir($dir.$controller_dir);
			$controller_files = array_filter($files, function($filename) {
				return (substr(strrchr($filename, '.'), 1)=='php') ? true : false;
			});

			foreach ($controller_files as $filename)
			{
				$this_dir = ($controller_dir == '.') ? $dir : $dir.$controller_dir.'/';

				/**
				 *	If you are getting a fatal error on the line below, you probably have two controllers with the same name.
				 * 	Codeigniter supports controller classes with the same name in different directories, but Appunto Auth
				 *	currently does not. 
				 */
				$classname = ucfirst(substr($filename, 0, strrpos($filename, '.')));

				if (!class_exists($classname)||($classname == 'Path'))
				{

					if ($filename != 'path.php') require_once($this_dir.$filename);

					$classname = ucfirst(substr($filename, 0, strrpos($filename, '.')));
					$controller = new $classname();
					$methods = get_class_methods($controller);

					foreach ($methods as $method)
					{
						
						$full_path = ($controller_dir=='.') ? $filename : $controller_dir.'/'.$filename;

						if ($classname=='Permission') log_message('error', $classname.' - '.$method);
						
						if ($this->pathmodel->path_exists($controller_dir,$classname,$method))
						{
							$this->pathmodel->mark_found($controller_dir,$classname,$method);
						}
						else
						{
							if ((substr($method,0,1)!='_' && $method!='get_instance') || $method=='_remap') {
								$this->pathmodel->create_record($controller_dir,$filename,$full_path,$classname,$method,1);
								$new_cnt++;
							}
						}
					}
				}
				else
				{
					array_push($failed, $classname);
				}
			}
		}

		if (count($failed)>0) 
		{
			$msg = 'You have '.count($failed).' controller'.((count($failed)>1) ? 's':'').' with a duplicate name: ';
			$msg .= "<br>";
			$msg .= '<b>'.implode(",", $failed).'</b>';
			$msg .= "<br>";
			$msg .= 'Appunto Auth does not support controller classes with the same name in different directories.';
			$result = array (
				'success'   => false,
				'msg'       => $msg
			);
		}
		else
		{
			$result = array (
				'success'   => true,
				'msg'       => ($new_cnt == 0 ? 'No': $new_cnt).' new path'.($new_cnt == 0 || $new_cnt > 1 ? "s":"").' found.',
				'total'		=> $new_cnt
			);
		}
//		log_message('error',print_r($result,true));

        $this->appunto_auth->sendResponse($result);
	}

    function update()
    {
        $this->form_validation->set_rules('id', 'ID', 'trim|require|xss_clean');
        $this->form_validation->set_rules('public_flag', 'Visibility (public/private) ', 'trim|numeric|xss_clean');
        $this->form_validation->set_rules('permission_id', 'Permission ID', 'trim|numeric|xss_clean');

        if (!$this->form_validation->run()) 
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
            $data = $this->input->post(NULL, TRUE);

			// disregard this field which may be sent with permission_id change
			if (isset($data['permission_name'])) unset($data['permission_name']);

			// clear any permissions if we are making this a public path
			if (isset($data['public_flag']) && $data['public_flag']==1) $ignore = $this->pathmodel->clear_permissions($data);

			if (count($data)>1)
			{
            	$result = $this->pathmodel->update_record($data);
			}
			else if (!isset($result))
			{
				$result = array (
					'success'   => false,
					'msg'       => 'No updates attempted.'
            	);
			}
        }
        $this->appunto_auth->sendResponse($result);
	}

    function destroy()
    {
        $this->form_validation->set_rules('id', 'Record ID', 'required');

		// create array from post data
		$data = $this->input->post(NULL, TRUE);

        if (!$this->form_validation->run()) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'Your form had errors.  Please correct them and try again',
                'errors'    => validation_errors()
            );
        } 
        else if ($this->pathmodel->is_marked_found($data)) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'This path cannot be deleted because it was found on your filesystem'.
								' the last time paths were verified. <br><br>Please refresh paths if'.
								' you believe you have received this message in error.'
            );
        } 
        else 
        {
            $result = $this->pathmodel->delete_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function delete_not_found()
    {
        $result = $this->pathmodel->delete_not_found();

        $this->appunto_auth->sendResponse($result);
	}

    function remove_permission()
    {
        $this->form_validation->set_rules('id', 'ID', 'trim|require|xss_clean');

        if (!$this->form_validation->run()) 
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
            $data = $this->input->post(NULL, TRUE);

           	$result = $this->pathmodel->clear_permissions($data);

        }
        $this->appunto_auth->sendResponse($result);
	}
};
