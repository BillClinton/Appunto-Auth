<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Group extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();

        $this->load->model('groupmodel');
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

        $result = $this->groupmodel->enumerate($start,$limit,$property,$direction,$filters);

        $this->appunto_auth->sendResponse($result);
	}

	function users()
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

        $results = $this->groupmodel->get_group_users($id,$property,$direction);

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

            // get result
            $result = $this->groupmodel->create_record($data);
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
            	$result = $this->groupmodel->update_record($data);
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

            $result = $this->groupmodel->delete_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function add_user()
    {
        $this->form_validation->set_rules('id', 'User ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('group_id', 'Group ID', 'trim|require|numeric|xss_clean');

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
			$user_id = $this->input->get_post('id', TRUE);
			$group_id = $this->input->get_post('group_id', TRUE);

         	$result = $this->groupmodel->add_user($user_id,$group_id);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function remove_user()
    {
        $this->form_validation->set_rules('id', 'User ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('group_id', 'Group ID', 'trim|require|numeric|xss_clean');

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
			$user_id = $this->input->get_post('id', TRUE);
			$group_id = $this->input->get_post('group_id', TRUE);

         	$result = $this->groupmodel->remove_user($user_id,$group_id);
        }
        $this->appunto_auth->sendResponse($result);
	}
};
