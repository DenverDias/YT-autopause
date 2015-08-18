(function () {
  'use strict'
  
  /*
    Enable YouTube JS Player API for every video and include YouTube's player API script
    Does the following, not in a particular order.
    1.  Adds the enablejsapi=1 query to the embed source.
    2.  Assigns every embed a unique ID. Looks like "YTV-{videoIndex}".
  */
  
  $(function() {
    $( 'head' ).prepend( '<script src="https://www.youtube.com/player_api" />' )
  })
  
  /*
    The counter ytCount now contains the number of embeds that exist on the page.
    When the player API is ready,
    1.  The YouTube embed array is filled with pointers to YouTube iframes in the page.
    2.  Every embed is assigned a function for the "onStateChange" event. It pauses every other video when a video begins playing.
  */
  
  window.onYouTubePlayerAPIReady = function () {
    
    // Prevent YT from being inaccessible on overwrite in the global namespace
    var YT = window.YT
    
    var allYouTubes = $( 'iframe[src*=youtube.com/embed]' )
    
    var YouTubePlayers = []
    
    var onStateChange = function ( e ) {
      if ( e.data === YT.PlayerState.PLAYING ) {
        for ( var i = 0, j = YouTubePlayers.length; i < j; i++ ) {
          if ( !( e.target === YouTubePlayers[i] ) ) {
            YouTubePlayers[i].pauseVideo()
          }
        }
      }
    }
    
    for ( var i = 0, j = allYouTubes.length; i < j; i++ ) {
      YouTubePlayers[i] = new YT.Player( allYouTubes[i].id = allYouTubes[i].id || ( 'dnvr-youtube-' + i ), {
        events: {
          'onStateChange' : onStateChange
        }
      }
    }
  }
})()
