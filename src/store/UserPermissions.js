/** 
 * UserPermissions Store
 *
 *
 * A store that uses the {@link AppuntoAuth.model.UserPermission} model and contains permissions for a user
 *
 * @cfg {int} [pageSize=9999] Setting pageSize high since this store does not page. 
 * @cfg {boolean} [remoteSort=false] This store uses local sorting.
 * @cfg {boolean} [remoteFilter=false] This store uses local filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('AppuntoAuth.store.UserPermissions', {
    extend: 'Ext.data.Store',
    model : 'AppuntoAuth.model.UserPermission',
    pageSize : 9999,
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false
});
