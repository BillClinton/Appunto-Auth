/**
 * An override of Ext.data.reader.Json to be used by AppuntoAuth.lib.proxy.Codeigniter
 *
 * This override prevents an exception from being thrown by the Ext.decode statement in the 
 * event of invalid json. It also removes the warning.
 *
 * If the response is not valid JSON, we will still call the createReadError method which
 * causes an exception to be thrown in the proxy and we will deal with the error there
 * 
 * original method:
 *
 *    getResponseData: function(response) {
 *        try {
 *            return Ext.decode(response.responseText);
 *        } catch (ex) {
 *            Ext.Logger.warn('Unable to parse the JSON returned by the server');
 *            return this.createReadError(ex.message);   
 *        }
 *    }
 */
Ext.define('AppuntoAuth.lib.proxy.CiReader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.ci',

	getResponseData: function(response) 
	{
		var res = Ext.decode(response.responseText,true);

		if (res != null) return res;

		return this.createReadError("You're trying to decode an invalid JSON String: "+response.responseText);
	}
	
});
