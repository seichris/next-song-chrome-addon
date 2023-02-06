chrome.commands.onCommand.addListener(function(command) {
  if (command === "play_next") {
    console.log("Playing next song");

      // Play the next song
      let u = new HTMLAudioElement();
      let forSaleInterlude = new HTMLAudioElement();

      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          u.play();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          forSaleInterlude.play();
        });
      }
  }
});
