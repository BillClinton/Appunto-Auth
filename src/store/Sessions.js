/** 
 * Sessions Store
 *
 *
 * A store that uses the {@link AppuntoAuth.model.Session} model and contains information from the
 * CodeIgniter ci_sessions table.
 *
 * @cfg {int} [pageSize=20] This store pages.
 * @cfg {boolean} [remoteSort=true] This store uses remote sorting.
 * @cfg {boolean} [remoteFilter=true] This store uses remote filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.require('Ext.data.Store');
Ext.require('AppuntoAuth.model.Session');

Ext.define('AppuntoAuth.store.Sessions', {
    extend: 'Ext.data.Store',
    model : 'AppuntoAuth.model.Session',
    pageSize : 0,
    remoteSort: false,
    remoteFilter: true,
    autoLoad: false
});
