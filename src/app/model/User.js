/** 
 * User model 
 *
 *
 * A data model that represents application users.
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.define('APPA.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'password2', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'surname', type: 'string'},
        {name: 'email', type: 'string'},
		{name: 'active', type: 'int'},
		{name: 'last_ip', type: 'string'},
        //{name: 'last_login', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'last_login', type: 'string'},
        {name: 'created', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'modified', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ],
    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/users'
    }
});
