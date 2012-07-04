/** 
 * Sessions Store
 *
 *
 * A store that uses the {@link APPA.model.Session} model and contains information from the
 * CodeIgniter ci_sessions table.
 *
 * @cfg {int} [pageSize=20] This store pages.
 * @cfg {boolean} [remoteSort=true] This store uses remote sorting.
 * @cfg {boolean} [remoteFilter=true] This store uses remote filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.define('APPA.store.Sessions', {
    extend: 'Ext.data.Store',
	storeId: 'appa_sessions',
    model : 'APPA.model.Session',
    pageSize : 20,
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false
});
