/**
 * Appunto Auth Main controller.
 *
 * This controls the main frame and the menu
 *
 * @cfg {Object} cards an object where the properties are the id of the menu tree objects and the values are the corresponding card indexes for that item in the main panel.
 */
Ext.define('APPA.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
		'main.Frame',
		'main.Menu',
		'main.Viewport',
		'main.Container'
    ],

    refs : [{
        ref : 'frameCardPanel',
        selector: '#frameCardPanel'
    }],

	cards: 
	{
		status 		: 0,
		users		: 1,
		groups		: 2,
		roles		: 3,
		permissions	: 4,
		paths		: 5,
		sessions	: 6,
		main		: 7,
		application	: 8,
		credits		: 9,
		license		: 10
	},	

    init: function() 
	{
        this.control(
        {
            'appa_main_menu' : {
                selectionchange	: this.menuChange,
                itemclick		: this.expandChildren
			}
		});
	},

	/**
	 * Called on the menu's selection change event. Changes the content in the main frame coresponding 
	 * with the menu item selected.  This uses the id of the menu item to look up the index of the
	 * module in the main frame's card layout as defined by the cards object. 
	 *
	 * @return void
	 */
	menuChange: function(view, selected)
	{
		var panel 	= this.getFrameCardPanel(),
			layout	= panel.getLayout(),
			record	= selected[0],
			card_id	= record.data.id;

//		console.log(card_id);
//		console.log(this.cards[card_id]);

		if (card_id != '' && undefined != this.cards[card_id])
		{
			layout.setActiveItem(this.cards[card_id]);	
		}
	},

	expandChildren: function(panel, node)
	{
		if (node.isExpanded())
		{
			node.collapse();
		}
		else
		{
			node.expand();
		}
	}

});
