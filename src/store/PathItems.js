/** 
 * PathItems Store
 */
Ext.define('AppuntoAuth.store.PathItems', {
    extend: 'Ext.data.Store',

	fields	: [
        {name: 'id', type: 'int'},
        {name: 'found', type: 'int'},
        {name: 'dir', type: 'string'},
        {name: 'full_path', type: 'string'},
        {name: 'ci_controller', type: 'string'},
        {name: 'ci_method', type: 'string'},
        {name: 'public_flag', type: 'int'},
        {name: 'permission_id', type: 'int'},
        {name: 'permission_name', type: 'string'},
        {name: 'note', type: 'string'}
	]
});
