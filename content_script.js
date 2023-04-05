console.log('Content script loaded.');

document.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'media_played' });
});

chrome.runtime.onMessage.addListener((message) => {
  const action = message.action;

  const selectors = {
    'open.spotify.com': {
      next: '.player-controls__buttons button[data-testid="control-button-skip-forward"]',
      playPause: '.player-controls__buttons button[data-testid="control-button-playpause"]'
    },
    'music.youtube.com': {
      next: 'ytmusic-player-bar .next-button',
      playPause: 'ytmusic-player-bar .play-pause-button'
    },
    'soundcloud.com': {
      next: '.playControls__next',
      playPause: '.playControls__play, .playControls__pause'
    },
    'www.youtube.com': {
      next: 'ytd-player .ytp-next-button',
      playPause: 'ytd-player .ytp-play-button'
    }
  };

  for (const site in selectors) {
    if (window.location.hostname.includes(site)) {
      const buttonSelector = selectors[site][action];
      const button = document.querySelector(buttonSelector);

      if (button) {
        button.click();
        break;
      }
    }
  }
});
