<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Role extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();

        $this->load->model('rolemodel');
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

        $result = $this->rolemodel->enumerate($start,$limit,$property,$direction,$filters);

        $this->appunto_auth->sendResponse($result);
	}

	function permissions()
	{
        $this->form_validation->set_rules('id', 'id', 'trim|required|numeric|xss_clean');

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

        $results = $this->rolemodel->get_role_permissions($id,$property,$direction);

        $this->appunto_auth->sendResponse($results);
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

            $data['internal_name'] = strtoupper(str_replace(' ','_',$data['name']));

            // get result
            $result = $this->rolemodel->create_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function update()
    {
        $this->form_validation->set_rules('id', 'ID', 'trim|require|xss_clean');
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
            	$result = $this->rolemodel->update_record($data);
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
        $this->form_validation->set_rules('id', 'Record ID', 'trim|required|xss_clean');

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
            // create array from post data
            $data = $this->input->post(NULL, TRUE);

            $result = $this->rolemodel->delete_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function add_permission()
    {
        $this->form_validation->set_rules('id', 'Permission ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('role_id', 'Role ID', 'trim|require|numeric|xss_clean');

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
			$permission_id = $this->input->get_post('id', TRUE);
			$role_id = $this->input->get_post('role_id', TRUE);

         	$result = $this->rolemodel->add_permission($permission_id,$role_id);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function remove_permission()
    {
        $this->form_validation->set_rules('id', 'Permission ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('role_id', 'Role ID', 'trim|require|numeric|xss_clean');

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
			$permission_id = $this->input->get_post('id', TRUE);
			$role_id = $this->input->get_post('role_id', TRUE);

         	$result = $this->rolemodel->remove_permission($permission_id,$role_id);
        }
        $this->appunto_auth->sendResponse($result);
	}
};
