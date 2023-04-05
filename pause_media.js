(function () {
  // Supported websites
  const playPauseButtons = {
    'open.spotify.com': '.player-controls__buttons button[data-testid="control-button-pause"], .player-controls__buttons button[data-testid="control-button-play"]',
    'music.youtube.com': 'ytmusic-player-bar .play-pause-button',
    'soundcloud.com': '.playControls__play, .playControls__pause'
  };

  for (const site in playPauseButtons) {
    if (window.location.hostname.includes(site)) {
      const playPauseButton = document.querySelector(playPauseButtons[site]);
      if (playPauseButton) {
        playPauseButton.click();
        break;
      }
    }
  }
})();
