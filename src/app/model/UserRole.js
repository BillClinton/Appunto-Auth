/** 
 * UserRole model 
 *
 *
 * A data model that represents roles belonging to a user.
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('APPA.model.UserRole', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'hasRole', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    proxy: 
    {
        type    	: 'ci',
        ci_class	: 'appunto-auth/users'
    }
});
