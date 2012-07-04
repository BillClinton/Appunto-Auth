<!DOCTYPE html>
<html>
<head>
    <title>Appunto Auth Demo - <?php echo CI_VERSION ?></title>
<link rel="SHORTCUT ICON" href="favicon.ico">
<style>
/* Loading Mask */
#loading-mask {
  position: absolute;
  left:     0;
  top:      0;
  width:    100%;
  height:   100%;
  z-index:  20000;
  background-color: white;
}

#loading {
  position: absolute;
  left:     50%;
  top:      50%;
  padding:  2px;
  z-index:  20001;
  height:   auto;
  margin:   -80px 0 0 -120px;
}

#loading .loading-indicator {
  background: url(<?php echo base_url();?>css/icons/indicator.gif) no-repeat;
  color:      #555;
  font:       13px Tahoma, 'Helvetica Neue', Helvetica, sans-serif;
  padding:    8px 42px;
  margin:     0;
  text-align: center;
  height:     auto;
}
</style>
</head>
<body>
<div id="loading-mask"></div>
<div id="loading">
  <div class="loading-indicator">
    <span id="loading-msg">Loading styles and images...</span>
  </div>
</div>

<div id='script-includes'>
    <!-- ExtJS style sheets -->
    <link rel="stylesheet" type="text/css" href="<?=base_url()?>lib/ext/resources/css/ext-all.css">

    <!-- Application style sheets -->
    <link rel="stylesheet" type="text/css" href="<?=base_url()?>appunto/css/appunto_auth_app.css" />
<!--    <link rel="stylesheet" type="text/css" href="<?=base_url()?>appunto/css/appunto_auth_curvy.css" /> -->
    <link rel="stylesheet" type="text/css" href="<?=base_url()?>appunto/css/appunto_auth_branding.css" /> 
    <link rel="stylesheet" type="text/css" href="<?=base_url()?>appunto/css/appunto_auth_icons.css" />

    <!-- ExtJS library -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Sencha ExtJS...';</script>
<!--    <script type="text/javascript" src="<?php echo base_url();?>lib/ext/ext-debug.js"></script> -->
    <script type="text/javascript" src="<?php echo base_url();?>lib/ext/ext-all-debug.js"></script> 

	<!-- Application requirements -->
    <script type="text/javascript" src="<?php echo base_url();?>appunto/Overrides.js"></script> 
    <script type="text/javascript" src="<?php echo base_url();?>appunto/Ext.app.EventBus.js"></script> 
    <script type="text/javascript" src="<?php echo base_url();?>appunto/SubApplication.js"></script> 

	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Application...';</script>
    <script type="text/javascript" src="<?php echo base_url();?>appunto/Codeigniter.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>appunto/appunto_auth.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>src/app_src.js"></script>

</div>

<div id="app-user">
<?php if (isset($username)) { ?>
	<span class="usertext">logged in as </span> <span class="username"><?php echo $username; ?></span> 
	<input type="button" value="Logout" class="logout-button" onClick="parent.location='<? echo site_url(array('user','logout')) ?>'"></div>
  <div style="clear:both;"></div>
<? } ?>
</div>

<div id='appunto-auth-credits'>
The following products were used in the creation of Appunto Auth. Trademarks and copyrights are property of their respective owners.

<h2>CodeIgniter</h2>
<p><a href='http://codeigniter.com/' target='_new'>http://codeigniter.com/</a>
<p>CodeIgniter is a powerful PHP framework with a very small footprint, built for PHP coders who need a simple and elegant toolkit to create full-featured web applications.</p>
<p>For licensing information, please visit <a href='http://codeigniter.com/user_guide/license.html' target='_new'>http://codeigniter.com/user_guide/license.html</a></p> 

<h2>Sencha Ext JS</h2>
<p><a href='http://www.sencha.com/products/extjs/' target='_new'>http://www.sencha.com/products/extjs/</a>
<p>Ext JS is a JavaScript framework for building rich internet applications that work in any web browser.</p>
<p> Appunto Auth is intended to work using either the GPL or commercial versions of Ext JS.  For licensing information, please visit <a href='http://www.sencha.com/products/extjs/license/' target='_new'>http://www.sencha.com/products/extjs/license/</a></p> 

<h2>Silk Icons</h2>
<p><a href='http://www.famfamfam.com/lab/icons/silk/' target='_new'>http://www.famfamfam.com/lab/icons/silk/</a>
<p>Silk is a smooth, free icon set, containing over 700 16-by-16 pixel icons in strokably-soft PNG format. Containing a large variety of icons, you're sure to find something that tickles your fancy. And all for a low low price of $0.00. You can't say fairer than that.</p>
<p>Silk is licensed under a Creative Commons Attribution 2.5 License.</p> 

<h2>Fugue Icons</h2>
<p><a href='http://p.yusukekamiyamane.com/' target='_new'>http://p.yusukekamiyamane.com/</a>
<p>Icon set by Yusuke Kamiyamane.</p>
<p>Fugue Icons are licensed under a Creative Commons Attribution 3.0 License.</p> 
</div>

<div id='appunto-auth-license'>
<p>Appunto Auth is licensed under a version of the MIT license.  You may remove this message from the interface, but do not remove the copyright and permission notice contained in the application/libraries/APPUNTO_LICENSE.TXT file. </p>

<p>Copyright (c) 2012 Bill Clinton (bclinton@appunto.net) </p>

<p>If you find Appunto Auth to be useful and you would like to give something back, I encourage you to contribute to The Center for Biological Diversity at <a href='http://www.biologicaldiversity.org/' target='_new'>http://www.biologicaldiversity.org/</a></p>

<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>

<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>

<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</div>

</body>
</html>
