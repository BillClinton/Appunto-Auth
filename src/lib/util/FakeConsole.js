Ext.define('AppuntoAuth.lib.util.FakeConsole', 
{
    singleton : true,

    constructor: function()
    {
        if (typeof console === "undefined") 
        {
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
});
