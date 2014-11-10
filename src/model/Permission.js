Ext.require('Ext.data.Model');
Ext.require('AppuntoAuth.lib.proxy.Codeigniter');

Ext.define('AppuntoAuth.model.Permission', {
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
        ci_class: 'appunto-auth/ui/permission'
    }
});
