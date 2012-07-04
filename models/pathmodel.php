<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Pathmodel extends CI_Model 
{

	function __construct()
	{
		parent::__construct();

		$this->load->library('Appunto_auth');
        $this->load->database();

		$prefix = $this->config->item('db_table_prefix','appunto_auth');

        $this->table = $prefix.'auth_path';
        $this->permission_table = $prefix.'auth_permission';
	}
    
	/**
	 * Get paths
	 *
	 * @return	object
	 */
	function enumerate()
	{
        $this->db->select('path.id, path.dir, path.ci_controller, path.ci_method, path.found, path.public_flag, path.note');
        $this->db->select('perm.id as permission_id, perm.name as permission_name');

		$this->db->join($this->permission_table.' perm','perm.id = path.permission_id','left');

        // execute query
		$query = $this->db->get($this->table.' path');

		// add column for grouping by controller directory
        if ($rows = $query->result()) 
        {
			foreach ($rows as $row)
			{
				// directory name or controller name if in main controller dir
				$row->dir_group = ($row->dir == '.') ? $row->ci_controller : $row->dir;
			}
		}

		// format and return result to controller
        return $this->appunto_auth->formatQueryResult($query,$query->num_rows());
	}

	/**
	 * Get path
	 *
	 * @return path
	 */
	function get($id)
	{
		// define query
        $this->db->select('path.id, path.dir, path.ci_controller, path.ci_method, path.found, path.public_flag, path.note');
        $this->db->select('perm.id as permission_id, perm.name as permission_name');

		$this->db->join($this->permission_table.' perm','perm.id = path.permission_id','left');

		$this->db->where('path.id',$id);

        // execute query
		$query = $this->db->get($this->table.' path');

		// format and return result to controller
        return $query->result();
	}

	/**
	 * Create record
	 *
	 * @param	int		ci_controller
	 * @param	int		ci_method	
	 * @return	object
	 */
	function create_record($dir, $ci_controller, $ci_method)
	{
		$this->db->set('dir', $dir);
		$this->db->set('ci_controller', $ci_controller);
		$this->db->set('ci_method', $ci_method);

        // execute query
		$query = $this->db->insert($this->table);
	}

	/**
	 * Test to see if this path has already been recorded in db
	 *
	 * @param	int		ci_controller
	 * @param	int		ci_method	
	 * @return	boolean
	 */
	function path_exists($dir, $ci_controller, $ci_method)
	{
		$this->db->where('dir', $dir);
		$this->db->where('ci_controller', $ci_controller);
		$this->db->where('ci_method', $ci_method);
        $this->db->from($this->table);

		if ($this->db->count_all_results() > 0)
		{
			return true;
		}
		return false;
	}

	/**
	 * Mark Found
	 *
	 * @param	int		ci_controller
	 * @param	int		ci_method	
	 * @return	void
	 */
	function mark_found($dir, $ci_controller, $ci_method)
	{
		$this->db->where('dir', $dir);
		$this->db->where('ci_controller', $ci_controller);
		$this->db->where('ci_method', $ci_method);

        // execute query
		$query = $this->db->update($this->table, array('found'=>1));
	}

	/**
	 * Mark All Unfound
	 *
	 * @return	void
	 */
	function mark_all_unfound()
	{
        // execute query
		$query = $this->db->update($this->table, array('found'=>0));
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
	 * Is Path marked Found
	 *
	 * @param	array
	 * @return	boolean
	 */
	function is_marked_found($data) 
	{
        $this->db->select('path.found');

        // get/set the id 
		$id = $data['id'];
        $this->db->where('id', $id);

        // execute query
		$query = $this->db->get($this->table);

		if ($query->num_rows() > 0)
		{	
   			$row = $query->row();
			if ($row->found == 0) return false;
		}
		return true;
	}

	/**
	 * Clear permissions
	 *
	 * @param	array
	 * @return	void
	 */
	function clear_permissions($data) 
	{
        // get/set the id and remove it from the data array
		$id = $data['id'];
        $this->db->where('id', $id);
        unset($data['id']);

        // execute query
		$query = $this->db->update($this->table, array('permission_id' => NULL));

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get($id));
	}

};
