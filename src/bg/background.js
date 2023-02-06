chrome.commands.onCommand.addListener(function(command) {
  if (command === "play_next") {
    console.log("Playing next song");
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
      // Code to play the next song goes here
    });
  }
});
