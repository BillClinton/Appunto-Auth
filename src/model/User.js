Ext.define('AppuntoAuth.model.User', 
 {
    extend: 'Ext.data.Model',

    requires: [
        'AppuntoAuth.lib.proxy.Codeigniter'
    ],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'surname', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'active', type: 'int'},
        {name: 'last_login', type: 'string'},
        {name: 'created', type: 'string'},
        {name: 'modified', type: 'string'}
    ],

    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/ui/user'
    }
});
