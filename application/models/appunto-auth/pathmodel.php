<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Pathmodel extends CI_Model 
{

	function __construct()
	{
		parent::__construct();

		$this->load->library('appunto-auth/Appunto_auth');

		$this->load->database();

		$prefix = $this->config->item('db_table_prefix','appunto-auth/appunto_auth');

        $this->table = $prefix.'appa_path';
        $this->permission_table = $prefix.'appa_permission';
	}
    
	/**
	 * Get paths for library auhentication verification
	 *
	 * @return	object
	 */
	function getAll()
	{
        $this->db->select('path.ci_controller as ci_controller, path.ci_method as ci_method, path.public_flag as public_flag');
        $this->db->select('perm.id as permission_id, perm.internal_name as internal_name');

		$this->db->join($this->permission_table.' perm','perm.id = path.permission_id','left');

        // execute query
		$query = $this->db->get($this->table.' path');

		// return result 
        return $this->appunto_auth->formatQueryResult($query,$query->num_rows());
	}

	/**
	 * Get paths
	 *
	 * @return	object
	 */
	function enumerate($offset,$rows,$sort,$dir,$filters)
	{
        $this->db->select('path.id, path.dir, path.full_path, path.ci_controller, path.ci_method, path.found, path.public_flag, path.note');
        $this->db->select('perm.id as permission_id, perm.name as permission_name, perm.internal_name as internal_name');

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
	function create_record($dir, $filename, $full_path, $ci_controller, $ci_method, $found = 0)
	{
		$this->db->set('dir', $dir);
		$this->db->set('filename', $filename);
		$this->db->set('full_path', $full_path);
		$this->db->set('ci_controller', $ci_controller);
		$this->db->set('ci_method', $ci_method);
		$this->db->set('found', $found);

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
		// shouldn't have to reload the database library here but during the 
		// upgrade to 2.2.0 I started getting an error here if it was not present
		// investigate further later
		$this->load->database();

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
	 * Delete all paths that are not found
	 *
	 * @return	object
	 */
	function delete_not_found() 
	{
        // get/set the id 
        $this->db->where('found', 0);

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
        $this->db->select('found');

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
