/** 
 * GroupUsers Store
 *
 *
 * A store that uses the {@link APPA.model.GroupUser} model and contains 
 * users belonging to a group.
 *
 * @cfg {int} [pageSize=9999] Setting pageSize high since this store does not page. 
 * @cfg {boolean} [remoteSort=false] This store uses local sorting.
 * @cfg {boolean} [remoteFilter=false] This store uses local filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('APPA.store.GroupUsers', {
    extend: 'Ext.data.Store',
    model : 'APPA.model.GroupUser',
    pageSize : 9999,
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false
});
