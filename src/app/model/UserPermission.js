/** 
 * UserPermission model 
 *
 *
 * A data model that represents permissions granted to the user personally or through the user's role.
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('APPA.model.UserPermission', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'hasPermission', type: 'int'},
        {name: 'userRoleHasPermission', type: 'int'},
        {name: 'userHasPermission', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    proxy: 
    {
        type    	: 'ci',
        ci_class	: 'appunto-auth/users'
    }
});
