/* Declare a YouTube embed array */
YouTubePlayer = [];

/* Initialise a counter */
ytCount = 0;

/*
  Enable YouTube JS Player API for every video and include YouTube's player API script
  Does the following, not in a particular order.
  1. Adds the enablejsapi=1 query to the embed source.
  2. Assigns every embed a unique ID. Looks like "YTV-{videoIndex}".
*/

$(function() {
  $( 'iframe[src*="youtube.com/embed/"]' ).each( function() {
    currentSRC = $(this).attr('src');
    $(this).attr( 'ID', 'YTV-' + ytCount++ ).attr( 'src', ( -1 == currentSRC.indexOf( '?' ) ? currentSRC + '?enablejsapi=1' : currentSRC.replace( '?', '?enablejsapi=1&' ) ) );
  });
  $( 'head' ).prepend( '<script src="//www.youtube.com/player_api" />' );
});

/*
  The counter ytCount now contains the number of embeds that exist on the page.
  When the player API is ready,
  1. The YouTube embed array is filled with pointers to YouTube iframes in the page.
  2. Every embed is assigned a function for the "onStateChange" event. It pauses every other video when a video begins playing.
*/

function onYouTubePlayerAPIReady() {
  for ( i=0; i < ytCount; i++ )
    YouTubePlayer[i] = new YT.Player( 'YTV-' + i, {
      events: {
        'onStateChange' : function(e) {
          if ( e.data == YT.PlayerState.PLAYING )
            for ( i=0; i < YouTubePlayer.length; i++ )
              if ( !( e.target == YouTubePlayer[i] ) )
                YouTubePlayer[i].pauseVideo();
        }
      }
    }
  );
}
