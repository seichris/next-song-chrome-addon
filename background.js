let lastPlayedTabId;

chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('Message received:', message, 'Sender:', sender);
  if (message.action === 'media_played') {
    lastPlayedTabId = sender.tab.id;
    console.log(`Last played tab ID set to ${lastPlayedTabId}`);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command received: ${command}`);
  if (command === 'next_song') {
    if (lastPlayedTabId) {
      console.log(`Executing content script on tab ${lastPlayedTabId}`);
      try {
        chrome.scripting.executeScript({
          target: { tabId: lastPlayedTabId },
          files: ['content_script.js'],
        });
      } catch (error) {
        console.error('Error executing script:', error);
      }
    } else {
      console.log('No last played tab ID found. Injecting content script into the active tab.');
      try {
        const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: ['content_script.js'],
        });
      } catch (error) {
        console.error('Error executing script:', error);
      }
    }
  }
});
