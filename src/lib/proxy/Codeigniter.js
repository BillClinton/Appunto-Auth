/** 
 * CodeigniterProxy:  a data proxy
 *
 * An extension of {@link Ext.data.proxy.Ajax} with some useful modifications for use
 * with the CodeIgniter PHP web application framework.
 *
 * @cfg {String} [siteurl='/auth/'] Application siteurl. Use a trailing slash.
 * @cfg {boolean} [index_php=true] true to include the index.php in codeigniter URLs
 */
Ext.define('AppuntoAuth.lib.proxy.Codeigniter', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.ci',

	requires	: [
		'AppuntoAuth.lib.proxy.CiReader',
		'AppuntoAuth.lib.proxy.CiWriter',
		'AppuntoAuth.lib.lang.Default'
	],


	/*
	 * These two values should reflect your deployment.
	 * 
	 * ci_site_url and ci_base_url should be set like this in your view:
	 *
	 * <!-- set base url, display type -->
	 * <script type="text/javascript">
	 * 		var ci_site_url = "<?php echo('rtrim(site_url(), "/").'/"') ?>", 
	 * 			ci_base_url = "<?php echo(base_url()) ?>";
	 * </script>
	 *
	 * stripping the trailing slash, then adding a trailing slash on site_url
	 * ensures that we don't get a double slash or a missing trailing slash when
	 * removing or using index.php
	 * 
	 * (Actually, base_url is no longer necessary for proxy.Codeigniter
	 * but you might find it useful to set it anyway for other things like
	 * links to js and css files)
	 *
	 */ 
	siteurl		: ci_site_url, 	// has a trailing slash

	loginurl	: ci_site_url+ci_login_url,

	config: {
		ci_class 	: '', // leave this blank, for initialization only.
		ci_method	: '' // leave this blank, for initialization only.
	},

	timeout : 30 * 1000,
	//noCache : false,

    actionMethods: {
        create : 'POST',
        read   : 'POST',
        update : 'POST',
        destroy: 'POST'
    },

	reader: {
		type			: 'ci',  //Alias defined in AppuntoAuth.lib.proxy.CiReader
		rootProperty	: 'rows',
		messageProperty	: 'msg'
	},

	writer: 'ci', //Alias defined in AppuntoAuth.lib.proxy.CiWriter

	errors: {
		server_error_title		: 'Server error',
		server_error_unknown	: 'Unknown error: The server did not send any information about the error.',
		server_error_no_response: 'Unknown error: Server did not send a response.',
		server_error_decode		: 'Error decoding the response sent by the server.',
		server_error_undefined	: 'Undefined Server Error'
	},

	// Common http status codes to provide more information when codeigniter does not send an error
	httpError: {
		400	: 'Bad Request',
		401	: 'Unauthorized',
		403	: 'Forbidden',
		404	: 'Not Found',
		405	: 'Method Not Allowed',
		408	: 'Request Timeout',
		414 : 'Request-URI Too Long',
		500 : 'Internal Server Error',
		501 : 'Not Implemented',
		502 : 'Bad Gateway',
		503 : 'Service Unavailable',
		504 : 'Gateway Timeout',
		505 : 'HTTP Version Not Supported',
		509 : 'Bandwidth Limit Exceeded',
		511 : 'Network Authentication Required' 
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
		this.setCi_method( request.getOperation().config.ci_method || request.config.action );
	},

    /**
     * Build the URLs for this request in this format: siteurl/ci_class/op.
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
		this.setCi_methodString(request);

		return this.getSiteurl()+this.getCi_class()+'/'+this.getCi_method();
	},
   
    // operation exception
    listeners: 
    {
        exception: function (proxy, request, operation) 
        {
			var errors, error, login_redir = false;

            if (request.responseText != undefined) 
            {
                // responseText was returned, decode it
                responseObj = Ext.decode(request.responseText,true); // true to return null instead of throwing an exception if the JSON is invalid.
                if (responseObj != null && responseObj.msg != undefined)
                {
                    // message was returned 
					errors = (responseObj.errors != undefined) ? '<ul>'+responseObj.errors+'</ul>' : '';
					error = '<p>' + responseObj.msg + '</p>' + errors;
					login_redir = (responseObj.err != undefined) && (responseObj.err=='LOGIN') ? true : false ;

					this.alertError(this.getErrorMsg('server_error_title'),error,login_redir);
                }
                else
                {
					// response could not be decoded, check if it is a CodeIgniter message
					error = this.getCodeigniterError(request);
		
					// response could not be decoded, check if it there is a defined http error code
					if ((error == null) && (request.status != undefined && this.httpError[request.status] != undefined))
					{
						error = '<p style="width:200px"><b>'+request.status+'</b></p><p>'+this.httpError[request.status]+'</p>';
						this.alertError(this.getErrorMsg('server_error_title'),error);
					}

					// If not a CodeIgniter error and no status code, then report json decoding error
					if (error == null) error = this.getErrorMsg('server_error_decode')

					this.alertError(this.getErrorMsg('server_error_title'),error);
                }
            }
            else
            {
                // no responseText sent
                this.alertError(this.getErrorMsg('server_error_title'),this.getErrorMsg('server_error_no_response')); 
            }
        }
    },

	getCodeigniterError: function (request) 
	{
		var ci_error_el,
			ci_error_div; 

		if (request != undefined && request.responseText != undefined)
		{

			ci_error_el	= document.createElement('div'); 
				
			ci_error_el.innerHTML = request.responseText;	
			ci_error_div = ci_error_el.getElementsByTagName('div')[0];

			// send error found in div on codeigniter error page
			if (ci_error_div != undefined) return ci_error_div.innerHTML;	
		}
		return null;
	},

	alertError: function(title, msg, login_redir) 
	{
		var	login_url = this.loginurl,
			handler = function(button) { button.up('window').close(); }

		if (login_redir == true) 
		{
			handler = function(button) 
			{ 
				button.up('window').close(); 
				location.href = login_url;
			}
		}

		Ext.create('Ext.window.Window', {
			title	: title,
			iconCls	: 'exclamation',
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
					handler	: handler
				}
			]
		}).show();
	},

	getErrorMsg: function(type) 
	{
		if (
				(typeof Lang !== 'undefined') && 
				(typeof Lang.localize == 'function') && 
				(Lang.localize(type) != undefined)
			) 
		{
			return Lang.localize(type);
		}
		else
		{
			return this.errors[type];
		}
	},

	getSiteurl: function() {
		return this.siteurl;
	}

});
