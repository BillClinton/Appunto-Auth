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
	}

    function create()
    {
        $this->form_validation->set_rules('name', 'Name', 'trim|required|min_length[3]|max_length[32]|xss_clean');
        $this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

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

            // get result
            $result = $this->permissionmodel->create_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function update()
    {
        $this->form_validation->set_rules('id', 'ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('name', 'Name', 'trim|min_length[3]|max_length[32]|xss_clean');
        $this->form_validation->set_rules('description', 'Description', 'trim|max_length[64]|xss_clean');

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

			if (count($data)>1)
			{
            	$result = $this->permissionmodel->update_record($data);
			}
			else
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
        $this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean');

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
        else if ($this->permissionmodel->in_use_by_user($data)) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'This permissions is currently assigned to one or more users and cannot be deleted.'
            );
        } 
        else if ($this->permissionmodel->in_use_by_role($data)) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'This permission is currently assigned to one or more roles and cannot be deleted.'
            );
        } 
        else if ($this->permissionmodel->in_use_by_path($data)) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'This permission is currently assigned to one or more paths and cannot be deleted.'
            );
        } 
        else 
        {
            $result = $this->permissionmodel->delete_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

};
