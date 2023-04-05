chrome.commands.onCommand.addListener((command) => {
  if (command === 'next_song') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content_script.js'],
        });
      } catch (error) {
        console.error('Error executing script:', error);
      }
    });
  }
});