<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Users extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();

        $this->load->model('usermodel');
		$this->load->library('form_validation');
		$this->load->library('Appunto_auth');
	}

	function read()
	{
		//log_message('error', 'Business - read');

        $start  = $this->input->get_post('start', TRUE);
        $limit  = $this->input->get_post('limit', TRUE);
        $sort   = $this->input->get_post('sort', TRUE);
        $filter = $this->input->get_post('filter', TRUE);

        $property = null;
        $direction = null;
        //$active_filter = false;

        // get sort params
        $sort_array = json_decode($sort);
        if (count($sort_array) > 0)
        {
            $property = $sort_array[0]->property;
            $direction = $sort_array[0]->direction;
        }

		$filters = json_decode($filter);

        $results = $this->usermodel->enumerate($start,$limit,$property,$direction,$filters);

        $this->appunto_auth->sendResponse($results);
	}

	function roles()
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

        $results = $this->usermodel->get_user_roles($id,$property,$direction);

        $this->appunto_auth->sendResponse($results);
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

        $results = $this->usermodel->get_user_permissions($id,$property,$direction);

        $this->appunto_auth->sendResponse($results);
	}

    function create()
    {
        $this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
        $this->form_validation->set_rules('name', 'Name', 'trim|xss_clean');
        $this->form_validation->set_rules('surname', 'Last name', 'trim|xss_clean');
        $this->form_validation->set_rules('email', 'Email address', 'trim|required|valid_email|xss_clean');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback__hash');

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
            $result = $this->usermodel->create_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function update()
    {
        $this->form_validation->set_rules('id', 'ID', 'trim|require|xss_clean');
        $this->form_validation->set_rules('username', 'Username', 'trim|xss_clean');
        $this->form_validation->set_rules('name', 'Name', 'trim|xss_clean');
        $this->form_validation->set_rules('surname', 'Last name', 'trim|xss_clean');
        $this->form_validation->set_rules('email', 'Email address', 'trim|valid_email|xss_clean');

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
            	$result = $this->usermodel->update_record($data);
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

    function update_pass()
    {
        $this->form_validation->set_rules('id', 'ID', 'trim|required|xss_clean');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback__hash');

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
            	$result = $this->usermodel->update_record($data);
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
        $this->form_validation->set_rules('id', 'Record ID', 'required');

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

            $result = $this->usermodel->delete_record($data);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function add_role()
    {
        $this->form_validation->set_rules('id', 'Role ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('user_id', 'User ID', 'trim|require|numeric|xss_clean');

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
			$role_id = $this->input->get_post('id', TRUE);
			$user_id = $this->input->get_post('user_id', TRUE);

         	$result = $this->usermodel->add_role($role_id,$user_id);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function remove_role()
    {
        $this->form_validation->set_rules('id', 'Role ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('user_id', 'User ID', 'trim|require|numeric|xss_clean');

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
			$role_id = $this->input->get_post('id', TRUE);
			$user_id = $this->input->get_post('user_id', TRUE);

         	$result = $this->usermodel->remove_role($role_id,$user_id);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function add_permission()
    {
        $this->form_validation->set_rules('id', 'Permission ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('user_id', 'User ID', 'trim|require|numeric|xss_clean');

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
			$user_id = $this->input->get_post('user_id', TRUE);

         	$result = $this->usermodel->add_permission($permission_id,$user_id);
        }
        $this->appunto_auth->sendResponse($result);
	}

    function remove_permission()
    {
        $this->form_validation->set_rules('id', 'Permission ID', 'trim|require|numeric|xss_clean');
        $this->form_validation->set_rules('user_id', 'User ID', 'trim|require|numeric|xss_clean');

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
			$user_id = $this->input->get_post('user_id', TRUE);

         	$result = $this->usermodel->remove_permission($permission_id,$user_id);
        }
        $this->appunto_auth->sendResponse($result);
	}

	function _hash($str) 
	{
		$this->load->library('appunto_auth');

		return $this->appunto_auth->hashPassword($str);
	}
};
