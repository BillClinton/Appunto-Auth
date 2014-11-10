<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Permissionmodel extends CI_Model 
{

	function __construct()
	{
		parent::__construct();

		$this->load->library('appunto-auth/Appunto_auth');
        $this->load->database();

		$prefix = $this->config->item('db_table_prefix','appunto-auth/appunto_auth');

        $this->table = $prefix.'appa_permission';
        $this->path_table = $prefix.'appa_path';
        $this->user_permission_table = $prefix.'appa_user_permission';
        $this->role_permission_table = $prefix.'appa_role_permission';
	}
    

	/**
	 * Get permissions
	 *
	 * @return	object
	 */
	function enumerate($offset,$rows,$sort,$dir,$filters)
	{
        // define table here for count all results
        $this->db->from($this->table);
        $total = $this->db->count_all_results();  

        $this->db->select('p.id, p.name, p.internal_name, p.description');

        if (!empty($sort) && !empty($dir)) 
        {
            $this->db->order_by('UPPER('.$sort.')',$dir);
		}
		else
		{
        	$this->db->order_by('p.name','ASC');
        }

        // execute query
		$query = $this->db->get($this->table.' p');

		// format and return result to controller
        return $this->appunto_auth->formatQueryResult($query,$total);
	}

	/**
	 * Get permission
	 *
	 * @return permission
	 */
	function get($id)
	{
		// define query
        $this->db->select('p.id, p.name, p.internal_name, p.description');

		$this->db->where('p.id',$id);

        // execute query
		$query = $this->db->get($this->table.' p');

		// format and return result to controller
        return $query->result();

	}

	/**
	 * Create record
	 *
	 * @param	array
	 * @return	object
	 */
	function create_record($data) 
	{
        $data['internal_name'] = strtoupper(str_replace(' ','_',$data['name']));

        // execute query
		$query = $this->db->insert($this->table, $data);

		// get the id to select a full record to return to UI
		$id = $this->db->insert_id();

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get($id));
	}

	/**
	 * Update record
	 *
	 * @param	array
	 * @return	object
	 */
	function update_record($data) 
	{
        // get/set the id and remove it from the data array
		$id = $data['id'];
        $this->db->where('id', $id);
        unset($data['id']);

        // execute query
		$query = $this->db->update($this->table, $data);

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get($id));
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
        $this->db->where('id', $data['id']);

        // execute query
		$query = $this->db->delete($this->table);

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query);
	}

	function in_use_by_user($id) 
	{
        $this->db->select('permission_id');
        $this->db->where('permission_id', $id);

        // execute query
		$query = $this->db->get($this->user_permission_table);

		if ($query->num_rows() > 0)
		{	
			return true;
		}
		return false;
	}

	function in_use_by_role($id) 
	{
        $this->db->select('permission_id');
        $this->db->where('permission_id', $id);

        // execute query
		$query = $this->db->get($this->role_permission_table);

		if ($query->num_rows() > 0)
		{	
			return true;
		}
		return false;
	}

	function in_use_by_path($id) 
	{
        $this->db->select('path.id');
        $this->db->where('permission_id', $id);

        // execute query
		$query = $this->db->get($this->path_table.' path');

		if ($query->num_rows() > 0)
		{	
			return true;
		}
		return false;
	}

};
