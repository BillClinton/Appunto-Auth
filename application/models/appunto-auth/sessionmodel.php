<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sessionmodel extends CI_Model 
{

	function __construct()
	{
		parent::__construct();

		$this->load->library('appunto-auth/Appunto_auth');
        $this->load->database();

		$prefix = $this->config->item('db_table_prefix','appunto-auth/appunto_auth');

        $this->table = $prefix.'ci_sessions';
	}

	/**
	 * Get sessions
	 *
	 * @return	object
	 */
	function enumerate($offset,$rows=0,$sort,$dir,$filters)
	{
        // define table here for count all results
        $this->db->from($this->table);
        $total = 0;  

        $this->db->select('session_id as id,ip_address,user_agent');
        $this->db->select("CONCAT( DATE( FROM_UNIXTIME( `last_activity` ) ),' ',TIME( FROM_UNIXTIME( `last_activity` ) ) ) AS last_activity",false);
        $this->db->select('user_agent,user_data');

		$show_all = 1;
		if (count($filters)>0) 
		{
			foreach($filters as $filter)
			{
				$property = $filter->property;
				if ($property == 'show_all') $show_all = $filter->value;
			}
		}

        // add limit and get results
        if ($rows>0) $this->db->limit($rows,$offset);

		$query = $this->db->get();

        $result_array = array();

        if ($rows = $query->result()) 
		{
			foreach ($rows as $row)
            {
				$total++;

                $user_data = unserialize($row->user_data);
				$user_name = isset($user_data['username']) ? $user_data['username'] : '';
				$last_page = isset($user_data['last_page']) ? $user_data['last_page'] : '';

				if ( $show_all == 1 || is_array($user_data))
				{
					$this_row = array (
						'id'            => $row->id,
						'username'      => $user_name,
						'last_page'     => $last_page,
						'last_activity' => $row->last_activity,
						'ip_address'    => $row->ip_address,
						'user_agent'    => $row->user_agent
					);
					$result_array[] = $this_row;
				}
            }

            $result = array (
                'success' => true,
                'total' => $total,
                'rows' => $result_array
            );

        } else {

            $result = array (
                'success' => false,
                'msg' => 'Database Error: '.$this->db->_error_message(),
                'num' => $this->db->_error_number()
            );

        }
        return $result;
	}

	/**
	 * Delete record
	 *
	 * @param	array
	 * @return	object
	 */
	function delete_record($data) 
	{
        // get/set the id 
        $this->db->where('session_id', $data['id']);

        // execute query
		$query = $this->db->delete($this->table);

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query);
	}

};
