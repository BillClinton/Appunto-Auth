Ext.define('AppuntoAuth.lib.util.KeepAlive', 
{
    singleton   : true,

    interval    : 4*60*1000,

    constructor  : function() 
    {
        if (typeof(admin_keepalive) != 'undefined' && Ext.isNumber(admin_keepalive) && admin_keepalive> 0)
        {
            this.interval = admin_keepalive*1000;
        }
        setTimeout(Ext.bind(this.touch), this.interval);
    },

    touch: function()
    {
        var me = AppuntoAuth.lib.util.KeepAlive;

        Ext.Ajax.request({
            url: ci_site_url+'appunto-auth/ui/keep-alive'
        });

        setTimeout(Ext.bind(me.touch), me.interval);
    }

});
