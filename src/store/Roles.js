/** 
 * Role Store
 *
 *
 * A store that uses the {@link AppuntoAuth.model.Role} model and contains application roles.
 *
 * @cfg {int} [pageSize=0] This store does not page. 
 * @cfg {boolean} [remoteSort=true] This store uses remote sorting.
 * @cfg {boolean} [remoteFilter=true] This store uses remote filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.require('Ext.data.Store');
Ext.require('AppuntoAuth.model.Role');

Ext.define('AppuntoAuth.store.Roles', {
    extend: 'Ext.data.Store',
    model : 'AppuntoAuth.model.Role',
    pageSize : 0,
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false
});
