/** 
 * RolePermission 
 *
 * A data model that represents permissions belonging to a specified Role.
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('AppuntoAuth.model.RolePermission', 
{
    extend: 'Ext.data.Model',

    requires: [
        'AppuntoAuth.lib.proxy.Codeigniter'
    ],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'inRole', type: 'int'},
        {name: 'description', type: 'string'}
    ],

    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/ui/role'
    }
});
