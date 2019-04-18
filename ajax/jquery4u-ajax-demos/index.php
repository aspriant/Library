<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta name="description" content="" />
	<meta name="keywords" content="" />

<script type="text/javascript" src="../js/jquery-1.6.4.js"></script>
<script type="text/javascript" src="../script.js"></script>
<script type="text/javascript" src="ajax-functions.js"></script>

<title>jQuery.ajax() Demos | jQuery4u Demo</title>

<link rel="stylesheet" type="text/css" href="../styles.css">
<style lang="text/css">
.contentblock {
    padding: 15px;
    border: 1px solid gray;
    background-color: #FAF9F9;
}
pre {
    display: block;
    font-family: -moz-fixed;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    white-space: pre;
    color: #000;
}
.contentblock div {
    padding: 15px 0;
    color: blue;
    font-size: 14px;
}
</style>

<script type="text/javascript">
	jQuery(document).ready(function($) {
		JQFUNCTIONS.init();
	});
</script>

</head>
<body>
<div id="page-wrap">

	<?php include("../header.php"); ?>


<div id="content">

<h1>jQuery Ajax Examples</h1>

<p>There are 5 different Ajax demos below and you can also <a href="http://www.jquery4u.com/demos/ajax/jquery4u-ajax-demos.zip">download all demos in a package</a> to try them out and experiment yourself (the best way to understand how the ajax function works is to have a go!).</p>

<h3>jQuery.ajax() Example with PHP Script</h3>
<p class="blue-bold">This example loads data from a PHP script (which gets the number of Facebook fans and Twitter followers for the jQuery4u blog)</p>
<div class="contentblock">
<pre><code>
-----------------------------------------------------
JQUERY - CALL PHP SCRIPT TO GET DATA FOR WEB PAGE
-----------------------------------------------------
$.ajax({
  url: 'getTwitterFollowers.php',
  type: 'GET',
  data: 'twitterUsername=jquery4u',
  success: function(data) {
	//called when successful
	$('#ajaxphp-results').html(data);
  },
  error: function(e) {
	//called when there is an error
	//console.log(e.message);
  }
});
-----------------------------------------------------
PHP - GET NUMBER FACEBOOK FANS & TWITTER FOLLOWERS
-----------------------------------------------------
< ?php
//get data passed to script
$username = htmlspecialchars(strip_tags($_GET["twitterUsername"]));

//get twitter followers
$api_page = 'http://twitter.com/users/show/' . $username;
$xml = file_get_contents ( $api_page );
$profile = new SimpleXMLElement ( $xml );
$count = $profile->followers_count;
$tfans = strval ( $count );

//get facebook likes
$fuser = json_decode(file_get_contents('http://graph.facebook.com/140918675956744/'));

//return result
echo "jQuery4u has " . $fuser->likes . " Facebook fans and " . $tfans . " Twitter followers.";
?>
</code></pre>
<button id="ajaxphp">Run Code Above</button>
<div id="ajaxphp-results" class="results"></div>
</div>

<h3>jQuery.getJSON() Example</h3>
<p class="blue-bold">This example loads destinations.json which is located in the same folder.</p>
<div class="contentblock">
<pre><code>
$.getJSON('destinations.json', function(data) {
  $('#getJSON-results').html(JSON.stringify(data));
});
</code></pre>
<button id="getJSON">Run Code Above</button>
<div id="getJSON-results" class="results"></div>
</div>

<h3>jQuery.getScript() Example</h3>
<p class="blue-bold">This example loads in a geo location js script which contains geo location functions.</p>
<div class="contentblock">
<pre><code>
jQuery.getScript('http://www.geoplugin.net/javascript.gp', function()
{
    $('#getScript-results').html("Your location is: " + geoplugin_countryName() + ",
    " + geoplugin_region() + ", " + geoplugin_city());
});
</code></pre>
<button id="getScript">Run Code Above</button>
<div id="getScript-results" class="results"></div>
</div>

<h3>.load() Example</h3>
<p class="blue-bold">This example loads just the header of the jQuery4u blog via ajax.</p>
<div class="contentblock">
<pre><code>
$('#load-results').load('http://www.jquery4u.com .header', function(data){
	//example of callback
	console.log(data);
});
</code></pre>
<button id="load">Run Code Above</button>
<div id="load-results" class="results"></div>
</div>

<h3>jQuery.ajax() and JSONP (cross domain calls) Example</h3>
<p class="blue-bold">This example loads the destinations.json (which is on another domain) using JSONP callback.</p>
<div class="contentblock">
<pre><code>
$.ajax({
	type: 'GET',
	url: 'http://www.phpscripts4u.com/data/destinations.json',
	async: false,
	jsonpCallback: 'jsonCallback',
	contentType: "application/json",
	dataType: 'jsonp',
	success: function(data)
	{
		$('#jsonp-results').html(JSON.stringify(data));
		console.log(json);
	},
	error: function(e)
	{
	   alert(e.message);
	}
});
</code></pre>
<button id="jsonp">Run Code Above</button>
<div id="jsonp-results" class="results"></div>
</div>

<h3>jQuery.getJSON API Call Example</h3>
<p class="blue-bold">This example loads the latest 5 pictures from Flickr that are tagged jQuery.</p>
<div class="contentblock">
<pre><code>
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
{
  tags: "jquery,javascript",
  tagmode: "any",
  format: "json"
},
function(data) {
  $.each(data.items, function(i,item){
    $("< img/>").attr("src", item.media.m).appendTo("#flickrapi-results");
    if ( i == 10 ) return false;
  });
});
</code></pre>
<button id="flickrapi">Run Code Above</button>
<div id="flickrapi-results" class="results"></div>
</div>

<p>
<a class="seelivedemo" href="http://www.jquery4u.com/demos/ajax/jquery4u-ajax-demos.zip">Download Demos</a>
</p>
</div>

	<!-- footer (includes analytics) -->
	<?php include("../footer.php"); ?>
</div> <!-- end page wrap -->
</body>
</html>