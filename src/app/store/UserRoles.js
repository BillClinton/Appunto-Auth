/** 
 * UserRoles Store
 *
 *
 * A store that uses the {@link APPA.model.UserRole} model and contains roles for a user
 *
 * @cfg {int} [pageSize=9999] Setting pageSize high since this store does not page. 
 * @cfg {boolean} [remoteSort=false] This store uses local sorting.
 * @cfg {boolean} [remoteFilter=false] This store uses local filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('APPA.store.UserRoles', {
    extend: 'Ext.data.Store',
    model : 'APPA.model.UserRole',
    pageSize : 9999,
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false
});
