/** 
 * StatusInfos Store
 *
 *
 * A store that uses the {@link AppuntoAuth.model.StatusInfo} model and contains information 
 * about the application
 *
 * @cfg {int} [pageSize=20] This store pages.
 * @cfg {boolean} [autoLoad=false] Do not automatically load this store.
 */
Ext.require('Ext.data.Store');
Ext.require('AppuntoAuth.model.StatusInfo');

Ext.define('AppuntoAuth.store.StatusInfos', {
    extend: 'Ext.data.Store',
    model : 'AppuntoAuth.model.StatusInfo',
    pageSize : 0,
    autoLoad: false
});
