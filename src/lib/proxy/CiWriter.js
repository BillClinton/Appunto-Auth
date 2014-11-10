/**
 * An override of Ext.data.writer.Json to be used by AppuntoAuth.lib.proxy.Codeigniter
 *
 * This override sends data as POST parameters rather than as a JSON payload so you can use
 * CodeIgniter's form validation library
 */
Ext.define('AppuntoAuth.lib.proxy.CiWriter', {
    extend: 'Ext.data.writer.Json',
    alias: 'writer.ci',

	writeRecords: function(request) 
	{
		var record  = request.getRecords()[0],
			changes	= record.getChanges(),
			field;

        request.setParam('id', record.get('id'));

		for (field in changes)
		{
        	request.setParam(field, changes[field]);
		}
		return request;
	}
	
});
