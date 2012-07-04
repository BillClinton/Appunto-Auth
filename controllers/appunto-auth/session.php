<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Session extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();

        $this->load->model('sessionmodel');
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

        $result = $this->sessionmodel->enumerate($start,$limit,$property,$direction,$filters);

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
            $id = $this->input->post('id', TRUE);

            $result = $this->sessionmodel->delete_record($id);
        }
        $this->appunto_auth->sendResponse($result);
	}

};
