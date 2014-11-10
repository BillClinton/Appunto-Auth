/** 
 * Controllers Store
 */
Ext.define('AppuntoAuth.store.Controllers', {
    extend: 'Ext.data.Store',

	fields	: [
		{name: 'ci_controller', type: 'string'},
        {name: 'dir', type: 'string'},
        {name: 'full_path', type: 'string'},
		{name: 'methods', type: 'int'},
		{name: 'public_methods', type: 'int'},
		{name: 'private_methods', type: 'int'}
	]
});
