Ext.define('AppuntoAuth.lib.util.KeepAlive', {

	statics: 
	{
		interval : 4*60*1000,

		init: function(interval) 
		{
			if (interval > 0)
			{
				AppuntoAuth.lib.util.KeepAlive.interval = interval*1000;
				AppuntoAuth.lib.util.KeepAlive.touch();
			}
		},

		touch: function()
		{
			Ext.Ajax.request({
				url: ci_site_url+'appunto-auth/ui/keep-alive'
			});
			setTimeout(Ext.bind(AppuntoAuth.lib.util.KeepAlive.touch), AppuntoAuth.lib.util.KeepAlive.interval);
		}

	}
});
