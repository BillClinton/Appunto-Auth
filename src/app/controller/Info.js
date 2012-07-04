Ext.define('APPA.controller.Info', {
    extend: 'Ext.app.Controller',

    views: [
        'info.MainPanel',
        'info.ApplicationPanel',
        'info.CreditsPanel',
        'info.LicensePanel',
    ],

    init: function() 
	{
        this.control(
        {
            'appa_info_application_panel' : {
				afterlayout: this.writeExtVersion
            }
		});
	},

	writeExtVersion: function(button)
	{
		console.log('writeExtVersion');
		console.log(Ext.get('extjs-version-display'));
		Ext.get('extjs-version-display').update(Ext.getVersion());
	}

});

