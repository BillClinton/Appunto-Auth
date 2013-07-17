<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Permission extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();

        $this->load->model('permissionmodel');
        $this->load->library('appunto_auth');
		$this->load->library('form_validation');
	}

	function read()
	{
/*
        $start  = $this->input->get_post('start', TRUE);
        $limit  = $this->input->get_post('limit', TRUE);
        $sort   = $this->input->get_post('sort', TRUE);
        $filter = $this->input->get_post('filter', TRUE);

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

        $result = $this->permissionmodel->enumerate($start,$limit,$property,$direction,$filters);

        $this->appunto_auth->sendResponse($result);
*/
		$this->appunto_auth->controller_read($this->permissionmodel);
	}

    function create()
    {
        $this->form_validation->set_rules('name', 'Name', 'trim|required|min_length[3]|max_length[32]|xss_clean');
        $this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

		$this->appunto_auth->controller_create($this->permissionmodel);
/*

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

            $data['internal_name'] = strtoupper(str_replace(' ','_',$data['name']));

            // get result
            $result = $this->permissionmodel->create_record($data);
        }
        $this->appunto_auth->sendResponse($result);
*/
	}

    function update()
    {
        $this->form_validation->set_rules('id', 'ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('name', 'Name', 'trim|min_length[3]|max_length[32]|xss_clean');
        $this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

		$this->appunto_auth->controller_update($this->permissionmodel);
	}

    function destroy()
    {
		$rules =  'trim|required|numeric|xss_clean';
		$rules .= '|callback__validate_permission_in_use_by_user';
		$rules .= '|callback__validate_permission_in_use_by_role';
		$rules .= '|callback__validate_permission_in_use_by_path';

        $this->form_validation->set_rules('id', 'Record ID', $rules);
//        $this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean|callback_validate_permission_in_use_by_user');
//        $this->form_validation->set_rules('id', 'Record ID', 'callback_validate_permission_in_use_by_user');
//        $this->form_validation->set_rules('id', 'Record ID', 'callback__validate_permission_in_use_by_role');
//        $this->form_validation->set_rules('id', 'Record ID', 'callback__validate_permission_in_use_by_path');

		$this->appunto_auth->controller_destroy($this->permissionmodel);

/*
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
			$data = $this->input->post(NULL, TRUE);
            $result = $this->permissionmodel->delete_record($data);
        }
        $this->appunto_auth->sendResponse($result);
*/
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
			return false;
		}
		return true;
	}

};
