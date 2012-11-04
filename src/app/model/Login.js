/** 
 * Login Model 
 *
 *
 * A data model that represents application roles.
 *
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('APPA.model.Login', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'attempt_time', type: 'date', format: 'Y-m-d H:i:s'},
        {name: 'username', type: 'string'},
        {name: 'ip_address', type: 'string'},
        {name: 'user_agent', type: 'string'},
        {name: 'success', type: 'int'},
        {name: 'note', type: 'string'}
    ],
    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/user/login_attempts'
    }
});
