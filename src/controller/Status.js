Ext.define('AppuntoAuth.controller.Status', {
    extend: 'Ext.app.Controller',

	models: [
		'StatusInfo'
	],

	stores : [
		'StatusInfos'
	],

    views: [
		'status.View'
    ],

    refs : [{
        ref : 'statusInfo',
        selector: 'appa_status_view dataview'
    }],

    init: function() 
	{
        this.control(
        {
            'appa_status_view' : {
				activate		: this.refreshView
            },
            'appa_status_view button[action="refresh"]': {
                click			: this.refreshView
            }
		});
	},

	refreshView: function(button)
	{
		this.getStatusInfo().getStore().load();
	}

});
