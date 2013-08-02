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

		log_message('error','method: '.$method);
		log_message('error','func: '.$func);

		$invalid_function = array ( 'success'   => false, 'msg' => 'Invalid method.');

		switch ($method)
		{
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
						$this->form_validation->set_rules('id', 'ID', 'trim|require|numeric|xss_clean');
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

    function _validate_permission_in_use_by_user($id)
	{
		log_message('error','_validate_permission_in_use_by_user');
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
		}
		else
		{
            $result = array (
                'success'   => false,
                'msg'       => 'Invalid method.'
            );
        	$this->appunto_auth->sendResponse($result);
		}
	}

};
