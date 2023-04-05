console.log('Content script loaded.');

document.addEventListener('click', () => {
  console.log('Click event detected.');
  chrome.runtime.sendMessage({ action: 'media_played' });
});

function playNextSong() {
  console.log('playNextSong function called.');

  // Supported websites
  const nextButtons = {
    'open.spotify.com': '.player-controls__buttons button[data-testid="control-button-skip-forward"]',
    'music.youtube.com': 'ytmusic-player-bar .next-button',
    'soundcloud.com': '.playControls__next',
    'www.youtube.com': 'ytd-player .ytp-next-button'
  };

  for (const site in nextButtons) {
    if (window.location.hostname.includes(site)) {
      console.log(`Site matched: ${site}`);
      const nextButton = document.querySelector(nextButtons[site]);
      if (nextButton) {
        console.log('Next button found and clicked.');
        nextButton.click();
        break;
      } else {
        console.log('Next button not found.');
      }
    }
  }
}

// Call playNextSong() when the content script is executed
playNextSong();
