<?php
/*
 * JQUERY4U DEMO SCRIPT
 * GET FACEBOOK FANS AND TWITTER FOLLOWERS
 */
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