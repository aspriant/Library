/* Copyright JQUERY4U 2011 */
(function($)
{
    JQFUNCTIONS =
    {
        settings:
        {
			ajaxImage: 'loading.gif'
        },

        init: function()
        {
			//button events
			$('button').live('click', function(e) {
				e.preventDefault();
				eval('JQFUNCTIONS.runFunc["'+$(this).attr("id")+'"]();');
			});
        },

        runFunc:
        {

            "ajaxphp": function()
            {
				//console.log('running ajaxphp...');
				$('#ajaxphp-results').html('<img src="loading.gif" />');
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
					$('#ajaxphp-results').html(e.message);
				  }
				});	
            },

            "getJSON": function()
            {
                //console.log('running getJSON...');
				$('#getJSON-results').html('<img src="loading.gif" />');
				$.getJSON('destinations.json', function(data) {
					 $('#getJSON-results').html(JSON.stringify(data));
				});
            },
			
            "getScript": function()
            {
                //console.log('running getScript...');
				$('#getScript-results').html('<img src="loading.gif" />');
				jQuery.getScript('http://www.geoplugin.net/javascript.gp', function()
				{
				    $('#getScript-results').html("Your location is: " + geoplugin_countryName() + ", " + geoplugin_region() + ", " + geoplugin_city());
				});
            },
			
            "load": function()
            {
                //console.log('running load...');
				$('#load-results').html('<img src="loading.gif" />');
				$('#load-results').load('http://www.jquery4u.com .header', function(data){
					//example of callback
					//console.log(data);
				});
            },
			
            "jsonp": function()
            {
                //console.log('running jsonp...');
				$('#jsonp-results').html('<img src="loading.gif" />');
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
					},
					error: function(e)
					{
					   $('#jsonp-results').html(e.message);
					}
				});
            },
			
			flickrapi: function() 
			{
				$('#flickrapi-results').html('<img src="loading.gif" style="float:left;" />');
				$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
				  {
					tags: "jquery,javascript",
					tagmode: "any",
					format: "json"
				  },
				  function(data) {
				    $('#flickrapi-results').empty();
					$.each(data.items, function(i,item){
					  $("<img/>").attr("src", item.media.m).appendTo("#flickrapi-results");
					  if ( i == 10 ) return false;
					});
				  });
			}
        }

    }

})(jQuery);