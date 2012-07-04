/** 
 * CodeigniterProxy:  a data proxy
 *
 * An extension of {@link Ext.data.proxy.Ajax} with some useful modifications for use
 * with the CodeIgniter PHP web application framework.
 *
 * @cfg {String} [baseurl='/auth/'] Application baseurl. Use a trailing slash.
 * @cfg {boolean} [index_php=true] true to include the index.php in codeigniter URLs
 */
Ext.define('APPUNTO.lib.proxy.Codeigniter', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.ci',

	/*
	 * These two values should reflect your deployment
	 */ 
	baseurl 	: appunto_auth_base_url, 		// use a trailing slash
	index_php	: false,		// true to include the index.php in codeigniter URLs

	ci_class 	: '', // leave this blank, for initialization only.
	ci_method		: '', // leave this blank, for initialization only.

	timeout : 30 * 1000,
	//noCache : false,

    actionMethods: {
        create : 'POST',
        read   : 'POST',
        update : 'POST',
        destroy: 'POST'
    },

	reader: {
		type: 'json',
		root: 'rows',
		messageProperty: 'msg',
		// Override getResponseData method in json reader.  Send exceptions to proxy
		getResponseData: function(response)
		{
			try {
				var data = Ext.decode(response.responseText);
			}
			catch (ex) {
				//this.proxy.handleJsonException(this.proxy, response);
				return { success: false, msg: ' Unable to parse the JSON returned by the server'};
			}
			return data;
		}
	},

	writer: 
	{
		// Ajax proxy wants to send the variables as a json payload, send data as POST params 
		writeRecords: function(request) 
		{
			var record 	= request.records[0],
					data	= record.data,
					modified= record.modified;

			request.params['id'] = data['id'];

			for (rec in modified)
			{
				request.params[rec] = data[rec];
			}
			return request;
		}
	},

    /**
     * Set the 'ci_method' for this url which corresponds to a codeigniter controller function taking into account the order of priority,
     * - The request
     * - The api
	 *
     * @private
     * @param {Ext.data.Request} request The request
     * @return void
     */
	setCi_methodString: function(request)
	{
		this.setCi_method( request.operation.ci_method || request.operation.action );
	},

    /**
     * Build the URLs for this request in this format: baseurl/ci_class/op.
	 * - ci_class: Represents the codeigniter controller class that should be invoked.
	 * - op: Represents the codeigniter controller class function, or ci_method, that should be called.
	 *
	 *
	 * Overrides function in Ext.data.proxy.Ajax
	 * 
     * @private
     * @param {Ext.data.Request} request The request
     * @return void
     */
	buildUrl : function(request) 
	{
		var	index_string = this.getIndex_php() ? 'index.php/' : '';

		this.setCi_methodString(request);

		return this.getBaseurl()+index_string+this.getCi_class()+'/'+this.getCi_method();
	},
   
    // operation exception
    listeners: 
    {
        exception: function (proxy, request, operation) 
        {
            if (request.responseText != undefined) 
            {
                // responseText was returned, decode it
                responseObj = Ext.decode(request.responseText,true);
                if (responseObj != null && responseObj.msg != undefined)
                {
					var errors = (responseObj.errors != undefined) ? '<ul>'+responseObj.errors+'</ul>' : '',
						msg = '<p>' + responseObj.msg + '</p>' + errors;

					console.log(errors);

                    // message was returned 
                    Ext.Msg.show({
						title	: 'Error',
						msg		: msg,
						buttons : Ext.Msg.OK,
						width	: 400,
						icon	: Ext.Msg.ERROR
					}); 
                }
                else
                {
                    this.alertError('Server Error',
						this.getCodeigniterError(request,'Unknown error: The server did not send any information about the error.'));
                }
            }
            else
            {
                // no responseText sent
                this.alertError('Error','Unknown error: Server did not send a response.'); 
            }
        }
    },

	getCodeigniterError: function (request,msg) 
	{
		var ci_error_el,
			ci_error_div, 
			ci_error = typeof(msg) != 'undefined' ? msg : 'Undefined Server Error',
			iconStyle;

		if (request != undefined && request.responseText != undefined)
		{

			ci_error_el	= document.createElement('div'); 
				
			ci_error_el.innerHTML = request.responseText;	
			ci_error_div = ci_error_el.getElementsByTagName('div')[0];

			// send error found in div on codeigniter error page
			if (ci_error_div != undefined) ci_error = ci_error_div.innerHTML;	
			// no div found, send text
			if (request.responseText.length > 0) ci_error = request.responseText;
		}
		return ci_error;
	},

    /**
     * Alert user to error decoding the response sent by the server.
	 * This can be ignored by setting the "silent" flag in the operation.
	 * 
     * @private
     * @return void
     */
	handleJsonException: function (proxy, request)
	{
        this.alertError('Server Error', this.getCodeigniterError(request,'Error decoding the response sent by the server.')); 
	},

	alertError: function(title, msg) 
	{
		Ext.create('Ext.window.Window', {
			title	: title,
			iconCls	: 'exclamation',
			height	: 240,
			width	: 420,
			layout	: 'fit',
			modal	: true,
			items: {  
				xtype		: 'container',
				style		: 'padding: 8px',
				autoScroll	: true,
				html		: msg,
				border		: 0
			},
			buttons : [
				{
					text	: 'Ok',
					handler	: function(button) { button.up('window').close(); }
				}
			]
		}).show();
	},

	setBaseurl: function(baseurl) {
		this.baseurl = baseurl;
	},
	getBaseurl: function() {
		return this.baseurl;
	},
	setCi_class: function(ci_class) {
		this.ci_class = ci_class;
	},
	getCi_class: function() {
		return this.ci_class;
	},
	setCi_method: function(ci_method) {
		this.ci_method = ci_method;
	},
	getCi_method: function() {
		return this.ci_method;
	},
	setIndex_php: function(index_php) {
		this.index_php = index_php;
	},
	getIndex_php: function() {
		return this.index_php;
	}

});
