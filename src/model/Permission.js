Ext.define('AppuntoAuth.model.Permission', 
{
    extend  : 'Ext.data.Model',

    requires: [
        'AppuntoAuth.lib.proxy.Codeigniter'
    ],

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
        ci_class: 'appunto-auth/ui/permission'
    }
});
