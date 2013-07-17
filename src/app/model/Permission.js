/** 
 * Permission Model
 *
 *
 * A data model that represents application permissions.
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('APPA.model.Permission', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'hasPermission', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'internal_name', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/permission'
    }
});
