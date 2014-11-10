/** 
 * RolePermissions Store
 *
 *
 * A store that uses the {@link AppuntoAuth.model.RolePermission} model and contains 
 * permissions belonging to a role.
 *
 * @cfg {int} [pageSize=0] This store does not page. 
 * @cfg {boolean} [remoteSort=false] This store uses local sorting.
 * @cfg {boolean} [remoteFilter=false] This store uses local filtering.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.require('Ext.data.Store');
Ext.require('AppuntoAuth.model.RolePermission');

Ext.define('AppuntoAuth.store.RolePermissions', {
    extend: 'Ext.data.Store',
    model : 'AppuntoAuth.model.RolePermission',
    pageSize : 0,
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false
});
