Ext.define('AppuntoAuth.lib.util.FakeConsole', {

	statics: 
	{
		init: function () 
		{
			if (typeof console === "undefined") {
				console =
				{
					log     : function () { },
					info    : function () { },
					warn    : function () { },
					error   : function () { },
					time    : function () { },
					timeEnd : function () { }
				}

			}
		}
	}
});
