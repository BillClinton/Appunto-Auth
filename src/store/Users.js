Ext.require('Ext.data.Store');
Ext.require('AppuntoAuth.model.User');

Ext.define('AppuntoAuth.store.Users', {
    extend: 'Ext.data.Store',
    model : 'AppuntoAuth.model.User',
    pageSize : 20,
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false
});
