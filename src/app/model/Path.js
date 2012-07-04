/** 
 * Path Model
 *
 *
 * A data model that defines paths which are CodeIgniter URIs defined by controller/function
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('APPA.model.Path', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'found', type: 'int'},
        {name: 'dir', type: 'string'},
        {name: 'dir_group', type: 'string'},
        {name: 'ci_controller', type: 'string'},
        {name: 'ci_method', type: 'string'},
        {name: 'public_flag', type: 'int'},
        {name: 'permission_id', type: 'int'},
        {name: 'permission_name', type: 'string'},
        {name: 'note', type: 'string'}
    ],
    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/path'
    }
});
