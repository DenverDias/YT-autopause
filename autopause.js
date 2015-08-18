(function ( d, e, n ){
  'use strict'
  
  n = document.createElement( d )
  n.src = e
  document.head.appendChild( n )
  
})( 'script', 'https://www.youtube.com/player_api' );

window.onYouTubePlayerAPIReady = function () {
  'use strict'
  
  var YT = window.YT

  var nodesYouTubePlayer = document.querySelectorAll( 'iframe[src*=youtube.com/embed]' )
  var objectsYouTubePlayer = []

  var onYouTubeVideoStateChange = function (e) {
    if ( e.data === YT.PlayerState.PLAYING ) {
      for ( var i = 0, j = nodesYouTubePlayer.length; i < j; i++ ) {
        if( !( e.target === objectsYouTubePlayer[i] ) ) {
          objectsYouTubePlayer[i].pauseVideo();
        }
      }
    }
  }

  for ( var i = 0, j = nodesYouTubePlayer.length; i < j; i++ ) {
    // Ensure that all your YouTube embeds have IDs
    objectsYouTubePlayer[i] = new YT.Player( ( nodesYouTubePlayer[i].id = nodesYouTubePlayer[i].id || ( 'dnvr-youtube-' + i ) ), {
      events: {
        'onStateChange': onYouTubeVideoStateChange
      }
    })
  }
  
}
