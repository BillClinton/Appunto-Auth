<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Usermodel extends CI_Model 
{

	function __construct()
	{
		parent::__construct();

		$this->load->library('Appunto_auth');
        $this->load->database();

		$prefix = $this->config->item('db_table_prefix','appunto_auth');

        $this->table = $prefix.'appa_user';
        $this->role_table = $prefix.'appa_role';
        $this->user_role_table = $prefix.'appa_user_role';
        $this->permission_table = $prefix.'appa_permission';
        $this->user_permission_table = $prefix.'appa_user_permission';
        $this->role_permission_table = $prefix.'appa_role_permission';
        $this->user_login_attempt = $prefix.'appa_user_login_attempt';
	}
    

	/**
	 * Get users
	 *
	 * @return	object
	 */
	function enumerate($offset,$rows,$sort,$dir,$filters)
	{
        // define table here for count all results
        $this->db->from($this->table);
        $total = $this->db->count_all_results();  

        $this->db->select('user.id, user.username, user.email, user.active');
        $this->db->select('user.last_ip, user.last_login, user.created, user.modified');
        $this->db->select('user.name, user.surname');

        if (!empty($sort) && !empty($dir)) 
        {
            $this->db->order_by('UPPER('.$sort.')',$dir);
		}
		else
		{
        	$this->db->order_by('username','ASC');
        }

        // add limit and get results
        //$this->db->limit($rows,$offset);

        // execute query
		$query = $this->db->get($this->table. ' user');

        return $this->appunto_auth->formatQueryResult($query,$total);
	}

	/**
	 * Get user
	 *
	 * @return user
	 */
	function get($id)
	{
		// define query
        $this->db->select('user.id, user.username, user.email, user.active');
        $this->db->select('user.last_ip, user.last_login, user.created, user.modified');
        $this->db->select('user.name, user.surname');

		$this->db->where('user.id',$id);

        // execute query
		$query = $this->db->get($this->table.' user');

		// format and return result to controller
        return $query->result();

	}

	/**
	 * Get user roles
	 *
	 * @return	object
	 */
	function get_user_roles($id,$sort,$dir)
	{
        $this->db->select('if(isnull(ur.user_id),0,1) as hasRole',false);
        $this->db->select('r.id, r.name, r.description');

        $this->db->join($this->role_table.' r','r.id = ur.role_id and ur.user_id ='.$id,'right');


        if (!empty($sort) && !empty($dir)) 
        {
            $this->db->order_by('UPPER('.$sort.')',$dir);
		}
		else
		{
        	$this->db->order_by('hasRole','DESC');
        	$this->db->order_by('role_id','ASC');
        }

        // execute query
		$query = $this->db->get($this->user_role_table.' ur');
			log_message('error', $this->db->last_query());

        return $this->appunto_auth->formatQueryResult($query,$query->num_rows());
	}

	/**
	 * Get user roles
	 *
	 * @return	object
	 */
	function get_user_role($role_id,$user_id)
	{
        $this->db->select('if(isnull(ur.user_id),0,1) as hasRole',false);
        $this->db->select('r.id, r.name, r.description');

        $this->db->join($this->user_role_table.' ur','r.id = ur.role_id and ur.user_id ='.$user_id,'left');

		$this->db->where('r.id',$role_id);

        // execute query
		$query = $this->db->get($this->role_table.' r');

        return $query->row() ;
	}

	/**
	 * Get user permissions
	 *
	 * @return	object
	 */
	function get_user_permissions($id,$sort,$dir)
	{
        $this->db->select('p.id, p.name, p.description');
        $this->db->select('if(!isnull(up.user_id) || !isnull(rp.role_id),1,0) as hasPermission',false);
        $this->db->select('if(isnull(up.user_id),0,1) as userHasPermission',false);
        $this->db->select('if(isnull(rp.role_id),0,1) as userRoleHasPermission',false);

		$subquery = '(select ur.role_id from '.$this->user_role_table.' ur where ur.user_id ='.$id.')';

        $this->db->join($this->user_permission_table.' up','p.id = up.permission_id and up.user_id ='.$id,'left');
        $this->db->join($this->role_permission_table.' rp','p.id = rp.permission_id and rp.role_id IN '.$subquery,'left');

        if (!empty($sort) && !empty($dir)) 
        {
            $this->db->order_by('UPPER('.$sort.')',$dir);
		}
		else
		{
        	$this->db->order_by('userHasPermission','DESC');
        	$this->db->order_by('p.id','ASC');
        }

        // execute query
		$query = $this->db->get($this->permission_table.' p');

        return $this->appunto_auth->formatQueryResult($query,$query->num_rows());
	}

	/**
	 * Get user permission array
	 *
	 * @return	object
	 */
	function get_user_permission_array($id)
	{
        $this->db->select('p.id');

		$subquery = '(select ur.role_id from '.$this->user_role_table. ' ur where ur.user_id ='.$id.')';

        $this->db->join($this->user_permission_table.' up','p.id = up.permission_id and up.user_id ='.$id,'left');
        $this->db->join($this->role_permission_table.' rp','p.id = rp.permission_id and rp.role_id IN '.$subquery,'left');

        $this->db->where('((up.user_id IS NOT NULL) || (rp.role_id IS NOT NULL))');

        // execute query
		$query = $this->db->get($this->permission_table.' p');

		$permissions = array();
		foreach ($query->result() as $row)
		{
			array_push($permissions,$row->id);
		}
        return $permissions;
	}

	/**
	 * Get user permission array
	 *
	 * @return	object
	 */
	function get_user_permission_internal_name_array($id)
	{
        $this->db->select('p.internal_name');

		$subquery = '(select ur.role_id from '.$this->user_role_table. ' ur where ur.user_id ='.$id.')';

        $this->db->join($this->user_permission_table.' up','p.id = up.permission_id and up.user_id ='.$id,'left');
        $this->db->join($this->role_permission_table.' rp','p.id = rp.permission_id and rp.role_id IN '.$subquery,'left');

        $this->db->where('((up.user_id IS NOT NULL) || (rp.role_id IS NOT NULL))');

        // execute query
		$query = $this->db->get($this->permission_table.' p');

		$permissions = array();
		foreach ($query->result() as $row)
		{
			array_push($permissions,$row->internal_name);
		}
        return $permissions;
	}

	/**
	 *
	 */
	function verifyPermissionById($u_id,$p_id)
	{
        $this->db->select('p.id, p.name');

		$subquery = '(select ur.role_id from '.$this->user_role_table. ' ur where ur.user_id ='.$u_id.')';

        $this->db->join($this->user_permission_table.' up','p.id = up.permission_id and up.user_id ='.$u_id,'left');
        $this->db->join($this->role_permission_table.' rp','p.id = rp.permission_id and rp.role_id IN '.$subquery,'left');

        $this->db->where('((up.user_id IS NOT NULL) || (rp.role_id IS NOT NULL))');

		$this->db->where('p.id',$p_id);

        // execute query
		$query = $this->db->get($this->permission_table.' p');

		return ($query->num_rows() > 0);
	}

	/**
	 *
	 */
	function verifyPermissionByName($u_id,$p_name)
	{
        $this->db->select('p.id, p.name');

		$subquery = '(select ur.role_id from '.$this->user_role_table. ' ur where ur.user_id ='.$u_id.')';

        $this->db->join($this->user_permission_table.' up','p.id = up.permission_id and up.user_id ='.$u_id,'left');
        $this->db->join($this->role_permission_table.' rp','p.id = rp.permission_id and rp.role_id IN '.$subquery,'left');

        $this->db->where('((up.user_id IS NOT NULL) || (rp.role_id IS NOT NULL))');

		$this->db->where('UPPER(p.internal_name) = UPPER("'.$p_name.'")');

        // execute query
		$query = $this->db->get($this->permission_table.' p');

		return ($query->num_rows() > 0);
	}

	/**
	 * Get user permission
	 *
	 * @return	object
	 */
	function get_user_permission($permission_id,$id)
	{
        $this->db->select('p.id, p.name, p.description');
        $this->db->select('if(!isnull(up.user_id) || !isnull(rp.role_id),1,0) as hasPermission',false);
        $this->db->select('if(isnull(up.user_id),0,1) as userHasPermission',false);
        $this->db->select('if(isnull(rp.role_id),0,1) as userRoleHasPermission',false);

		$subquery = '(select ur.role_id from '.$this->user_role_table.' ur where ur.user_id ='.$id.')';

        $this->db->join($this->user_permission_table.' up','p.id = up.permission_id and up.user_id ='.$id,'left');
        $this->db->join($this->role_permission_table.' rp','p.id = rp.permission_id and rp.role_id IN '.$subquery,'left');

		$this->db->where('p.id',$permission_id);

        // execute query
		$query = $this->db->get($this->permission_table.' p');

        return $query->row() ;
	}

	/**
	 * Get user with password for login verification
	 *
	 * @return user
	 */
	function getLoginInfo($login)
	{
		// define query
        $this->db->select('user.id, user.username, user.email, user.password');

		$this->db->where('user.username',$login);

        // execute query
		$query = $this->db->get($this->table.' user');

		// format and return result to controller
		if ($query->num_rows() > 0)
		{
        	return $query->row();
		}
		return false;
	}
	/**
	 * Create record
	 *
	 * @param	array
	 * @return	object
	 */
	function create_record($data) 
	{
		// remove password confirmation field
		if (isset($data['password2'])) unset($data['password2']);

        // execute query
		$query = $this->db->insert($this->table, $data);

		// remove password and create a record to return to UI
		if (isset($data['password'])) unset($data['password']);
		$record = array_merge($data,array('id' => $this->db->insert_id()));	

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,array($record));
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

		// remove password confirmation field
		if (isset($data['password2'])) unset($data['password2']);

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
	 * Add a role to a user 
	 *
	 * @param	array
	 * @return	object
	 */
	function add_role($role_id,$user_id) 
	{
        // execute query
		$query = $this->db->insert($this->user_role_table, array(
			'role_id'	=> $role_id,
			'user_id'	=> $user_id
		));

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get_user_role($role_id,$user_id));
	}

	/**
	 * Remove a role from a user
	 *
	 * @param	array
	 * @return	object
	 */
	function remove_role($role_id,$user_id) 
	{
        // execute query
		$query = $this->db->delete($this->user_role_table, array(
			'role_id'	=> $role_id,
			'user_id'	=> $user_id
		));

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get_user_role($role_id,$user_id));
	}

	/**
	 * Add a permission to a user 
	 *
	 * @param	array
	 * @return	object
	 */
	function add_permission($permission_id,$user_id) 
	{
        // execute query
		$query = $this->db->insert($this->user_permission_table, array(
			'permission_id'	=> $permission_id,
			'user_id'	=> $user_id
		));

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get_user_permission($permission_id,$user_id));
	}

	/**
	 * Remove a permission from a user
	 *
	 * @param	array
	 * @return	object
	 */
	function remove_permission($permission_id,$user_id) 
	{
        // execute query
		$query = $this->db->delete($this->user_permission_table, array(
			'permission_id'	=> $permission_id,
			'user_id'	=> $user_id
		));

        // return formatted result
        return $this->appunto_auth->formatOperationResult($query,$this->get_user_permission($permission_id,$user_id));
	}

	/**
	 * Add a permission to a user 
	 *
	 * @param	array
	 * @return	object
	 */
	function record_login_attempt($username, $ip_address, $success, $user_agent, $note) 
	{
        // execute query
		$query = $this->db->insert($this->user_login_attempt, array(
			'username'		=> $username,
			'ip_address'	=> $ip_address,
			'success'		=> $success,
			'user_agent'	=> $user_agent,
			'note'			=> $note
		));

        // return formatted result
		return $this->appunto_auth->formatOperationResult($query);
	}

	/**
	 * Get login attempts
	 *
	 * @return	object
	 */
	function login_attempts($offset,$rows,$sort,$dir,$filters)
	{

        $this->db->select('username, ip_address, success, user_agent, note, attempt_time');

		if (count($filters)>0) 
		{
			foreach($filters as $filter)
			{
				$property = $filter->property;
				if ($property == 'active') $active = $filter->value;
			}
		}

		/* cache where clause to get around CI's active record _reset_select()
		 * see http://codeigniter.com/forums/viewthread/212111/#999732
		 */
		$this->db->start_cache();

		$total = $this->db->count_all_results($this->user_login_attempt);

        if (!empty($sort) && !empty($dir)) 
        {
            $this->db->order_by('UPPER('.$sort.')',$dir);
		}
		else
		{
        	$this->db->order_by('attempt_time','DESC');
        }

        // execute query
		$query = $this->db->get($this->user_login_attempt,$rows,$offset);

		$this->db->flush_cache();  

		// format and return result to controller
        return $this->appunto_auth->formatQueryResult($query,$total);
	}
};
