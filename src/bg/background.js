chrome.commands.onCommand.addListener(function(command) {
  if (command === "play_next") {
    console.log("Playing next song");
    let image = new Image();
    image.src = "https://raw.githubusercontent.com/seichris/ETHgasPFPs/main/docs/images/1.jpg";

    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Song Title",
      artist: "Artist Name",
      album: "Album Name",
      artwork: [
        { src: image.src, sizes: "128x128", type: "image/png" },
      ],
    });

    // Register a callback to play the next song when the 'nexttrack' action is activated
    navigator.mediaSession.setActionHandler('nexttrack', function() {
      // Code to play the next song goes here
    });
  }
});
