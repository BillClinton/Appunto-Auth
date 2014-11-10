Ext.require('Ext.data.Store');
Ext.require('AppuntoAuth.model.Permission');

Ext.define('AppuntoAuth.store.Permissions', {
    extend: 'Ext.data.Store',
    model : 'AppuntoAuth.model.Permission',
    pageSize : 0,
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false
});
