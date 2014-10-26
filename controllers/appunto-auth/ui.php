<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Ui extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();

        $this->load->library('appunto_auth');
		$this->load->library('form_validation');
	}

	public function _remap($method,$params = array())
	{
		$result = array();

		$func = $params[0];

		$invalid_function = array ( 'success'   => false, 'msg' => 'Invalid action.');

		switch ($method)
		{
			case 'user':

        		$this->load->model('usermodel');
				switch ($func) 
				{
					case 'read': 
						$this->appunto_auth->controller_read($this->usermodel);
						break;	
					case 'create':
						$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
						$this->form_validation->set_rules('name', 'Name', 'trim|xss_clean');
						$this->form_validation->set_rules('surname', 'Last name', 'trim|xss_clean');
						$this->form_validation->set_rules('email', 'Email address', 'trim|required|valid_email|xss_clean');
						$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback__hash');

						$this->appunto_auth->controller_create($this->usermodel);
						break;	
					case 'update':
						$this->form_validation->set_rules('id', 'ID', 'trim|required|xss_clean');
						$this->form_validation->set_rules('username', 'Username', 'trim|xss_clean');
						$this->form_validation->set_rules('name', 'Name', 'trim|xss_clean');
						$this->form_validation->set_rules('surname', 'Last name', 'trim|xss_clean');
						$this->form_validation->set_rules('email', 'Email address', 'trim|valid_email|xss_clean');

						$this->appunto_auth->controller_update($this->usermodel);
						break;	
					case 'update_pass':
						$this->form_validation->set_rules('id', 'ID', 'trim|required|xss_clean');
						$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback__hash');

						$this->appunto_auth->controller_update($this->usermodel);
						break;	
					case 'destroy':
        				$this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean');

						$this->appunto_auth->controller_destroy($this->usermodel);
						break;	
					case 'roles':
        				$this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean');
						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$sort   = $this->input->get_post('sort', TRUE);

							$id = $this->input->get_post('id', TRUE);

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

							$result = $this->usermodel->get_user_roles($id,$property,$direction);
						}
						$this->appunto_auth->sendResponse($result);
						break;	
					case 'permissions':
        				$this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean');
						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$sort   = $this->input->get_post('sort', TRUE);

							$id = $this->input->get_post('id', TRUE);

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

							$result = $this->usermodel->get_user_permissions($id,$property,$direction);

						}
						$this->appunto_auth->sendResponse($result);
						break;	
					case 'add_role':
						$this->form_validation->set_rules('id', 'Role ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('user_id', 'User ID', 'trim|required|numeric|xss_clean');
						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$role_id = $this->input->get_post('id', TRUE);
							$user_id = $this->input->get_post('user_id', TRUE);

							$result = $this->usermodel->add_role($role_id,$user_id);
						}
						$this->appunto_auth->sendResponse($result);
						break;	
					case 'remove_role':
						$this->form_validation->set_rules('id', 'Role ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('user_id', 'User ID', 'trim|required|numeric|xss_clean');
						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$role_id = $this->input->get_post('id', TRUE);
							$user_id = $this->input->get_post('user_id', TRUE);

							$result = $this->usermodel->remove_role($role_id,$user_id);
						}
						$this->appunto_auth->sendResponse($result);
						break;	
					case 'add_permission':
						$this->form_validation->set_rules('id', 'Permission ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('user_id', 'User ID', 'trim|required|numeric|xss_clean');
						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$permission_id = $this->input->get_post('id', TRUE);
							$user_id = $this->input->get_post('user_id', TRUE);

							$result = $this->usermodel->add_permission($permission_id,$user_id);
						}
						$this->appunto_auth->sendResponse($result);
						break;	
					case 'remove_permission':
						$this->form_validation->set_rules('id', 'Permission ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('user_id', 'User ID', 'trim|required|numeric|xss_clean');
						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$permission_id = $this->input->get_post('id', TRUE);
							$user_id = $this->input->get_post('user_id', TRUE);

							$result = $this->usermodel->remove_permission($permission_id,$user_id);
						}
						$this->appunto_auth->sendResponse($result);
						break;	
					default: $this->appunto_auth->sendResponse($invalid_function);
				}
				break;

			case 'role':
        		$this->load->model('rolemodel');
				switch ($func) 
				{
					case 'read': 
						$this->appunto_auth->controller_read($this->rolemodel);
						break;	
					case 'create':
						$this->form_validation->set_rules('name', 'Name', 'trim|required|min_length[3]|max_length[32]|xss_clean');
						$this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

						$this->appunto_auth->controller_create($this->rolemodel);
						break;	
					case 'update':
						$this->form_validation->set_rules('id', 'ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('name', 'Name', 'trim|min_length[3]|max_length[32]|xss_clean');
						$this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

						$this->appunto_auth->controller_update($this->rolemodel);
						break;	
					case 'destroy':
        				$this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean');

						$this->appunto_auth->controller_destroy($this->rolemodel);
						break;	
					case 'permissions':
        				$this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean');

						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$sort   = $this->input->get_post('sort', TRUE);

							$id = $this->input->get_post('id', TRUE);

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

							$result = $this->rolemodel->get_role_permissions($id,$property,$direction);
							log_message('error',print_r($result,true));
						}
        				$this->appunto_auth->sendResponse($result);
						break;	
					case 'add_permission':
						$this->form_validation->set_rules('id', 'Permission ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('role_id', 'Role ID', 'trim|required|numeric|xss_clean');

						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$permission_id = $this->input->get_post('id', TRUE);
							$role_id = $this->input->get_post('role_id', TRUE);

							$result = $this->rolemodel->add_permission($permission_id,$role_id);
						}

        				$this->appunto_auth->sendResponse($result);
						break;	
					case 'remove_permission':
						$this->form_validation->set_rules('id', 'Permission ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('role_id', 'Role ID', 'trim|required|numeric|xss_clean');

						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$permission_id = $this->input->get_post('id', TRUE);
							$role_id = $this->input->get_post('role_id', TRUE);

							$result = $this->rolemodel->remove_permission($permission_id,$role_id);
						}

        				$this->appunto_auth->sendResponse($result);
						break;	
					default: $this->appunto_auth->sendResponse($invalid_function);
				}
				break;

			case 'permission':
        		$this->load->model('permissionmodel');
				switch ($func) 
				{
					case 'read': 
						$this->appunto_auth->controller_read($this->permissionmodel);
						break;	
					case 'create':
						$this->form_validation->set_rules('name', 'Name', 'trim|required|min_length[3]|max_length[32]|xss_clean');
						$this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

						$this->appunto_auth->controller_create($this->permissionmodel);
						break;	
					case 'update':
						$this->form_validation->set_rules('id', 'ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('name', 'Name', 'trim|min_length[3]|max_length[32]|xss_clean');
						$this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

						$this->appunto_auth->controller_update($this->permissionmodel);
						break;	
					case 'destroy':
						$rules =  'trim|required|numeric|xss_clean';
						$rules .= '|callback__validate_permission_in_use_by_user';
						$rules .= '|callback__validate_permission_in_use_by_role';
						$rules .= '|callback__validate_permission_in_use_by_path';

						$this->form_validation->set_rules('id', 'Record ID', $rules);

						$this->appunto_auth->controller_destroy($this->permissionmodel);
						break;	
					default: $this->appunto_auth->sendResponse($invalid_function);
				}
				break;

			case 'path':
        		$this->load->model('pathmodel');
				switch ($func) 
				{
					case 'read': 
						$this->appunto_auth->controller_read($this->pathmodel);
						break;	

					case 'verify_paths':
						log_message('error', 'Verifying Paths');
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
								log_message('error', 'Verifying Paths:'.$controller_dir);
							// get files in this directory
							$files = scandir($dir.$controller_dir);
							$controller_files = array_filter($files, function($filename) {
								return (substr(strrchr($filename, '.'), 1)=='php') ? true : false;
							});

							foreach ($controller_files as $filename)
							{
								log_message('error', 'Verifying Paths:'.$filename);
								$this_dir = ($controller_dir == '.') ? $dir : $dir.$controller_dir.'/';

								/**
								 *	If you are getting a fatal error on the line below, you probably have two 
								 *  controllers with the same name.  Codeigniter supports controller classes 
								 *  with the same name in different directories, but Appunto Auth
								 *	currently does not. 
								 */
								$classname = ucfirst(substr($filename, 0, strrpos($filename, '.')));

								if (!class_exists($classname)||($classname == 'Ui'))
								{

									if ($filename != 'ui.php') require_once($this_dir.$filename);

									$classname = ucfirst(substr($filename, 0, strrpos($filename, '.')));
									$controller = new $classname();
									$methods = get_class_methods($controller);

									foreach ($methods as $method)
									{
										
										$full_path = ($controller_dir=='.') ? $filename : $controller_dir.'/'.$filename;

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

						log_message('error', 'Verifying Paths Complete');
						$this->appunto_auth->sendResponse($result);
						break;	

					case 'update': 
						$this->form_validation->set_rules('id', 'ID', 'trim|required|numeric|xss_clean');
						$this->form_validation->set_rules('public_flag', 'Visibility (public/private) ', 'trim|numeric|xss_clean');
						$this->form_validation->set_rules('permission_id', 'Permission ID', 'trim|numeric|xss_clean');

						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							// return all POST items with XSS filter
							$data = $this->input->post(NULL, TRUE);

							// disregard this field which may be sent with permission_id change
							if (isset($data['permission_name'])) unset($data['permission_name']);

							// clear any permissions if we are making this a public path
							if (isset($data['public_flag']) && $data['public_flag']==1) 
							{
								$ignore = $this->pathmodel->clear_permissions($data);
							}

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
						break;	

					case 'destroy': 
						$this->form_validation->set_rules('id', 'ID', 'trim|required|numeric|xss_clean');

						// create array from post data
						$data = $this->input->post(NULL, TRUE);

						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
							$this->appunto_auth->sendResponse($result);
						} 
						else if ($this->pathmodel->is_marked_found($data)) 
						{
							$result = array (
								'success'   => false,
								'msg'       => 'This path cannot be deleted because it was found on your filesystem'.
												' the last time paths were verified. <br><br>Please refresh paths if'.
												' you believe you have received this message in error.'
							);
							$this->appunto_auth->sendResponse($result);
						} 
						else 
						{
							$this->appunto_auth->controller_destroy($this->pathmodel);
						}
						break;	

					case 'delete_not_found': 
						$result = $this->pathmodel->delete_not_found();
						$this->appunto_auth->sendResponse($result);
						break;	

					case 'remove_permission': 
						$this->form_validation->set_rules('id', 'ID', 'trim|required|numeric|xss_clean');

						if ($this->form_validation->run()==FALSE) 
						{
							$result = $this->_validation_error();
						} 
						else 
						{
							$data = $this->input->post(NULL, TRUE);
							$result = $this->pathmodel->clear_permissions($data);
						}
        				$this->appunto_auth->sendResponse($result);
						break;	

					default: $this->appunto_auth->sendResponse($invalid_function);
				}
				break;

			case 'session':
        		$this->load->model('sessionmodel');
				switch ($func) 
				{
					case 'read': 
						$this->appunto_auth->controller_read($this->sessionmodel);
						break;	
					case 'destroy':
        				$this->form_validation->set_rules('id', 'Record ID', 'trim|required|xss_clean');
						$this->appunto_auth->controller_destroy($this->sessionmodel);
						break;	
					default: $this->appunto_auth->sendResponse($invalid_function);
				}
				break;

			default:
				$result = array (
					'success'   => false,
					'msg'       => 'Invalid method.'
				);
				$this->appunto_auth->sendResponse($result);
		}
	}

    function _validation_error()
	{ 
		return array (
			'success'   => false,
			'msg'       => 'Your form had errors.  Please correct them and try again',
			'errors'    => validation_errors()
		);
	}

    function _validate_permission_in_use_by_user($id)
	{
		if ($this->permissionmodel->in_use_by_user($id))
		{
			$this->form_validation->set_message(
				'_validate_permission_in_use_by_user', 
				'This permission is currently assigned to one or more users and cannot be deleted.'
			);
			return false;
		}
		return true;
	}

    function _validate_permission_in_use_by_role($id)
	{
		if ($this->permissionmodel->in_use_by_role($id))
		{
			$this->form_validation->set_message(
				'_validate_permission_in_use_by_role', 
				'This permission is currently assigned to one or more roles and cannot be deleted.'
			);
			return false;
		}
		return true;
	}

    function _validate_permission_in_use_by_path($id)
	{
		if ($this->permissionmodel->in_use_by_path($id))
		{
			$this->form_validation->set_message(
				'_validate_permission_in_use_by_path', 
				'This permission is currently assigned to one or more paths and cannot be deleted.'
			);
			return false;
		}
		return true;
	}

	function _hash($str) 
	{
		$this->load->library('appunto_auth');

		return $this->appunto_auth->hashPassword($str);
	}
};

