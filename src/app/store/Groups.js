/** 
 * Group Store
 *
 *
 * A store that uses the {@link APPA.model.Group} model and contains application groups.
 *
 * @cfg {int} [pageSize=9999] Setting pageSize high since this store does not page. 
 * @cfg {boolean} [remoteSort=true] This store uses remote sorting.
 * @cfg {boolean} [remoteFilter=true] This store uses remote filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('APPA.store.Groups', {
    extend: 'Ext.data.Store',
    model : 'APPA.model.Group',
    pageSize : 9999,
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false
});
