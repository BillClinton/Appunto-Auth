/** 
 * Users Store
 *
 *
 * A store that uses the {@link APPA.model.User} model and contains application users.
 *
 * @cfg {int} [pageSize=20] This store pages.
 * @cfg {boolean} [remoteSort=true] This store uses remote sorting.
 * @cfg {boolean} [remoteFilter=true] This store uses remote filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('APPA.store.Users', {
    extend: 'Ext.data.Store',
    model : 'APPA.model.User',
    pageSize : 20,
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false
});
