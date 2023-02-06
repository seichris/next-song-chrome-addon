// Set the media session metadata for the current song
navigator.mediaSession.metadata = new MediaMetadata({
  title: "Song Title",
  artist: "Artist Name",
  album: "Album Name",
  artwork: [
    { src: "artwork_url", sizes: "128x128", type: "image/png" },
  ],
});

// Register a callback to play the next song when the 'nexttrack' action is activated
navigator.mediaSession.setActionHandler('nexttrack', function() {
  // Update the metadata for the next song
  let nextSong = {
    title: "Next Song Title",
    artist: "Next Artist Name",
    album: "Next Album Name",
    artwork: [
      { src: "next_artwork_url", sizes: "128x128", type: "image/png" },
    ],
  };

  // Set the new metadata for the media session
  navigator.mediaSession.metadata = new MediaMetadata(nextSong);

  // Play the next song
  let context = new (window.AudioContext || window.webkitAudioContext)();
  let source = context.createMediaElementSource(new Audio("next_song_url"));
  source.connect(context.destination);
  source.start();
});
