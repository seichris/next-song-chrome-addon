(function () {
  // Supported websites
  const nextButtons = {
    'open.spotify.com': '.player-controls__buttons button[data-testid="control-button-skip-forward"]',
    'music.youtube.com': 'ytmusic-player-bar .next-button',
    'soundcloud.com': '.playControls__next'
  };

  for (const site in nextButtons) {
    if (window.location.hostname.includes(site)) {
      const nextButton = document.querySelector(nextButtons[site]);
      if (nextButton) {
        nextButton.click();
        break;
      }
    }
  }
})();
