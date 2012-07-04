/** 
 * UserPermissions Store
 *
 *
 * A store that uses the {@link APPA.model.UserPermission} model and contains permissions for a user
 *
 * @cfg {int} [pageSize=9999] Setting pageSize high since this store does not page. 
 * @cfg {boolean} [remoteSort=false] This store uses local sorting.
 * @cfg {boolean} [remoteFilter=false] This store uses local filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('APPA.store.UserPermissions', {
    extend: 'Ext.data.Store',
    model : 'APPA.model.UserPermission',
    pageSize : 9999,
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false
});
