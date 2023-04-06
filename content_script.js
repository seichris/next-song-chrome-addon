console.log("Content script loaded.");

if (!window.__contentScriptInjected) {
  window.__contentScriptInjected = true;

  document.addEventListener('click', () => {
    if (window.location.hostname.includes('open.spotify.com')) {
      console.log('Cannot execute content script on open.spotify.com due to security policies.');
      return;
    }
  
    try {
      chrome.runtime.sendMessage({ action: 'media_played' });
    } catch (error) {
      console.error('Extension context invalidated:', error);
    }
  });
}

chrome.runtime.onMessage.addListener((message) => {
  const action = message.action;

  const selectors = {
    "open.spotify.com": {
      next: '.player-controls__buttons button[data-testid="control-button-skip-forward"]',
      playPause:
        '.player-controls__buttons button[data-testid="control-button-playpause"]',
      previous:
        '.player-controls__buttons button[data-testid="control-button-skip-back"]',
    },
    "music.youtube.com": {
      next: "ytmusic-player-bar .next-button",
      playPause: "ytmusic-player-bar .play-pause-button",
      previous: "ytmusic-player-bar .previous-button",
    },
    "soundcloud.com": {
      next: ".playControls__next",
      playPause: ".playControls__play, .playControls__pause",
      previous: ".playControls__prev",
    },
    "www.youtube.com": {
      next: "ytd-player .ytp-next-button",
      playPause: "ytd-player .ytp-play-button",
      previous: "ytd-player .ytp-prev-button",
    },
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
