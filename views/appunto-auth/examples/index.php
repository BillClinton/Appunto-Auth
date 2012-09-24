<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Appunto Auth examples</title>

	<style type="text/css">

	::selection{ background-color: #E13300; color: white; }
	::moz-selection{ background-color: #E13300; color: white; }
	::webkit-selection{ background-color: #E13300; color: white; }

	body {
		background-color: #fff;
		margin: 40px;
		font: 13px/20px normal Helvetica, Arial, sans-serif;
		color: #4F5155;
	}

	a {
		color: #003399;
		background-color: transparent;
		font-weight: normal;
		text-decoration: none;
	}

	h1, h2 {
		color: #444;
		background-color: transparent;
		border-bottom: 1px solid #D0D0D0;
		font-size: 19px;
		font-weight: normal;
		margin: 0 0 14px 0;
		padding: 14px 15px 10px 15px;
	}

	h2 {
		font-size: 16px;
		border-bottom: 0;
		font-weight: bold;
	}

	code {
		font-family: Consolas, Monaco, Courier New, Courier, monospace;
		font-size: 12px;
		background-color: #f9f9f9;
		border: 1px solid #D0D0D0;
		color: #002166;
		display: block;
		margin: 14px 0 14px 0;
		padding: 12px 10px 12px 10px;
	}

	#body{
		margin: 0 15px 0 15px;
	}

	p {
		padding: 0 15px 10px 30px;
	}
	
	table {
		margin: 0 15px 10px 60px;
		border: 1px solid #D0D0D0;
	}

	table th {
		padding: 2px 6px;
		border-bottom: 1px solid #D0D0D0;
	}

	table td {
		padding: 2px 8px;
	}

	p.footer{
		text-align: right;
		font-size: 11px;
		border-top: 1px solid #D0D0D0;
		line-height: 32px;
		padding: 0 10px 0 10px;
		margin: 20px 0 0 0;
	}
	
	#container{
		margin: 10px;
		border: 1px solid #D0D0D0;
		-webkit-box-shadow: 0 0 8px #D0D0D0;
	}
	</style>
</head>
<body>

<div id="container">
	<h1>Appunto Auth examples</h1>

	<div id="body">
		<h2>Admin Interface in a viewport</h2>
			<p>
				<code>
					&lt;?php echo appunto_auth_application_viewport() ?&gt;
				</code>
				<? echo anchor('appunto-auth/examples/viewport', 'View Example'); ?>
			</p>

		<h2>Admin Interface inline, contained in a div</h2>
			<p>
				<code>
					&lt;?php echo appunto_auth_application("90%","640px","margin:6px auto 0") ?&gt;
				</code>
				<? echo anchor('appunto-auth/examples/app', 'View Example'); ?> (this example also loads a login header)
					<table>
					<tr><th colspan="4" align="left">Parameters</th></tr>
					<tr>
						<td><b>width</b></td>
						<td><i>String</i></td>
						<td>The width of the application in percentage or pixels</td>
						<td>default: "100%"</td>
					</tr>
					<tr>
						<td><b>height</b></td>
						<td><i>String</i></td>
						<td>The width of the application in pixels.  <b>Must be expressed in pixels</b>, eg. "560px"</td>
						<td>default: "600px"</td>
					</tr>
					<tr>
						<td><b>additional_css</b></td>
						<td><i>String</i></td>
						<td>Any additional css you would like to apply to the div that contains the application.</td>
						<td>default: <i>blank</i></td>
					</tr>
					</table>
			</p>

		<h2>Login Box</h2>
			<p>
				<code>
					&lt;?php echo login_box() ?&gt;
				</code>
				<? echo anchor('appunto-auth/examples/login_box', 'View Example'); ?>
					<table>
					<tr><th colspan="4" align="left">Parameters</th></tr>
					<tr>
						<td><b>return</b></td>
						<td><i>boolean</i></td>
						<td>Upon successful login, if <b>true</b> will redirect to this referral url, if <b>false</b> will redirect to the default controller.</td>
						<td>default: false</td>
					</tr>
					<tr>
						<td><b>css</b></td>
						<td><i>String</i></td>
						<td>A CSS class that will be applied to the login box.</b></td>
						<td>default: "login-form-box"</td>
					</tr>
					</table>
			</p>

		<h2>Login Header</h2>
			<p>
				<code>
					&lt;?php echo login_header() ?&gt;
				</code>
				<? echo anchor('appunto-auth/examples/login_header', 'View Example'); ?>
					<table>
					<tr><th colspan="4" align="left">Parameters</th></tr>
					<tr>
						<td><b>return</b></td>
						<td><i>boolean</i></td>
						<td>Upon successful login, if <b>true</b> will redirect to this referral url, if <b>false</b> will redirect to the default controller.</td>
						<td>default: false</td>
					</tr>
					<tr>
						<td><b>css</b></td>
						<td><i>String</i></td>
						<td>A CSS class that will be applied to the login box.</b></td>
						<td>default: "login-form-box"</td>
					</tr>
					</table>
			</p>

	</div>

	<p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds</p>
</div>

</body>
</html>
