/** 
 * RolePermissions Store
 *
 *
 * A store that uses the {@link APPA.model.RolePermission} model and contains 
 * permissions belonging to a role.
 *
 * @cfg {int} [pageSize=9999] Setting pageSize high since this store does not page. 
 * @cfg {boolean} [remoteSort=false] This store uses local sorting.
 * @cfg {boolean} [remoteFilter=false] This store uses local filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('APPA.store.RolePermissions', {
    extend: 'Ext.data.Store',
    model : 'APPA.model.RolePermission',
    pageSize : 9999,
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false
});
