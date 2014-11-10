Ext.define('AppuntoAuth.lib.util.CustomVTypes', {

	requires	:	[
		'AppuntoAuth.lib.lang.Default'
	],

	statics: 
	{
		apply: function () {
			Ext.apply(Ext.form.field.VTypes, {
				passformat: function(val ) 
				{
					var format = new RegExp(pw_regex);

					return format.test(val);
				},
				passformatText: Lang.localize('password_format'),

				passconfirm: function(val, field) 
				{
					if (field.passField) {
						var pwd = field.up('form').down('#' + field.passField);
						return (val == pwd.getValue());
					}
					return false;
					return true;
				},
				passconfirmText: Lang.localize('password_match')
			});
		}
	}

});
