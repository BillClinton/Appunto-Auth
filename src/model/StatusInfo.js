/** 
 * StatusInfo model 
 *
 * A data model that represents name/value pair items of application information
 *
 * @cfg {Array} fields An Array of {@link Ext.data.Field} defintions.
 * @cfg {String/Object/Ext.data.proxy.Proxy} [proxy=ci] Uses {@link APPUNTO.lib.proxy.Codeigniter} defined by "ci" alias.
 */
Ext.require('Ext.data.Model');
Ext.require('AppuntoAuth.lib.proxy.Codeigniter');

Ext.define('AppuntoAuth.model.StatusInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'info_item', type: 'string'},
        {name: 'info_val', type: 'string'},
        {name: 'info_note', type: 'string'}
    ],
    proxy: 
    {
        type    : 'ci',
        ci_class: 'appunto-auth/ui/statusinfo'
    }
});
