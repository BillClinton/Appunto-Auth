Ext.define('APPA.controller.Settings', {
    extend: 'Ext.app.Controller',

    views: [
        'settings.Frame',
        'settings.Menu',
        'settings.Info'
    ],

	cards: 
	{
		settings_info		: 0
	},	

    refs : [{
        ref : 'settingsCardPanel',
        selector: '#settingsCardPanel'
    }],

    init: function() 
	{
        this.control(
        {
            'settingsmenu' : {
                itemclick	: this.menuChange
            }
		});
	},

	menuChange: function(p, record, item, index)
	{
		var panel 	= this.getSettingsCardPanel(),
			layout	= panel.getLayout(),
			card_id	= record.data.id;

		if (card_id != '' && undefined != this.cards[card_id])
		{
			layout.setActiveItem(this.cards[card_id]);	
		}
		
	}

});

