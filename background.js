chrome.commands.onCommand.addListener((command) => {
  if (command === 'next_song') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, { file: 'content_script.js' });
    });
  }
});
