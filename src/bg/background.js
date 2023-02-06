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
      
      audio.addEventListener("error", function(event) {
        console.error("Failed to play audio: ", event.target.error.code);
      });

      let context = new (window.AudioContext || window.webkitAudioContext)();
      let source = context.createMediaElementSource(audio);
      source.connect(context.destination);
      source.start();
    });
});
