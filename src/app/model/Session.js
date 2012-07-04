/** 
 * Session model 
 *
 *
 * A data model that represents entries in the CodeIgniter ci_sessions table.
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('APPA.model.Session', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'last_activity', type:'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'ip_address', type: 'string'},
        {name: 'user_agent', type: 'string'}
    ],
    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/session'
    }
});
