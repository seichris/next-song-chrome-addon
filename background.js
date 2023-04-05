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
    try {
      const tabs = await chrome.tabs.query({ url: ['*://*.youtube.com/*', '*://*.open.spotify.com/*', '*://*.music.youtube.com/*', '*://*.soundcloud.com/*'] });
      const activeTabs = tabs.filter(tab => tab.active && tab.audible);
      if (activeTabs.length) {
        lastPlayedTabId = activeTabs[0].id;
      }
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
        console.log('No active tab with media content found.');
      }
    } catch (error) {
      console.error('Error querying tabs:', error);
    }
  }
});
