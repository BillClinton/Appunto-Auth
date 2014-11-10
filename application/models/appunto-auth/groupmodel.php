<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Groupmodel extends CI_Model 
{

	function __construct()
	{
		parent::__construct();

		$this->load->library('appunto-auth/Appunto_auth');
        $this->load->database();

		$prefix = $this->config->item('db_table_prefix','appunto-auth/appunto_auth');

        $this->table = $prefix.'appa_group';
        $this->user_table = $prefix.'appa_user';
        $this->group_user_table = $prefix.'appa_user_group';
	}
    

	/**
	 * Get groups
	 *
	 * @return	object
	 */
	function enumerate($offset,$rows,$sort,$dir,$filters)
	{
        // define table here for count all results
        $this->db->from($this->table);
        $total = $this->db->count_all_results();  

        $this->db->select('group.id, group.name,group.description');

        if (!empty($sort) && !empty($dir)) 
        {
            $this->db->order_by('UPPER('.$sort.')',$dir);
		}
		else
		{
        	$this->db->order_by('group.name','ASC');
        }

        // execute query
		$query = $this->db->get($this->table. ' `group`');

		// format and return result to controller
        return $this->appunto_auth->formatQueryResult($query,$total);
	}

	/**
	 * Get group
	 *
	 * @return group
	 */
	function get($id)
	{
		// define query
        $this->db->select('group.id, group.name,group.description');

		$this->db->where('group.id',$id);

        // execute query
		$query = $this->db->get($this->table.' `group`');

		// format and return result to controller
        return $query->result();

	}

	/**
	 * Get group users
	 *
	 * @return	object
	 */
	function get_group_users($id,$sort,$dir)
	{
        $this->db->select('if(isnull(ug.group_id),0,1) as inGroup',false);
        $this->db->select('u.id, u.username, u.email');

        $this->db->join($this->user_table.' u','u.id = ug.user_id and ug.group_id ='.$id,'right');

        // execute query
		$query = $this->db->get($this->group_user_table.' ug');

        return $this->appunto_auth->formatQueryResult($query,$query->num_rows());
	}

	/**
	 * Get user groups
	 *
	 * @return	object
	 */
	function get_group_user($user_id,$group_id)
	{
        $this->db->select('if(isnull(ug.group_id),0,1) as inGroup',false);
        $this->db->select('u.id, u.username, u.email');

        $this->db->join($this->group_user_table.' ug','u.id = ug.user_id and ug.group_id ='.$group_id,'left');

		$this->db->where('u.id',$user_id);

        // execute query
		$query = $this->db->get($this->user_table.' u');

        return $query->row() ;
	}

	/**
	 * Create record
	 *
	 * @param	array
	 * @return	object
	 */
	function create_record($data) 
	{
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

	/**
	 * Add a user to a group 
	 *
	 * @param	array
	 * @return	object
	 */
	function add_user($user_id,$group_id) 
	{
        // execute query
		$query = $this->db->insert($this->group_user_table, array(
			'user_id'	=> $user_id,
			'group_id'	=> $group_id
		));

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get_group_user($user_id,$group_id));
	}

	/**
	 * Remove a user from a group
	 *
	 * @param	array
	 * @return	object
	 */
	function remove_user($user_id,$group_id) 
	{
        // execute query
		$query = $this->db->delete($this->group_user_table, array(
			'user_id'	=> $user_id,
			'group_id'	=> $group_id
		));

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get_group_user($user_id,$group_id));
	}
};
